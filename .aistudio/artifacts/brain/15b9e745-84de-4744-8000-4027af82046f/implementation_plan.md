# İl ve İlçe Milli Eğitim Müdürlüğü (MEM) Makro Yönetim ve Analiz Paneli

İl ve İlçe Milli Eğitim Müdürlüğü yöneticilerinin bağlı ilçe ve okulları **Arif, Alim, Pusula ve Rahle** modüllerinin tamamı üzerinden bütüncül olarak izleyebildiği, kurumlar arası kıyaslama yapabildiği ve okul bazlı detaylı modül karnelerini inceleyebildiği yeni nesil yönetim ekranı.

## User Review & Critical Decisions

> [!IMPORTANT]
> Kullanıcı görüşmesi doğrultusunda kesinleşen analiz bileşenleri ve önerilen varsayılan yapı aşağıda özetlenmiştir.

- **Onaylanan Analiz ve Raporlama Bileşenleri**:
  - İlçeler ve okullar arası modül başarı sıralaması ve kıyaslama matrisi
  - **Rahle** hafızlık cüz ortalaması, dönüş/pişkin dağılımı ve mezuniyet (icazet) istatistikleri
  - **Pusula** YKS (TYT / AYT) deneme net ortalamaları, koçluk ve hedef takibi
  - **Alim** kelime hazinesi gelişimi, hızlı okuma ve BEP özel eğitim takip özetleri
  - **Arif** bölgesel risk, devamsızlık, davranış/erdem puanı ve rehberlik erken uyarı merkezi
- **Modül Organizasyonu (Önerilen Varsayılan)**: Sol navigasyonda Makro Yönetici Özeti ve Kurum Kıyaslama ekranlarına ek olarak **Arif, Alim, Pusula ve Rahle** modüllerinin her biri için kendi kurumsal renk diline sahip özel analiz sekmeleri yer alacaktır.
- **Okul ve İlçe İnceleme Deneyimi (Önerilen Varsayılan)**: Herhangi bir ilçe veya okula tıklandığında ekranın sağından açılan kapsamlı **Kurum Detay & Modül Karnesi Çekmecesi (Slide-over Drawer)** ile okulun aktif/pasif modülleri ve 4 modüldeki canlı metrikleri tek bakışta sunulacaktır.

---

## 1. Overview & Core Concept

- **Ne Yapar**: İl ve İlçe MEM yöneticilerine bağlı tüm eğitim kurumlarının akademik, davranışsal, dil gelişimi, üniversite hazırlık ve hafızlık süreçlerini canlı Firestore verileri ve kurumsal göstergelerle tek bir komuta merkezinden izleme imkanı sunar.
- **Hedef Kitle**: İl Milli Eğitim Müdürlüğü (`provincial_admin`) ve İlçe Milli Eğitim Müdürlüğü (`district_admin`) yöneticileri, şube müdürleri ve eğitim müfettişleri.
- **Temel Değer**: Yalnızca tek bir modüle (Arif) odaklanan eski özet ekranı yerine, ekosistemdeki 4 ana projenin (**Arif, Alim, Pusula, Rahle**) tamamını kapsayan, hangi okulda hangi modüllerin aktif olduğunu şeffaf biçimde gösteren ve veriye dayalı karar almayı hızlandıran anlaşılır bir yönetim deneyimi sağlar.

---

## 2. User Experience & Visual Design

- **Temel Kullanıcı Akışları**:
  1. **Makro Genel Bakış ve Filtreleme**: İl yöneticisi giriş yaptığında tüm ilçeleri veya üst bardaki ilçe ve modül filtrelerini kullanarak belirli bir ilçeyi/modülü seçer; İlçe yöneticisi doğrudan kendi ilçesindeki okulların toplulaştırılmış verilerini görür.
  2. **İlçe ve Okul Hiyerarşisi & Aktif Modül Rozetleri**: İlçe kartları tıklandığında altındaki okullar açılır. Her okul kartında öğrenci, öğretmen, şube sayılarına ek olarak o okulda tanımlı olan modüller (**Arif, Alim, Pusula, Rahle**) aktif/pasif görsel durumlarıyla yer alır.
  3. **Modül Bazlı Derinlemesine Analiz Sekmeleri**:
     - **Makro Yönetici Özeti**: Toplam kurum, öğrenci, öğretmen, genel modül kullanım oranları, erken uyarı alarmları ve ilçe/okul hiyerarşik listesi.
     - **Kurumlar Arası Kıyaslama ve Sıralama**: Okulların ve ilçelerin 4 modüldeki başarı puanlarına göre sıralandığı, arama ve filtreleme destekli yüksek yoğunluklu veri tablosu.
     - **Arif Analiz Merkezi (Mavi/Zümrüt/Gül)**: Erdem ve davranış puanları, ödev tamamlama oranları, TÜBİTAK/sosyal faaliyet performansları ve Rehberlik/RİBA/Devamsızlık erken uyarı ısı haritası.
     - **Alim Dil & BEP Merkezi (Mor/İndigo)**: Kelime hazinesi (Kelimelik) doğru/yanlış ortalamaları, hızlı okuma ilerlemesi ve okullardaki Özel Eğitim (BEP) bireyselleştirilmiş eğitim planı takip oranları.
     - **Pusula YKS & Koçluk Merkezi (Siyan/Mavi)**: Lise kademesindeki okulların TYT ve AYT deneme net ortalamaları, branş bazlı gelişim eğilimleri ve koçluk hedef tamamlama oranları.
     - **Rahle Hafızlık Merkezi (Kehribar/Altın)**: Hafızlık eğitimi veren kurumların toplam hafız adayı sayısı, çiğ/pişkin/dönüş aşaması dağılımı, ortalama tamamlanan cüz sayısı, deneme cüzü başarı oranı ve icazet (mezuniyet) istatistikleri.
  4. **Kurum Karnesi Detay Çekmecesi**: Herhangi bir tablo satırında veya kartta bir okula tıklandığında açılan detay panelinde okulun künyesi, aktif modül rozetleri, 4 modüle ait özet karne metrikleri ve rehberlik risk durumu görüntülenir.

- **Görsel Kimlik ve Tema**:
  - *Estetik Yönelim*: Kurumsal, yüksek okunabilirlikli, projenin mevcut tasarım diliyle (temiz beyaz yüzeyler, ince çerçeveler, modül kimlik renkleri) tam uyumlu SaaS yönetim konsolu.
  - *Renk Paleti*:
    - Arkaplan Tuvali (`#F8FAFC` / `bg-slate-50`) ve Birincil Yüzey (`#FFFFFF` / `bg-white`), İnce Ayırıcılar (`border-slate-200`).
    - Modül Vurgu Renkleri: **Arif** (`blue-600` / `#2563EB`), **Alim** (`purple-600` / `#9333EA`), **Pusula** (`cyan-600` / `#0891B2`), **Rahle** (`amber-600` / `#D97706`), Erken Uyarı & Risk (`rose-600` / `#E11D48`).
  - *Tipografi ve Sayısal Disiplin*: Başlıklarda güçlü ağırlık (`font-black` / `font-extrabold`), tüm tablo, yüzde, cüz, net ve puan göstergelerinde dikey hizalamayı koruyan `tabular-nums` sayısal biçimlendirme.
  - *Bileşen Düzeni*: İç içe geçmiş karmaşık kartlar yerine tek seviyeli kart derinliği (`border border-slate-200 shadow-sm`), ferah boşluklar ve okulların aktif olmayan modülleri için azaltılmış şeffaflık (`opacity-35`).

---

## 3. Key Product Decisions & Trade-Offs

- **Karar 1: Çoklu Modül Verilerinin Hibrit (Canlı Firestore + Deterministik Kurum Metrikleri) Toplanması**
  - *Seçilen Yaklaşım*: Bağlı okulların Firestore koleksiyonlarındaki (`users_<id>`, `system_<id>`, `rahle_students_<id>`, `pusula_exams_<id>`) gerçek verileri okuyan ve henüz veri girilmemiş alt koleksiyonlar için okulun aktif modül yapısına duyarlı deterministik kurumsal özet metrikleri üreten hibrit veri katmanı.
  - *Neden*: İl/İlçe yöneticisi ekranı açtığında hiçbir sekmenin boş veya kırık görünmemesini, aynı zamanda okullarda yapılan gerçek öğrenci/öğretmen/modül değişikliklerinin anında istatistiklere yansımasını sağlar.
- **Karar 2: Okul Aktif Modül Farkındalığı (`activeProjects`)**
  - *Seçilen Yaklaşım*: Her okulun `activeProjects` (`['arif', 'alim', 'pusula', 'rahle']`) yapılandırması dikkate alınarak, örneğin yalnızca Rahle veya Pusula modülü aktif olan okulların ilgili modül sekmelerinde öne çıkarılması, okul kartlarında ise 4 modülün tamamının gösterilip pasif olanların şeffaflığının düşürülmesi.
  - *Neden*: Bir önceki adımda giriş ekranına uygulanan aktif/pasif modül görsel standardını İl ve İlçe yönetim ekranlarında da birebir koruyarak tasarım bütünlüğü sağlar.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:

```
┌────────────────────────────────────────────────────────────────────────────┐
│                     RegionalDashboard (İl & İlçe MEM)                      │
├──────────────────────┬─────────────────────────────────────────────────────┤
│  Sol Navigasyon &    │  Üst Kontekst Barı (Bölge Özeti, İlçe & Modül       │
│  Bölge Seçici        │  Filtresi, Hızlı Arama, Aktif Modül Göstergeleri)   │
│  ┌────────────────┐  ├─────────────────────────────────────────────────────┤
│  │ • Makro Özet   │  │  Ana Görünüm Alanı (Seçili Sekmeye Göre Render)     │
│  │ • Kıyaslama    │  │  ┌───────────────────────────────────────────────┐  │
│  │ • Arif Analiz  │  │  │ 1. Makro Özet & Hiyerarşik İlçe/Okul Ağacı    │  │
│  │ • Alim & BEP   │  │  │ 2. Kurumlar Arası Modül Kıyaslama Matrisi     │  │
│  │ • Pusula YKS   │  │  │ 3. Arif: Erdem, Ödev, Performans & Risk (ŞSA) │  │
│  │ • Rahle Hafız  │  │  │ 4. Alim: Kelimelik, Hızlı Okuma & BEP Takip   │  │
│  │ • Risk Merkezi │  │  │ 5. Pusula: TYT/AYT Net, Branş & Koçluk Analiz │  │
│  └────────────────┘  │  │ 6. Rahle: Cüz Ortalaması, Dönüş & İcazet      │  │
│                      │  └───────────────────────────────────────────────┘  │
└──────────────────────┴──────────────────────────┬──────────────────────────┘
                                                  │ Okul / İlçe Seçimi
                                                  ▼
                       ┌─────────────────────────────────────────────────────┐
                       │   Kurum Detay & 4-Modül Karnesi Çekmecesi (Drawer)  │
                       │  • Okul Künyesi & Aktif/Pasif Modül Durumları       │
                       │  • Arif / Alim / Pusula / Rahle Kurum Karnesi       │
                       │  • Rehberlik Erken Uyarı & Faaliyet Özeti           │
                       └─────────────────────────────────────────────────────┘
```

- **Data Model & State**:
  - `selectedDistrictId`: İl yöneticisi için aktif ilçe filtresi (`null` ise tüm il ve merkez okullar).
  - `activeModuleFilter`: Tüm ekran veya kıyaslama tablosu üzerinde `all | arif | alim | pusula | rahle` filtrelemesi.
  - `searchQuery` & `sortField`: Okul/ilçe kıyaslama matrisinde anlık arama ve sütun bazlı sıralama (Öğrenci sayısı, Arif Erdem puanı, Alim Kelime/BEP oranı, Pusula Net ortalaması, Rahle Cüz ortalaması).
  - `selectedSchoolId`: Tıklanan okulun detaylı modül karnesini sağ çekmecede (slide-over drawer) açan durum değişkeni.
  - `regionalModuleStats`: Bağlı okullar için Firestore'dan ve okul istatistiklerinden derlenen çoklu modül veri haritası.

- **Interactive Component & State Mapping**:
  - **İlçe Seçici & Hiyerarşik Ağaç**: İl yöneticisi bir ilçeye tıkladığında hem alt okulları akordeon olarak açabilir hem de ilçenin toplam modül istatistiklerini üst KPI kartlarında filtreleyebilir.
  - **Modül Sekmeleri**: Her sekme kendi modülünü aktif olarak kullanan okulları ve tüm bölgedeki toplulaştırılmış metrikleri (progress barlar, sıralama listeleri, dağılım kartları) etkileşimli olarak sunar.
  - **Okul Karne Çekmecesi**: Herhangi bir sekmedeki okul satırına veya kartına tıklandığında açılır; okulda pasif olan modüller şeffaf (`opacity-35`) olarak işaretlenir, aktif modüllerin detaylı metrikleri gösterilir.
