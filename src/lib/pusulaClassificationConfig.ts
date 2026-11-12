import { useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export type PusulaCategoryColor = 'emerald' | 'amber' | 'purple' | 'blue' | 'rose' | 'indigo';

export interface PusulaLevelClass {
  id: string;
  name: string;
  minScore: number;
  maxScore: number | null; // null means "and above" (ve üzeri)
  includeUnentered?: boolean; // Whether students with "GİRMEDİ" go into this class
}

export interface PusulaClassCategory {
  id: string;
  name: string;
  colorTheme: PusulaCategoryColor;
  classes: PusulaLevelClass[];
}

export interface PusulaClassificationConfig {
  categories: PusulaClassCategory[];
  updatedAt?: string;
}

export const DEFAULT_PUSULA_CLASSIFICATION_CONFIG: PusulaClassificationConfig = {
  categories: [
    {
      id: 'cat_akademi',
      name: 'AKADEMİ',
      colorTheme: 'emerald',
      classes: [
        {
          id: 'cls_akademi_a',
          name: 'AKADEMİ A',
          minScore: 410,
          maxScore: null,
          includeUnentered: false
        },
        {
          id: 'cls_akademi_b',
          name: 'AKADEMİ B',
          minScore: 360,
          maxScore: 410,
          includeUnentered: false
        },
        {
          id: 'cls_akademi_c',
          name: 'AKADEMİ C',
          minScore: 300,
          maxScore: 360,
          includeUnentered: false
        }
      ]
    },
    {
      id: 'cat_gelisim',
      name: 'GELİŞİM',
      colorTheme: 'amber',
      classes: [
        {
          id: 'cls_gelisim_a',
          name: 'GELİŞİM A',
          minScore: 270,
          maxScore: 300,
          includeUnentered: false
        },
        {
          id: 'cls_gelisim_b',
          name: 'GELİŞİM B',
          minScore: 240,
          maxScore: 270,
          includeUnentered: false
        },
        {
          id: 'cls_gelisim_c',
          name: 'GELİŞİM C',
          minScore: 0,
          maxScore: 240,
          includeUnentered: true
        }
      ]
    }
  ]
};

export const formatClassScoreRangeLabel = (cls: PusulaLevelClass): string => {
  const min = Number(cls.minScore || 0);
  const max = cls.maxScore !== null && cls.maxScore !== undefined && String(cls.maxScore) !== '' ? Number(cls.maxScore) : null;

  if (max === null) {
    return `${min} Puan ve Üzeri`;
  }
  if (min <= 0) {
    return `${max} Puandan Az Alanlar`;
  }
  return `${min} - ${max} Puan Arası`;
};

const getStorageKey = (schoolId: string) => `pusula_class_config_${schoolId || 'default'}`;

export const loadLocalPusulaClassConfig = (schoolId: string): PusulaClassificationConfig => {
  try {
    const raw = localStorage.getItem(getStorageKey(schoolId));
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.categories) && parsed.categories.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Pusula class config localStorage read error:', e);
  }
  return DEFAULT_PUSULA_CLASSIFICATION_CONFIG;
};

export const saveLocalPusulaClassConfig = (schoolId: string, config: PusulaClassificationConfig) => {
  try {
    localStorage.setItem(getStorageKey(schoolId), JSON.stringify(config));
    window.dispatchEvent(new CustomEvent('pusula-classification-updated', { detail: { schoolId, config } }));
  } catch (e) {
    console.warn('Pusula class config localStorage write error:', e);
  }
};

export const usePusulaClassificationConfig = (activeSchoolId: string) => {
  const schoolId = activeSchoolId || 'default';
  const [config, setConfig] = useState<PusulaClassificationConfig>(() =>
    loadLocalPusulaClassConfig(schoolId)
  );
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setConfig(loadLocalPusulaClassConfig(schoolId));
  }, [schoolId]);

  useEffect(() => {
    const handleCustomEvent = (e: Event) => {
      const custom = e as CustomEvent;
      if (custom.detail?.schoolId === schoolId && custom.detail?.config) {
        setConfig(custom.detail.config);
      }
    };
    window.addEventListener('pusula-classification-updated', handleCustomEvent);
    return () => window.removeEventListener('pusula-classification-updated', handleCustomEvent);
  }, [schoolId]);

  useEffect(() => {
    if (!schoolId || schoolId === 'superadmin') return;
    const sysColName = schoolId === 'default' ? 'system' : `system_${schoolId}`;
    const docRef = doc(db, sysColName, 'pusula_classification_config');

    const unsub = onSnapshot(
      docRef,
      (snap) => {
        if (snap.exists()) {
          const data = snap.data() as PusulaClassificationConfig;
          if (data && Array.isArray(data.categories) && data.categories.length > 0) {
            setConfig(data);
            try {
              localStorage.setItem(getStorageKey(schoolId), JSON.stringify(data));
            } catch {}
          }
        }
      },
      (err) => {
        console.warn('Pusula classification config listener note:', err);
      }
    );

    return () => unsub();
  }, [schoolId]);

  const saveConfig = useCallback(
    async (newConfig: PusulaClassificationConfig) => {
      const payload: PusulaClassificationConfig = {
        ...newConfig,
        updatedAt: new Date().toISOString()
      };
      setConfig(payload);
      saveLocalPusulaClassConfig(schoolId, payload);

      if (!schoolId || schoolId === 'superadmin') return true;
      setIsSaving(true);
      try {
        const sysColName = schoolId === 'default' ? 'system' : `system_${schoolId}`;
        await setDoc(doc(db, sysColName, 'pusula_classification_config'), payload, { merge: true });
        return true;
      } catch (err) {
        console.warn('Pusula classification config Firestore save note:', err);
        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [schoolId]
  );

  return {
    config,
    setConfig,
    saveConfig,
    isSaving
  };
};
