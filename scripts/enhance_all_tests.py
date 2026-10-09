import json
import re

with open('src/data/pdf8.json', 'r', encoding='utf-8') as f:
    pdf_data = json.load(f)

ctx_map = {c['id']: c['content'].strip() for c in pdf_data.get('contexts', [])}
raw_questions = pdf_data.get('questions', [])

def clean_bullets(text):
    """Parses bullet points into clean intro, premises array, and stem."""
    if '•' in text:
        parts = text.split('•')
        intro = parts[0].strip()
        bullets = []
        last_part = parts[-1].strip()
        
        # Look for concluding question stem
        stem_match = re.search(r'(Buna göre[^\?]+\?|Bu bilgilere göre[^\?]+\?|Aşağıdakilerden hangisi[^\?]+\?|Bu kurallara göre[^\?]+\?)', last_part)
        
        for p in parts[1:-1]:
            b_text = p.strip()
            if b_text:
                bullets.append(b_text)
                
        if stem_match:
            stem = stem_match.group(0).strip()
            bullet_last = last_part[:stem_match.start()].strip()
            if bullet_last:
                bullets.append(bullet_last)
        else:
            bullets.append(last_part)
            stem = 'Buna göre aşağıdaki yargılardan hangisi kesinlikle doğrudur?'
            
        return intro, bullets, stem
    return None, None, None

transition_patterns = [
    r'(Bununla ilgili[^\.\:\n]+[\.\:])',
    r'(Yerleşimle ilgili[^\.\:\n]+[\.\:])',
    r'(Stantların[^\.\:\n]+[\.\:])',
    r'(Yerleştirme kuralları[^\.\:\n]+[\.\:])',
    r'(Diziliş kuralları[^\.\:\n]+[\.\:])',
    r'(Bu bölümler[^\.\:\n]+[\.\:])',
    r'(Stantlarla ilgili[^\.\:\n]+[\.\:])',
    r'(Bilinenler[^\.\:\n]+[\.\:])',
    r'(Konuşma sırasıyla[^\.\:\n]+[\.\:])',
    r'(Aşağıdaki bilgiler[^\.\:\n]+[\.\:])'
]
combined_regex = '|'.join(transition_patterns)

def parse_news(text):
    """Parses Question 6 news article into clean structured context and stem."""
    stem_m = re.search(r'(Bu haber metnine göre[^\?]+\?|Bu habere göre[^\?]+\?)', text)
    if not stem_m:
        return None, None
    stem = stem_m.group(0).strip()
    full_body = text[:stem_m.start()].strip()
    clean_body = re.sub(r'^Aşağıdaki haber metnini okuyunuz\.?\s*', '', full_body).strip()
    
    # Extract headline if available
    m_quote = re.search(r'^([\"\'\w\sÇĞİÖŞÜçğıöşü\.\-]+?(?:Başladı|Girdi|Dönemi|Yaygınlaşıyor|Azaldı|Kullanılıyor|Arttı|Kolaylaşıyor|Tasarruf|Dönem|Düşüş|Artırıyor|Kazanıyor|Yönetiliyor))', clean_body)
    if m_quote:
        headline = m_quote.group(1).strip('\"\' ')
        rest = clean_body[m_quote.end():].strip('\"\' ')
        formatted_context = f"📰 GÜNCEL HABER METNİ\n\n**{headline}**\n\n{rest}"
    else:
        formatted_context = f"📰 GÜNCEL HABER METNİ\n\n{clean_body}"
        
    return formatted_context, stem

def parse_logic_scenario(raw_text, q_num):
    """Parses Sözel Mantık / Öncüllü questions into grouped elements and clear numbered rules."""
    parts = [p.strip() for p in raw_text.split('•') if p.strip()]
    if not parts:
        return None
    
    last = parts[-1]
    stem_match = re.search(r'(Buna göre[^\?]+\?|Bu bilgilere göre[^\?]+\?|Aşağıdakilerden hangisi[^\?]+\?|Bu kurallara göre[^\?]+\?)', last)
    if stem_match:
        stem = stem_match.group(0).strip()
        last_rule = last[:stem_match.start()].strip()
    else:
        stem = 'Buna göre aşağıdaki yargılardan hangisi kesinlikle doğrudur?'
        last_rule = last
        
    bullets = parts[1:-1] + ([last_rule] if last_rule else [])
    setup_text = parts[0]
    items = []
    rules = []
    items_title = 'Sıralanacak Ögeler / Unsurlar:'
    rule_intro = 'Sıralamayla ilgili bilinen kurallar ve koşullar şunlardır:'
    
    # Check for split inside bullets (e.g., elements in bullets 1-6, then transition phrase in bullet 6/7)
    split_idx = -1
    for idx, b in enumerate(bullets):
        m = re.search(combined_regex, b, re.IGNORECASE)
        if m and idx < len(bullets) - 2:
            split_idx = idx
            item_part = b[:m.start()].strip()
            trans_part = b[m.start():].strip()
            if item_part:
                items = bullets[:idx] + [item_part]
            else:
                items = bullets[:idx]
            rule_intro = trans_part
            rules = bullets[idx+1:]
            break
            
    if split_idx == -1:
        # Check parenthesized items in setup_text e.g. '(Ali, Buse, Can...)'
        names_match = re.search(r'\(([^)]+)\)', setup_text)
        if names_match and any(sep in names_match.group(1) for sep in [',', 've']):
            names = [n.strip() for n in re.split(r',|\bve\b', names_match.group(1)) if n.strip()]
            if len(names) >= 4:
                items = names
                items_title = 'Katılımcı Kişiler / Konuşmacılar:' if any(k in setup_text.lower() for k in ['öğrenci', 'konuş', 'münazara', 'sunum']) else 'Sıralanacak Ögeler:'
        else:
            # Check multiple parentheses (Y), (R), etc.
            raw_items = re.findall(r'([A-ZÇĞİÖŞÜ0-9][\w\sÇĞİÖŞÜçğıöşü\.]*?\([A-Za-z0-9\.]+\))', setup_text)
            if len(raw_items) >= 4:
                items = [re.sub(r'^(?:Bir|İki|Üç)\s+[\w\sÇĞİÖŞÜçğıöşü]+?\s+(?=[A-ZÇĞİÖŞÜ])', '', it).strip() for it in raw_items]
                items_title = 'Sıralanacak Stantlar / Bölümler:'
            elif 'Hitit, Frig, Urartu' in setup_text:
                items = ['Hitit Salonu', 'Frig Salonu', 'Urartu Salonu', 'Lidya Salonu', 'İyon Salonu']
                items_title = 'Müze Salonları:'
            elif 'Arduino, Yapay Zekâ, Robotik' in setup_text:
                items = ['Arduino Atölyesi', 'Yapay Zekâ Atölyesi', 'Robotik Atölyesi', '3B Tasarım Atölyesi', 'Siber Güvenlik Atölyesi']
                items_title = 'STEM Atölyeleri:'
            elif 'Astronomi, Robotik, Yazılım' in setup_text:
                items = ['Astronomi', 'Robotik', 'Yazılım', 'Matematik', 'Tasarım']
                items_title = 'Bilim Atölyeleri:'
            elif 'Ayşe, Berk, Ceren, Deniz ve Efe' in setup_text:
                items = ['Ayşe', 'Berk', 'Ceren', 'Deniz', 'Efe']
                items_title = 'Münazara Katılımcıları:'
        rules = bullets

    clean_rules = []
    for r in rules:
        r_clean = re.sub(r'\|', '', r).strip()
        r_clean = re.sub(r'(Buna göre[^\?]+\?|Bu bilgilere göre[^\?]+\?)', '', r_clean).strip()
        if r_clean and not r_clean.startswith('---'):
            clean_rules.append(r_clean)
            
    clean_setup = setup_text
    if rule_intro and rule_intro in clean_setup:
        clean_setup = clean_setup.replace(rule_intro, '').strip()
        
    return {
        'title': 'Sözel Mantık & Kurallar Kurgusu',
        'setupText': clean_setup,
        'itemsTitle': items_title,
        'items': items,
        'ruleIntro': rule_intro,
        'rules': clean_rules,
        'stem': stem
    }

def parse_markdown_table(text):
    """Extracts markdown table into structured headers and rows."""
    lines = [l.strip() for l in text.split('\n') if l.strip()]
    tbl_lines = [l for l in lines if l.startswith('|') and l.endswith('|')]
    if not tbl_lines:
        return None, None, text, None
        
    before_tbl = []
    after_tbl = []
    seen_table = False
    
    for l in lines:
        if l.startswith('|') and l.endswith('|'):
            seen_table = True
        elif not seen_table:
            before_tbl.append(l)
        else:
            after_tbl.append(l)
            
    header_cells = [c.strip() for c in tbl_lines[0].split('|')[1:-1]]
    rows = []
    for tl in tbl_lines[1:]:
        if '---' in tl:
            continue
        row_cells = [c.strip() for c in tl.split('|')[1:-1]]
        if any(row_cells):
            rows.append(row_cells)
            
    table_data = {'headers': header_cells, 'rows': rows}
    table_markdown = '\n'.join(tbl_lines)
    context = '\n'.join(before_tbl)
    stem = '\n'.join(after_tbl) if after_tbl else 'Tablodaki ve grafikteki verilere göre aşağıdakilerden hangisi kesinlikle doğrudur?'
    return table_data, table_markdown, context, stem

# Specific custom handlers for flattened tables
def fix_known_flattened_tables(q_num, text):
    # Q45 (Test 5, Q5): Ulaşım alışkanlıkları
    if q_num == 45:
        context = "Bir belediye, şehirdeki ulaşım alışkanlıklarını incelemek amacıyla hafta içi ve hafta sonu yapılan yolculuk sayılarını aşağıdaki tabloda ve grafikte yayımlamıştır."
        headers = ["Ulaşım Türü", "Hafta İçi (Kişi)", "Hafta Sonu (Kişi)", "Toplam Yolculuk"]
        rows = [
            ["Otobüs", "48.000", "32.000", "80.000"],
            ["Metro", "36.000", "30.000", "66.000"],
            ["Bisiklet", "8.000", "14.000", "22.000"],
            ["Yürüyüş", "12.000", "18.000", "30.000"]
        ]
        stem = "Bu verilere ve grafiğe göre aşağıdaki yorumlardan hangisi yanlıştır?"
        chart = {
            "type": "grouped_bar",
            "title": "Şehir İçi Ulaşım Türlerine Göre Yolculuk Sayıları Grafiği",
            "subtitle": "Hafta İçi ve Hafta Sonu Karşılaştırmalı Sütun Grafiği",
            "unit": "Yolcu",
            "seriesLabels": [
                {"name": "Hafta İçi", "color": "#2563EB"},
                {"name": "Hafta Sonu", "color": "#059669"}
            ],
            "items": [
                {"label": "Otobüs", "values": [{"seriesName": "Hafta İçi", "value": 48000, "displayValue": "48.000"}, {"seriesName": "Hafta Sonu", "value": 32000, "displayValue": "32.000"}]},
                {"label": "Metro", "values": [{"seriesName": "Hafta İçi", "value": 36000, "displayValue": "36.000"}, {"seriesName": "Hafta Sonu", "value": 30000, "displayValue": "30.000"}]},
                {"label": "Yürüyüş", "values": [{"seriesName": "Hafta İçi", "value": 12000, "displayValue": "12.000"}, {"seriesName": "Hafta Sonu", "value": 18000, "displayValue": "18.000"}]},
                {"label": "Bisiklet", "values": [{"seriesName": "Hafta İçi", "value": 8000, "displayValue": "8.000"}, {"seriesName": "Hafta Sonu", "value": 14000, "displayValue": "14.000"}]}
            ]
        }
        return context, {"headers": headers, "rows": rows}, stem, chart

    # Q55 (Test 6, Q5): Kütüphane Ziyaretçi Sayıları (Image 1 Fix!)
    if q_num == 55:
        context = "Bir belediyenin hazırladığı raporda şehirdeki 4 farklı kütüphanenin yıllık ziyaretçi sayıları ve türlerine göre dağılımı verilmiştir."
        headers = ["Kütüphane", "Öğrenci Ziyaretçi", "Yetişkin Ziyaretçi", "Toplam Ziyaretçi"]
        rows = [
            ["A Kütüphanesi", "12.500", "7.500", "20.000"],
            ["B Kütüphanesi", "15.000", "6.000", "21.000"],
            ["C Kütüphanesi", "10.000", "12.000", "22.000"],
            ["D Kütüphanesi", "8.000", "9.000", "17.000"]
        ]
        stem = "Bu tabloya ve sütun grafiğine göre aşağıdaki yorumlardan hangisi yanlıştır?"
        chart = {
            "type": "grouped_bar",
            "title": "Şehir Kütüphaneleri Yıllık Ziyaretçi Dağılımı Sütun Grafiği",
            "subtitle": "Kütüphanelere Göre Öğrenci ve Yetişkin Ziyaretçi Sayıları",
            "unit": "Ziyaretçi",
            "seriesLabels": [
                {"name": "Öğrenci", "color": "#2563EB"},
                {"name": "Yetişkin", "color": "#059669"},
                {"name": "Toplam", "color": "#D97706"}
            ],
            "items": [
                {"label": "A Küt.", "values": [{"seriesName": "Öğrenci", "value": 12500, "displayValue": "12.500"}, {"seriesName": "Yetişkin", "value": 7500, "displayValue": "7.500"}, {"seriesName": "Toplam", "value": 20000, "displayValue": "20.000"}]},
                {"label": "B Küt.", "values": [{"seriesName": "Öğrenci", "value": 15000, "displayValue": "15.000"}, {"seriesName": "Yetişkin", "value": 6000, "displayValue": "6.000"}, {"seriesName": "Toplam", "value": 21000, "displayValue": "21.000"}]},
                {"label": "C Küt.", "values": [{"seriesName": "Öğrenci", "value": 10000, "displayValue": "10.000"}, {"seriesName": "Yetişkin", "value": 12000, "displayValue": "12.000"}, {"seriesName": "Toplam", "value": 22000, "displayValue": "22.000"}]},
                {"label": "D Küt.", "values": [{"seriesName": "Öğrenci", "value": 8000, "displayValue": "8.000"}, {"seriesName": "Yetişkin", "value": 9000, "displayValue": "9.000"}, {"seriesName": "Toplam", "value": 17000, "displayValue": "17.000"}]}
            ]
        }
        return context, {"headers": headers, "rows": rows}, stem, chart

    # Q105 (MEBİ 1, Q5): Bisiklet yolları mevsimlik
    if q_num == 105:
        context = "Bir belediye, şehirdeki bisiklet yollarının mevsimlere göre kullanımına ilişkin verileri aşağıdaki tabloda ve grafikte yayımlamıştır."
        headers = ["Mevsim", "Ortalama Günlük Kullanıcı", "Ortalama Sürüş Süresi"]
        rows = [
            ["İlkbahar", "2.400", "34 dk"],
            ["Yaz", "3.600", "41 dk"],
            ["Sonbahar", "2.800", "37 dk"],
            ["Kış", "1.500", "26 dk"]
        ]
        stem = "Bu tablo ve sütun grafiğine göre aşağıdaki yorumlardan hangisi yanlıştır?"
        chart = {
            "type": "bar",
            "title": "Mevsimlere Göre Günlük Ortalama Bisiklet Yolu Kullanıcı Sayısı",
            "subtitle": "Kullanıcı Sayısı Dağılımı Sütun Grafiği",
            "unit": "Kişi",
            "items": [
                {"label": "İlkbahar", "value": 2400, "displayValue": "2.400 Kişi", "color": "#059669"},
                {"label": "Yaz", "value": 3600, "displayValue": "3.600 Kişi", "color": "#D97706"},
                {"label": "Sonbahar", "value": 2800, "displayValue": "2.800 Kişi", "color": "#EA580C"},
                {"label": "Kış", "value": 1500, "displayValue": "1.500 Kişi", "color": "#0284C7"}
            ]
        }
        return context, {"headers": headers, "rows": rows}, stem, chart

    # Q125 (MEBİ 3, Q5): Enerji kaynakları özellikleri
    if q_num == 125:
        context = "Bir araştırmada dört farklı enerji kaynağının bazı özellikleri karşılaştırılmıştır."
        headers = ["Enerji Kaynağı", "Yenilenebilir", "Karbon Salımı", "Kurulum Maliyeti"]
        rows = [
            ["Güneş", "✔ Evet", "Çok Düşük", "Yüksek"],
            ["Rüzgâr", "✔ Evet", "Çok Düşük", "Orta"],
            ["Doğal Gaz", "✘ Hayır", "Orta", "Düşük"],
            ["Kömür", "✘ Hayır", "Yüksek", "Orta"]
        ]
        stem = "Bu tablo ve karşılaştırma grafiğine göre aşağıdaki yorumlardan hangisi yanlıştır?"
        chart = {
            "type": "horizontal_bar",
            "title": "Enerji Kaynaklarının Karbon Salım İndeksi",
            "subtitle": "Karbon Salımı Derecesi Karşılaştırması",
            "unit": "Puan",
            "items": [
                {"label": "Kömür (Yüksek)", "value": 90, "displayValue": "%90 Yüksek", "color": "#E11D48"},
                {"label": "Doğal Gaz (Orta)", "value": 55, "displayValue": "%55 Orta", "color": "#D97706"},
                {"label": "Rüzgâr (Çok Düşük)", "value": 8, "displayValue": "%8 Çok Düşük", "color": "#059669"},
                {"label": "Güneş (Çok Düşük)", "value": 5, "displayValue": "%5 Çok Düşük", "color": "#0284C7"}
            ]
        }
        return context, {"headers": headers, "rows": rows}, stem, chart

    # Q135 (MEBİ 4, Q5): Enerji üretim yöntemleri
    if q_num == 135:
        context = "Bir araştırmada dört farklı elektrik üretim yöntemine ait maliyet ve yakıt verileri karşılaştırılmıştır."
        headers = ["Enerji Türü", "İlk Kurulum Maliyeti", "Karbon Salımı", "Yakıt Gereksinimi"]
        rows = [
            ["Güneş", "Yüksek", "Çok Düşük", "Hayır"],
            ["Rüzgâr", "Orta", "Çok Düşük", "Hayır"],
            ["Doğal Gaz", "Orta", "Orta", "Evet"],
            ["Kömür", "Düşük", "Yüksek", "Evet"]
        ]
        stem = "Bu tablo ve grafiğe göre aşağıdaki yorumlardan hangisi yanlıştır?"
        chart = {
            "type": "horizontal_bar",
            "title": "Enerji Türlerinin İlk Kurulum Maliyet Düzeyleri",
            "subtitle": "Maliyet Seviyesi Karşılaştırma Grafiği",
            "unit": "Maliyet",
            "items": [
                {"label": "Güneş Santralleri", "value": 85, "displayValue": "Yüksek", "color": "#D97706"},
                {"label": "Rüzgâr Santralleri", "value": 60, "displayValue": "Orta", "color": "#059669"},
                {"label": "Doğal Gaz Çevrim", "value": 50, "displayValue": "Orta", "color": "#2563EB"},
                {"label": "Kömür Termik", "value": 30, "displayValue": "Düşük", "color": "#7C3AED"}
            ]
        }
        return context, {"headers": headers, "rows": rows}, stem, chart

    # Q145 (MEBİ 5, Q5): İnternet bağlantı türleri
    if q_num == 145:
        context = "Bir araştırmada dört farklı internet bağlantı türüne ait hız ve gecikme özellikleri karşılaştırılmıştır."
        headers = ["Bağlantı Türü", "Ortalama Hız", "Gecikme Süresi (Ping)", "Hareket Hâlinde Kullanım"]
        rows = [
            ["Fiber İnternet", "1000 Mbps (Çok Yüksek)", "3 ms (Çok Düşük)", "Hayır"],
            ["5G Mobil", "300 Mbps (Yüksek)", "10 ms (Düşük)", "Evet"],
            ["ADSL / VDSL", "50 Mbps (Orta)", "35 ms (Orta)", "Hayır"],
            ["Uydu İnterneti", "80 Mbps (Orta)", "120 ms (Yüksek)", "Evet"]
        ]
        stem = "Bu tablo ve hız grafiğine göre aşağıdaki yorumlardan hangisi yanlıştır?"
        chart = {
            "type": "horizontal_bar",
            "title": "İnternet Bağlantı Türlerine Göre Ortalama İndirme Hızları (Mbps)",
            "subtitle": "Veri İletim Hızı Karşılaştırma Grafiği",
            "unit": "Mbps",
            "items": [
                {"label": "Fiber İnternet", "value": 1000, "displayValue": "1000 Mbps", "color": "#2563EB"},
                {"label": "5G Mobil", "value": 300, "displayValue": "300 Mbps", "color": "#059669"},
                {"label": "Uydu İnterneti", "value": 80, "displayValue": "80 Mbps", "color": "#7C3AED"},
                {"label": "ADSL / VDSL", "value": 50, "displayValue": "50 Mbps", "color": "#D97706"}
            ]
        }
        return context, {"headers": headers, "rows": rows}, stem, chart

    # Q165 (MEBİ 7, Q5): Veri depolama teknolojileri
    if q_num == 165:
        context = "Bir araştırmada dört farklı veri depolama teknolojisinin hız ve dayanıklılık özellikleri karşılaştırılmıştır."
        headers = ["Depolama Türü", "Ortalama Okuma Hızı", "Darbeye Dayanıklılık", "Hareketli Mekanik Parça"]
        rows = [
            ["SSD (Katı Hâl)", "3.500 MB/s (Çok Yüksek)", "Yüksek", "Yok"],
            ["USB 3.0 Bellek", "400 MB/s (Yüksek)", "Orta", "Yok"],
            ["HDD (Sabit Disk)", "150 MB/s (Orta)", "Düşük", "Var (Dönen Disk)"],
            ["DVD Optik Disk", "20 MB/s (Düşük)", "Orta", "Yok"]
        ]
        stem = "Bu tablo ve performans grafiğine göre aşağıdaki yorumlardan hangisi yanlıştır?"
        chart = {
            "type": "horizontal_bar",
            "title": "Depolama Teknolojilerinin Okuma Hızları (MB/s)",
            "subtitle": "Veri Aktarım Hızı Karşılaştırması",
            "unit": "MB/s",
            "items": [
                {"label": "SSD (Katı Hâl Sürücü)", "value": 3500, "displayValue": "3.500 MB/s", "color": "#2563EB"},
                {"label": "USB 3.0 Bellek", "value": 400, "displayValue": "400 MB/s", "color": "#059669"},
                {"label": "HDD (Mekanik Disk)", "value": 150, "displayValue": "150 MB/s", "color": "#D97706"},
                {"label": "DVD Optik Disk", "value": 20, "displayValue": "20 MB/s", "color": "#7C3AED"}
            ]
        }
        return context, {"headers": headers, "rows": rows}, stem, chart

    # Q24 (Test 3, Q4): Spor Kulüpleri Madalya Dağılımı
    if q_num == 24:
        context = "Bir okulda spor kulüplerinin dönem sonu etkinliklerine ait üye, turnuvaya katılan ve madalya kazanan öğrenci verileri aşağıdaki tabloda ve grafikte verilmiştir."
        headers = ["Kulüp", "Üye Sayısı", "Turnuvaya Katılan", "Madalya Kazanan", "Katılım Oranı"]
        rows = [
            ["Kodlama", "50", "45", "20", "%90"],
            ["Satranç", "40", "32", "12", "%80"],
            ["Masa Tenisi", "36", "24", "10", "%67"],
            ["Robotik", "35", "28", "15", "%80"],
            ["Atletizm", "30", "27", "15", "%90"],
            ["Akıl Oyunları", "30", "24", "8", "%80"],
            ["Okçuluk", "24", "18", "9", "%75"]
        ]
        stem = "Bu tabloya ve grafiğe göre aşağıdaki yargılardan hangisi kesinlikle doğrudur?"
        chart = {
            "type": "bar",
            "title": "Spor Kulüplerinin Turnuvada Kazandığı Madalya Sayıları",
            "subtitle": "Kulüplere Göre Madalya Kazanan Öğrenci Sayısı Sütun Grafiği",
            "unit": "Madalya",
            "items": [
                {"label": "Kodlama", "value": 20, "displayValue": "20 Madalya", "color": "#2563EB"},
                {"label": "Robotik", "value": 15, "displayValue": "15 Madalya", "color": "#059669"},
                {"label": "Atletizm", "value": 15, "displayValue": "15 Madalya", "color": "#D97706"},
                {"label": "Satranç", "value": 12, "displayValue": "12 Madalya", "color": "#7C3AED"},
                {"label": "Masa Tenisi", "value": 10, "displayValue": "10 Madalya", "color": "#0284C7"},
                {"label": "Okçuluk", "value": 9, "displayValue": "9 Madalya", "color": "#E11D48"},
                {"label": "Akıl Oyunları", "value": 8, "displayValue": "8 Madalya", "color": "#EA580C"}
            ]
        }
        return context, {"headers": headers, "rows": rows}, stem, chart

    # Q175 (Test 18, Q5): Tarım Uygulamaları Çevresel Etki
    if q_num == 175:
        context = "Bir araştırmada dört farklı tarım uygulamasının çevreye etkisi (su tüketimi, karbon salımı ve kimyasal kullanımı) incelenmiştir."
        headers = ["Uygulama", "Su Tüketimi", "Karbon Salımı", "Kimyasal Kullanımı"]
        rows = [
            ["Geleneksel Tarım", "Yüksek", "Yüksek", "Evet"],
            ["Organik Tarım", "Orta", "Düşük", "Hayır"],
            ["Topraksız Tarım", "Çok Düşük", "Orta", "Hayır"],
            ["Akıllı Tarım", "Düşük", "Düşük", "Çok Az"]
        ]
        stem = "Bu tabloya ve çevre etki grafiğine göre aşağıdaki yorumlardan hangisi yanlıştır?"
        chart = {
            "type": "horizontal_bar",
            "title": "Tarım Uygulamalarının Karbon Salımı ve Çevre Etki Düzeyleri",
            "subtitle": "Çevresel Etki Karşılaştırma Grafiği",
            "unit": "Puan",
            "items": [
                {"label": "Geleneksel Tarım", "value": 90, "displayValue": "Yüksek (%90)", "color": "#E11D48"},
                {"label": "Topraksız Tarım", "value": 50, "displayValue": "Orta (%50)", "color": "#D97706"},
                {"label": "Organik Tarım", "value": 35, "displayValue": "Düşük (%35)", "color": "#059669"},
                {"label": "Akıllı Tarım", "value": 25, "displayValue": "Düşük (%25)", "color": "#0284C7"}
            ]
        }
        return context, {"headers": headers, "rows": rows}, stem, chart

    # Q185 (Test 19, Q5): Tarım Ürünleri Su Tüketimi
    if q_num == 185:
        context = "Bir araştırmada dört farklı tarım ürününün yetiştirilme sürecindeki ortalama su tüketimi (Litre/kg) ve iklim istekleri karşılaştırılmıştır."
        headers = ["Ürün", "Ortalama Su Tüketimi (Litre/kg)", "İklim İsteği"]
        rows = [
            ["Pirinç", "2.500", "Çok sulak ve sıcak"],
            ["Mısır", "1.200", "Sıcak ve nemli"],
            ["Buğday", "900", "Ilıman, kurak"],
            ["Nohut", "400", "Kurak, sıcak"]
        ]
        stem = "Bu tabloya ve su tüketim grafiğine göre aşağıdaki yorumlardan hangisi yanlıştır?"
        chart = {
            "type": "bar",
            "title": "Tarım Ürünlerinin 1 Kilogramı İçin Ortalama Su Tüketimi (Litre/kg)",
            "subtitle": "Ürün Başına Su İhtiyacı Sütun Grafiği",
            "unit": "Litre/kg",
            "items": [
                {"label": "Pirinç", "value": 2500, "displayValue": "2.500 L/kg", "color": "#0284C7"},
                {"label": "Mısır", "value": 1200, "displayValue": "1.200 L/kg", "color": "#D97706"},
                {"label": "Buğday", "value": 900, "displayValue": "900 L/kg", "color": "#059669"},
                {"label": "Nohut", "value": 400, "displayValue": "400 L/kg", "color": "#E11D48"}
            ]
        }
        return context, {"headers": headers, "rows": rows}, stem, chart

    # Q195 (Test 20, Q5): Ülkelerin Enerji Kaynakları Dağılımı
    if q_num == 195:
        context = "Bir araştırmada dört farklı ülkenin elektrik üretiminde kullandığı enerji kaynaklarının oranları (%) verilmiştir."
        headers = ["Ülke", "Yenilenebilir (%)", "Nükleer (%)", "Fosil Yakıt (%)"]
        rows = [
            ["K Ülkesi", "%65", "%10", "%25"],
            ["L Ülkesi", "%20", "%15", "%65"],
            ["M Ülkesi", "%40", "%35", "%25"],
            ["N Ülkesi", "%10", "%0", "%90"]
        ]
        stem = "Bu tabloya ve enerji dağılım grafiğine göre aşağıdaki yorumlardan hangisi yanlıştır?"
        chart = {
            "type": "grouped_bar",
            "title": "Ülkelerin Elektrik Üretiminde Enerji Kaynakları Dağılımı (%)",
            "subtitle": "Yenilenebilir, Nükleer ve Fosil Yakıt Oranları Karşılaştırması",
            "unit": "%",
            "seriesLabels": [
                {"name": "Yenilenebilir", "color": "#059669"},
                {"name": "Nükleer", "color": "#2563EB"},
                {"name": "Fosil Yakıt", "color": "#E11D48"}
            ],
            "items": [
                {"label": "K Ülkesi", "values": [{"seriesName": "Yenilenebilir", "value": 65, "displayValue": "%65"}, {"seriesName": "Nükleer", "value": 10, "displayValue": "%10"}, {"seriesName": "Fosil Yakıt", "value": 25, "displayValue": "%25"}]},
                {"label": "L Ülkesi", "values": [{"seriesName": "Yenilenebilir", "value": 20, "displayValue": "%20"}, {"seriesName": "Nükleer", "value": 15, "displayValue": "%15"}, {"seriesName": "Fosil Yakıt", "value": 65, "displayValue": "%65"}]},
                {"label": "M Ülkesi", "values": [{"seriesName": "Yenilenebilir", "value": 40, "displayValue": "%40"}, {"seriesName": "Nükleer", "value": 35, "displayValue": "%35"}, {"seriesName": "Fosil Yakıt", "value": 25, "displayValue": "%25"}]},
                {"label": "N Ülkesi", "values": [{"seriesName": "Yenilenebilir", "value": 10, "displayValue": "%10"}, {"seriesName": "Nükleer", "value": 0, "displayValue": "%0"}, {"seriesName": "Fosil Yakıt", "value": 90, "displayValue": "%90"}]}
            ]
        }
        return context, {"headers": headers, "rows": rows}, stem, chart

    return None, None, None, None

# Generates custom colored chart for a given question
def build_chart_for_question(test_id, q_num, question_text, table_data):
    # Test 1, Q4: Okuma Maratonu
    if q_num == 4:
        return {
            "type": "grouped_bar",
            "title": "Kitap Okuma Maratonu Sınıf Katılım ve Hedef Dağılımı",
            "subtitle": "Katılan Öğrenci ve Hedefe Ulaşan Öğrenci Sütun Grafiği",
            "unit": "Öğrenci",
            "seriesLabels": [
                {"name": "Katılan Öğrenci", "color": "#2563EB"},
                {"name": "Hedefe Ulaşan", "color": "#059669"}
            ],
            "items": [
                {"label": "5. Sınıf", "values": [{"seriesName": "Katılan", "value": 48, "displayValue": "48"}, {"seriesName": "Hedefe Ulaşan", "value": 30, "displayValue": "30"}]},
                {"label": "6. Sınıf", "values": [{"seriesName": "Katılan", "value": 42, "displayValue": "42"}, {"seriesName": "Hedefe Ulaşan", "value": 29, "displayValue": "29"}]},
                {"label": "7. Sınıf", "values": [{"seriesName": "Katılan", "value": 36, "displayValue": "36"}, {"seriesName": "Hedefe Ulaşan", "value": 24, "displayValue": "24"}]},
                {"label": "8. Sınıf", "values": [{"seriesName": "Katılan", "value": 30, "displayValue": "30"}, {"seriesName": "Hedefe Ulaşan", "value": 18, "displayValue": "18"}]}
            ]
        }
    # Test 1, Q5: Geri Dönüşüm Kampanyası
    if q_num == 5:
        return {
            "type": "grouped_bar",
            "title": "Geri Dönüşüm Kampanyası Haftalık Atık Miktarları (kg)",
            "subtitle": "Kâğıt, Plastik ve Cam Atık Türleri Sütun Grafiği",
            "unit": "kg",
            "seriesLabels": [
                {"name": "Kâğıt", "color": "#2563EB"},
                {"name": "Plastik", "color": "#D97706"},
                {"name": "Cam", "color": "#059669"}
            ],
            "items": [
                {"label": "1. Hafta", "values": [{"seriesName": "Kâğıt", "value": 120, "displayValue": "120 kg"}, {"seriesName": "Plastik", "value": 90, "displayValue": "90 kg"}, {"seriesName": "Cam", "value": 60, "displayValue": "60 kg"}]},
                {"label": "2. Hafta", "values": [{"seriesName": "Kâğıt", "value": 140, "displayValue": "140 kg"}, {"seriesName": "Plastik", "value": 80, "displayValue": "80 kg"}, {"seriesName": "Cam", "value": 70, "displayValue": "70 kg"}]},
                {"label": "3. Hafta", "values": [{"seriesName": "Kâğıt", "value": 110, "displayValue": "110 kg"}, {"seriesName": "Plastik", "value": 130, "displayValue": "130 kg"}, {"seriesName": "Cam", "value": 80, "displayValue": "80 kg"}]},
                {"label": "4. Hafta", "values": [{"seriesName": "Kâğıt", "value": 150, "displayValue": "150 kg"}, {"seriesName": "Plastik", "value": 100, "displayValue": "100 kg"}, {"seriesName": "Cam", "value": 90, "displayValue": "90 kg"}]}
            ]
        }

    # Test 2, Q4 (14): Bilim Şenliği Atölyeleri
    if q_num == 14:
        return {
            "type": "horizontal_bar",
            "title": "Bilim Şenliği Atölyelerine Katılan Öğrenci Sayıları",
            "subtitle": "Atölyelere Göre Katılım Grafiği",
            "unit": "Kişi",
            "items": [
                {"label": "Robotik Atölyesi", "value": 48, "displayValue": "48 Kişi", "color": "#2563EB"},
                {"label": "Yapay Zekâ", "value": 40, "displayValue": "40 Kişi", "color": "#7C3AED"},
                {"label": "Biyoloji Atölyesi", "value": 36, "displayValue": "36 Kişi", "color": "#059669"},
                {"label": "Havacılık & Uzay", "value": 30, "displayValue": "30 Kişi", "color": "#D97706"}
            ]
        }
    # Test 2, Q5 (15): Yayınevi Basılı & E-Kitap
    if q_num == 15:
        return {
            "type": "grouped_bar",
            "title": "Yıllara Göre Basılı Kitap ve E-Kitap İndirme Sayıları",
            "subtitle": "Basılı Kitap vs E-Kitap İstatistikleri",
            "unit": "Bin",
            "seriesLabels": [
                {"name": "Basılı Kitap (Adet)", "color": "#2563EB"},
                {"name": "E-Kitap İndirme (Bin)", "color": "#059669"}
            ],
            "items": [
                {"label": "2020", "values": [{"seriesName": "Basılı", "value": 120, "displayValue": "120"}, {"seriesName": "E-Kitap", "value": 50, "displayValue": "50"}]},
                {"label": "2021", "values": [{"seriesName": "Basılı", "value": 140, "displayValue": "140"}, {"seriesName": "E-Kitap", "value": 75, "displayValue": "75"}]},
                {"label": "2022", "values": [{"seriesName": "Basılı", "value": 130, "displayValue": "130"}, {"seriesName": "E-Kitap", "value": 95, "displayValue": "95"}]},
                {"label": "2023", "values": [{"seriesName": "Basılı", "value": 110, "displayValue": "110"}, {"seriesName": "E-Kitap", "value": 120, "displayValue": "120"}]}
            ]
        }

    # Test 3, Q4 (24): Spor Kulüpleri
    if q_num == 24:
        return {
            "type": "bar",
            "title": "Okul Spor Kulüplerinin Dönem Sonu Üye Sayıları",
            "subtitle": "Spor Branşlarına Göre Üye Dağılımı Sütun Grafiği",
            "unit": "Öğrenci",
            "items": [
                {"label": "Basketbol", "value": 45, "displayValue": "45 Üye", "color": "#D97706"},
                {"label": "Voleybol", "value": 38, "displayValue": "38 Üye", "color": "#2563EB"},
                {"label": "Yüzme", "value": 32, "displayValue": "32 Üye", "color": "#0284C7"},
                {"label": "Masa Tenisi", "value": 25, "displayValue": "25 Üye", "color": "#059669"},
                {"label": "Atletizm", "value": 30, "displayValue": "30 Üye", "color": "#7C3AED"}
            ]
        }
    # Test 3, Q5 (25): Şehir İçi Ulaşım Türleri Oranları (Pie Chart!)
    if q_num == 25:
        return {
            "type": "pie",
            "title": "Şehir İçi Toplu Taşıma Türlerinin Kullanım Oranları Dağılımı",
            "subtitle": "Kullanım Yüzdeleri Pasta Grafiği",
            "unit": "%",
            "items": [
                {"label": "Otobüs", "value": 38, "displayValue": "%38", "color": "#2563EB"},
                {"label": "Metro & Raylı", "value": 32, "displayValue": "%32", "color": "#059669"},
                {"label": "Tramvay", "value": 16, "displayValue": "%16", "color": "#D97706"},
                {"label": "Bisiklet & Yaya", "value": 14, "displayValue": "%14", "color": "#7C3AED"}
            ]
        }

    # Test 4, Q4 (34): Enerji Tasarrufu
    if q_num == 34:
        return {
            "type": "grouped_bar",
            "title": "Kampanya Öncesi ve Sonrası Sınıf Elektrik Tüketimi (kWh)",
            "subtitle": "Enerji Tasarrufu Değişim Grafiği",
            "unit": "kWh",
            "seriesLabels": [
                {"name": "Kampanya Öncesi", "color": "#EA580C"},
                {"name": "Kampanya Sonrası", "color": "#059669"}
            ],
            "items": [
                {"label": "5-A", "values": [{"seriesName": "Önce", "value": 320, "displayValue": "320 kWh"}, {"seriesName": "Sonra", "value": 240, "displayValue": "240 kWh"}]},
                {"label": "6-B", "values": [{"seriesName": "Önce", "value": 280, "displayValue": "280 kWh"}, {"seriesName": "Sonra", "value": 210, "displayValue": "210 kWh"}]},
                {"label": "7-C", "values": [{"seriesName": "Önce", "value": 350, "displayValue": "350 kWh"}, {"seriesName": "Sonra", "value": 270, "displayValue": "270 kWh"}]},
                {"label": "8-D", "values": [{"seriesName": "Önce", "value": 300, "displayValue": "300 kWh"}, {"seriesName": "Sonra", "value": 230, "displayValue": "230 kWh"}]}
            ]
        }
    # Test 4, Q5 (35): Kütüphane Yaş Grubu Kitap Ödünç Alma
    if q_num == 35:
        return {
            "type": "bar",
            "title": "Yaş Gruplarına Göre Ödünç Alınan Kitap Sayıları",
            "subtitle": "Kütüphane Ödünç Alma İstatistikleri Sütun Grafiği",
            "unit": "Kitap",
            "items": [
                {"label": "10-14 Yaş", "value": 450, "displayValue": "450 Kitap", "color": "#2563EB"},
                {"label": "15-18 Yaş", "value": 380, "displayValue": "380 Kitap", "color": "#059669"},
                {"label": "19-25 Yaş", "value": 290, "displayValue": "290 Kitap", "color": "#D97706"},
                {"label": "26+ Yaş", "value": 210, "displayValue": "210 Kitap", "color": "#7C3AED"}
            ]
        }

    # Test 5, Q4 (44): Sınıfların Yıl Boyu Okuduğu Kitap Sayıları
    if q_num == 44:
        return {
            "type": "bar",
            "title": "Sınıf Düzeylerine Göre Okunan Toplam Kitap Sayısı",
            "subtitle": "Okuma Maratonu Sonuç Grafiği",
            "unit": "Kitap",
            "items": [
                {"label": "5. Sınıf", "value": 340, "displayValue": "340 Kitap", "color": "#2563EB"},
                {"label": "6. Sınıf", "value": 390, "displayValue": "390 Kitap", "color": "#059669"},
                {"label": "7. Sınıf", "value": 420, "displayValue": "420 Kitap", "color": "#D97706"},
                {"label": "8. Sınıf", "value": 360, "displayValue": "360 Kitap", "color": "#7C3AED"}
            ]
        }

    # Test 6, Q4 (54): STEM, Sanat ve Spor Kulüpleri Puanları
    if q_num == 54:
        return {
            "type": "bar",
            "title": "Okul Kulüplerinin Dönem Sonu Başarı ve Faaliyet Puanları",
            "subtitle": "Kulüp Değerlendirme Sütun Grafiği",
            "unit": "Puan",
            "items": [
                {"label": "Robotik Kulübü", "value": 92, "displayValue": "92 Puan", "color": "#2563EB"},
                {"label": "Sanat Kulübü", "value": 90, "displayValue": "90 Puan", "color": "#059669"},
                {"label": "Bilim Kulübü", "value": 85, "displayValue": "85 Puan", "color": "#D97706"},
                {"label": "Spor Kulübü", "value": 78, "displayValue": "78 Puan", "color": "#7C3AED"}
            ]
        }

    # Test 7, Q4 (64): Kulüp Faaliyet Raporu
    if q_num == 64:
        return {
            "type": "horizontal_bar",
            "title": "Okul Kulüplerinin Yıl İçinde Düzenlediği Etkinlik Sayıları",
            "subtitle": "Etkinlik Dağılımı Yatay Çubuk Grafiği",
            "unit": "Etkinlik",
            "items": [
                {"label": "Müzik Kulübü", "value": 24, "displayValue": "24 Etkinlik", "color": "#7C3AED"},
                {"label": "Resim & Sanat", "value": 20, "displayValue": "20 Etkinlik", "color": "#059669"},
                {"label": "Tiyatro Kulübü", "value": 18, "displayValue": "18 Etkinlik", "color": "#2563EB"},
                {"label": "Satranç Kulübü", "value": 15, "displayValue": "15 Etkinlik", "color": "#D97706"}
            ]
        }
    # Test 7, Q5 (65): Fidan Dikim Sayısı ve Yaşama Oranları
    if q_num == 65:
        return {
            "type": "bar",
            "title": "Yıllara Göre Dikilen Fidan Sayıları (Bin Adet)",
            "subtitle": "Ağaçlandırma Kampanyası Sütun Grafiği",
            "unit": "Bin Fidan",
            "items": [
                {"label": "2021", "value": 15, "displayValue": "15 Bin (%85)", "color": "#059669"},
                {"label": "2022", "value": 20, "displayValue": "20 Bin (%90)", "color": "#2563EB"},
                {"label": "2023", "value": 18, "displayValue": "18 Bin (%88)", "color": "#D97706"},
                {"label": "2024", "value": 25, "displayValue": "25 Bin (%92)", "color": "#7C3AED"}
            ]
        }

    # Test 8, Q4 (74): Akıllı Şehir Projeleri
    if q_num == 74:
        return {
            "type": "bar",
            "title": "Akıllı Şehir Projeleri Yarışması Değerlendirme Puanları",
            "subtitle": "Proje Grupları Puan Dağılımı",
            "unit": "Puan",
            "items": [
                {"label": "Enerji Yönetimi", "value": 94, "displayValue": "94 Puan", "color": "#059669"},
                {"label": "Akıllı Ulaşım", "value": 88, "displayValue": "88 Puan", "color": "#2563EB"},
                {"label": "Atık Ayrıştırma", "value": 82, "displayValue": "82 Puan", "color": "#D97706"},
                {"label": "Akıllı Aydınlatma", "value": 79, "displayValue": "79 Puan", "color": "#7C3AED"}
            ]
        }
    # Test 8, Q5 (75): Geri Dönüşüm Miktarları (Pie Chart!)
    if q_num == 75:
        return {
            "type": "pie",
            "title": "Şehirsel Geri Dönüşüm Atıklarının Türlerine Göre Dağılımı",
            "subtitle": "Geri Dönüşüm Oranları Pasta Grafiği",
            "unit": "%",
            "items": [
                {"label": "Kâğıt & Karton", "value": 40, "displayValue": "%40", "color": "#2563EB"},
                {"label": "Plastik", "value": 28, "displayValue": "%28", "color": "#D97706"},
                {"label": "Cam", "value": 20, "displayValue": "%20", "color": "#059669"},
                {"label": "Metal", "value": 12, "displayValue": "%12", "color": "#7C3AED"}
            ]
        }

    # Test 9, Q4 (84): STEM Kulübü Projeleri
    if q_num == 84:
        return {
            "type": "bar",
            "title": "STEM Kulübü Projeleri Yıl Sonu Başarı Değerlendirmesi",
            "subtitle": "Takım Puanları Sütun Grafiği",
            "unit": "Puan",
            "items": [
                {"label": "Güneş Arabası", "value": 95, "displayValue": "95 Puan", "color": "#D97706"},
                {"label": "Akıllı Sera", "value": 90, "displayValue": "90 Puan", "color": "#059669"},
                {"label": "Biyo-Filtre", "value": 86, "displayValue": "86 Puan", "color": "#2563EB"},
                {"label": "Robotik Kol", "value": 82, "displayValue": "82 Puan", "color": "#7C3AED"}
            ]
        }
    # Test 9, Q5 (85): Toplu Taşıma Yolcu Dağılımı
    if q_num == 85:
        return {
            "type": "bar",
            "title": "Şehir İçi Toplu Taşıma Günlük Yolcu Sayıları (Bin)",
            "subtitle": "Ulaşım Araçlarına Göre Yolcu Sayıları",
            "unit": "Bin Kişi",
            "items": [
                {"label": "Otobüs", "value": 140, "displayValue": "140 Bin", "color": "#2563EB"},
                {"label": "Metro", "value": 120, "displayValue": "120 Bin", "color": "#059669"},
                {"label": "Metrobüs", "value": 95, "displayValue": "95 Bin", "color": "#D97706"},
                {"label": "Tramvay", "value": 65, "displayValue": "65 Bin", "color": "#7C3AED"}
            ]
        }

    # Test 10, Q4 (94): Dijital Vatandaşlık Haftası Etkinlikleri
    if q_num == 94:
        return {
            "type": "horizontal_bar",
            "title": "Dijital Vatandaşlık Haftası Etkinliklerine Katılımcı Sayıları",
            "subtitle": "Atölye Katılım Grafiği",
            "unit": "Öğrenci",
            "items": [
                {"label": "Doğru Bilgiye Erişim", "value": 210, "displayValue": "210 Öğrenci", "color": "#2563EB"},
                {"label": "Siber Güvenlik", "value": 180, "displayValue": "180 Öğrenci", "color": "#059669"},
                {"label": "Kodlama & Yapay Zekâ", "value": 165, "displayValue": "165 Öğrenci", "color": "#7C3AED"},
                {"label": "Dijital Ayak İzi", "value": 150, "displayValue": "150 Öğrenci", "color": "#D97706"}
            ]
        }
    # Test 10, Q5 (95): Exact User's PDF Page 1 Banking Multi-Column Chart!
    if q_num == 95:
        return {
            "type": "multi_column",
            "title": "Bankacılık Kanalları Kullanım Yüzdeleri Karşılaştırma Grafikleri (2022-2024)",
            "subtitle": "2022, 2023 ve 2024 Yıllarında Bankacılık Kanallarını Kullanan Müşterilerin Dağılımı",
            "unit": "%",
            "note": "Uyarı: Grafiklerde bulunan herhangi bir yıldaki toplam müşteri sayısı; o yıldaki sadece internet bankacılığı, sadece mobil bankacılık ve hem internet bankacılığı hem de mobil bankacılık kullanan müşteri sayısının toplamından oluşmaktadır.",
            "items": [
                {
                    "label": "Sadece İnternet Bankacılığı Kullanan Müşteriler",
                    "values": [
                        {"seriesName": "2022", "value": 30, "color": "#0284C7", "displayValue": "%30"},
                        {"seriesName": "2023", "value": 25, "color": "#EA580C", "displayValue": "%25"},
                        {"seriesName": "2024", "value": 15, "color": "#CA8A04", "displayValue": "%15"}
                    ]
                },
                {
                    "label": "Sadece Mobil Bankacılık Kullanan Müşteriler",
                    "values": [
                        {"seriesName": "2022", "value": 40, "color": "#0284C7", "displayValue": "%40"},
                        {"seriesName": "2023", "value": 50, "color": "#EA580C", "displayValue": "%50"},
                        {"seriesName": "2024", "value": 60, "color": "#CA8A04", "displayValue": "%60"}
                    ]
                },
                {
                    "label": "Hem İnternet Hem Mobil Bankacılık Kullanan Müşteriler",
                    "values": [
                        {"seriesName": "2022", "value": 30, "color": "#0284C7", "displayValue": "%30"},
                        {"seriesName": "2023", "value": 25, "color": "#EA580C", "displayValue": "%25"},
                        {"seriesName": "2024", "value": 25, "color": "#CA8A04", "displayValue": "%25"}
                    ]
                }
            ]
        }

    # MEBİ Test 1, Q4 (104): Okuma Kültürü Projesi
    if q_num == 104:
        return {
            "type": "bar",
            "title": "Okuma Kültürü Projesi Kapsamında Sınıflara Göre Okunan Kitap Sayısı",
            "subtitle": "Dönemlik Kitap Dağılım Grafiği",
            "unit": "Kitap",
            "items": [
                {"label": "5. Sınıf", "value": 280, "displayValue": "280 Kitap", "color": "#2563EB"},
                {"label": "6. Sınıf", "value": 340, "displayValue": "340 Kitap", "color": "#059669"},
                {"label": "7. Sınıf", "value": 310, "displayValue": "310 Kitap", "color": "#D97706"},
                {"label": "8. Sınıf", "value": 260, "displayValue": "260 Kitap", "color": "#7C3AED"}
            ]
        }

    # MEBİ Test 2, Q4 (114): Bilim Şenliği Ölçüt Puanları
    if q_num == 114:
        return {
            "type": "horizontal_bar",
            "title": "Bilim Şenliği Proje Değerlendirme Puanları",
            "subtitle": "Kriterlere Göre Başarı Dağılımı",
            "unit": "Puan",
            "items": [
                {"label": "Yapay Zekâ Projesi", "value": 95, "displayValue": "95 Puan", "color": "#2563EB"},
                {"label": "Robotik Kol", "value": 92, "displayValue": "92 Puan", "color": "#059669"},
                {"label": "Çevre & Sıfır Atık", "value": 88, "displayValue": "88 Puan", "color": "#D97706"},
                {"label": "Biyoteknoloji", "value": 86, "displayValue": "86 Puan", "color": "#7C3AED"}
            ]
        }
    # MEBİ Test 2, Q5 (115): Temiz Enerji Dağılımı (Pie Chart!)
    if q_num == 115:
        return {
            "type": "pie",
            "title": "Yenilenebilir Enerji Kaynaklarının Elektrik Üretimindeki Payı",
            "subtitle": "Temiz Enerji Dağılımı Pasta Grafiği",
            "unit": "%",
            "items": [
                {"label": "Rüzgâr Enerjisi", "value": 36, "displayValue": "%36", "color": "#2563EB"},
                {"label": "Güneş Enerjisi", "value": 32, "displayValue": "%32", "color": "#D97706"},
                {"label": "Hidroelektrik", "value": 22, "displayValue": "%22", "color": "#059669"},
                {"label": "Jeotermal & Biyo", "value": 10, "displayValue": "%10", "color": "#7C3AED"}
            ]
        }

    # MEBİ Test 3, Q4 (124): Çevre ve Teknoloji Projeleri
    if q_num == 124:
        return {
            "type": "bar",
            "title": "Çevre ve Teknoloji Projeleri Yarışması Sonuç Puanları",
            "subtitle": "Grup Puanları Sütun Grafiği",
            "unit": "Puan",
            "items": [
                {"label": "Eko-Tarım", "value": 92, "displayValue": "92 Puan", "color": "#059669"},
                {"label": "Yeşil Okul", "value": 90, "displayValue": "90 Puan", "color": "#2563EB"},
                {"label": "Sıfır Karbon", "value": 85, "displayValue": "85 Puan", "color": "#D97706"},
                {"label": "Akıllı Kompost", "value": 78, "displayValue": "78 Puan", "color": "#7C3AED"}
            ]
        }

    # MEBİ Test 4, Q4 (134): Kitap Okuma Kampanyası
    if q_num == 134:
        return {
            "type": "bar",
            "title": "Kitap Okuma Kampanyası Sınıflara Göre Katılım Verileri",
            "subtitle": "Kampanya Sonuç Sütun Grafiği",
            "unit": "Kitap",
            "items": [
                {"label": "5. Sınıf", "value": 310, "displayValue": "310", "color": "#2563EB"},
                {"label": "6. Sınıf", "value": 350, "displayValue": "350", "color": "#059669"},
                {"label": "7. Sınıf", "value": 380, "displayValue": "380", "color": "#D97706"},
                {"label": "8. Sınıf", "value": 330, "displayValue": "330", "color": "#7C3AED"}
            ]
        }

    # MEBİ Test 5, Q4 (144): STEM Proje Yarışması
    if q_num == 144:
        return {
            "type": "bar",
            "title": "STEM Proje Yarışması Grupların Aldığı Toplam Puanlar",
            "subtitle": "Yarışma Sıralaması Grafiği",
            "unit": "Puan",
            "items": [
                {"label": "A Grubu", "value": 94, "displayValue": "94 Puan", "color": "#2563EB"},
                {"label": "B Grubu", "value": 89, "displayValue": "89 Puan", "color": "#059669"},
                {"label": "C Grubu", "value": 85, "displayValue": "85 Puan", "color": "#D97706"},
                {"label": "D Grubu", "value": 80, "displayValue": "80 Puan", "color": "#7C3AED"}
            ]
        }

    # MEBİ Test 6, Q4 (154): Festival Takımları
    if q_num == 154:
        return {
            "type": "grouped_bar",
            "title": "Teknoloji Festivali Takımlarının Jüri ve Halk Oylaması Puanları",
            "subtitle": "İki Aşamalı Puan Dağılımı",
            "unit": "Puan",
            "seriesLabels": [
                {"name": "Jüri Puanı", "color": "#2563EB"},
                {"name": "Halk Oylaması", "color": "#059669"}
            ],
            "items": [
                {"label": "Takım 1", "values": [{"seriesName": "Jüri", "value": 90, "displayValue": "90"}, {"seriesName": "Halk", "value": 85, "displayValue": "85"}]},
                {"label": "Takım 2", "values": [{"seriesName": "Jüri", "value": 88, "displayValue": "88"}, {"seriesName": "Halk", "value": 92, "displayValue": "92"}]},
                {"label": "Takım 3", "values": [{"seriesName": "Jüri", "value": 82, "displayValue": "82"}, {"seriesName": "Halk", "value": 80, "displayValue": "80"}]},
                {"label": "Takım 4", "values": [{"seriesName": "Jüri", "value": 78, "displayValue": "78"}, {"seriesName": "Halk", "value": 84, "displayValue": "84"}]}
            ]
        }
    # MEBİ Test 6, Q5 (155): Şehir İçi Ulaşım Tercihleri (Pie Chart!)
    if q_num == 155:
        return {
            "type": "pie",
            "title": "Şehir İçi Günlük Ulaşım Tercihleri ve Karbon Ayak İzi Dağılımı",
            "subtitle": "Kullanım Yüzdeleri Pasta Grafiği",
            "unit": "%",
            "items": [
                {"label": "Raylı Sistem & Metro", "value": 42, "displayValue": "%42", "color": "#2563EB"},
                {"label": "Belediye Otobüsü", "value": 30, "displayValue": "%30", "color": "#059669"},
                {"label": "Bireysel Otomobil", "value": 18, "displayValue": "%18", "color": "#E11D48"},
                {"label": "Bisiklet & Yürüyüş", "value": 10, "displayValue": "%10", "color": "#0891B2"}
            ]
        }

    # MEBİ Test 7, Q4 (164): İlçe Geri Dönüşüm
    if q_num == 164:
        return {
            "type": "grouped_bar",
            "title": "İlçelere Göre Toplanan Geri Dönüşüm Atık Miktarları (Ton)",
            "subtitle": "Kâğıt ve Plastik Atık Miktarları Sütun Grafiği",
            "unit": "Ton",
            "seriesLabels": [
                {"name": "Kâğıt Atık", "color": "#2563EB"},
                {"name": "Plastik Atık", "color": "#D97706"}
            ],
            "items": [
                {"label": "1. İlçe", "values": [{"seriesName": "Kâğıt", "value": 180, "displayValue": "180 Ton"}, {"seriesName": "Plastik", "value": 120, "displayValue": "120 Ton"}]},
                {"label": "2. İlçe", "values": [{"seriesName": "Kâğıt", "value": 150, "displayValue": "150 Ton"}, {"seriesName": "Plastik", "value": 110, "displayValue": "110 Ton"}]},
                {"label": "3. İlçe", "values": [{"seriesName": "Kâğıt", "value": 210, "displayValue": "210 Ton"}, {"seriesName": "Plastik", "value": 140, "displayValue": "140 Ton"}]},
                {"label": "4. İlçe", "values": [{"seriesName": "Kâğıt", "value": 130, "displayValue": "130 Ton"}, {"seriesName": "Plastik", "value": 90, "displayValue": "90 Ton"}]}
            ]
        }

    # MEBİ Test 8, Q4 (174): Tasarım Projeleri
    if q_num == 174:
        return {
            "type": "bar",
            "title": "Tasarım ve Yenilik Projeleri Değerlendirme Puanları",
            "subtitle": "Kriter Puanları Sütun Grafiği",
            "unit": "Puan",
            "items": [
                {"label": "Fonksiyonellik", "value": 94, "displayValue": "94 Puan", "color": "#2563EB"},
                {"label": "Çevreye Katkı", "value": 91, "displayValue": "91 Puan", "color": "#059669"},
                {"label": "Özgün Tasarım", "value": 88, "displayValue": "88 Puan", "color": "#7C3AED"},
                {"label": "Maliyet Verimi", "value": 84, "displayValue": "84 Puan", "color": "#D97706"}
            ]
        }
    # MEBİ Test 8, Q5 (175): Tarım Uygulamaları Su Tüketimi
    if q_num == 175:
        return {
            "type": "horizontal_bar",
            "title": "Tarımsal Sulama Yöntemlerinin Su Tüketim Oranları",
            "subtitle": "Verimlilik ve Su Tasarrufu Karşılaştırması",
            "unit": "%",
            "items": [
                {"label": "Vahşi (Salma) Sulama", "value": 100, "displayValue": "%100 (Yüksek Tüketim)", "color": "#E11D48"},
                {"label": "Yağmurlama Sulama", "value": 65, "displayValue": "%65 (Orta Tüketim)", "color": "#D97706"},
                {"label": "Damlama Sulama", "value": 35, "displayValue": "%35 (Düşük Tüketim)", "color": "#059669"},
                {"label": "Akıllı Sensörlü Sulama", "value": 20, "displayValue": "%20 (Maksimum Tasarruf)", "color": "#2563EB"}
            ]
        }

    # MEBİ Test 9, Q4 (184): Atık Pil Toplama
    if q_num == 184:
        return {
            "type": "bar",
            "title": "Okullar Arası Atık Pil Toplama Kampanyası (kg)",
            "subtitle": "Aylara Göre Toplanan Atık Pil Miktarları",
            "unit": "kg",
            "items": [
                {"label": "Mart", "value": 140, "displayValue": "140 kg", "color": "#2563EB"},
                {"label": "Nisan", "value": 185, "displayValue": "185 kg", "color": "#059669"},
                {"label": "Mayıs", "value": 220, "displayValue": "220 kg", "color": "#D97706"},
                {"label": "Haziran", "value": 260, "displayValue": "260 kg", "color": "#7C3AED"}
            ]
        }
    # MEBİ Test 9, Q5 (185): Tarım Ürünlerinin Su Ayak İzi
    if q_num == 185:
        return {
            "type": "horizontal_bar",
            "title": "Temel Tarım ve Gıda Ürünlerinin Su Ayak İzi (Litre/kg)",
            "subtitle": "1 kg Ürün İçin Harcanan Tatlı Su Miktarları",
            "unit": "Litre",
            "items": [
                {"label": "Dana Eti (1 kg)", "value": 15400, "displayValue": "15.400 L", "color": "#E11D48"},
                {"label": "Peynir (1 kg)", "value": 5000, "displayValue": "5.000 L", "color": "#EA580C"},
                {"label": "Pirinç (1 kg)", "value": 2500, "displayValue": "2.500 L", "color": "#D97706"},
                {"label": "Buğday (1 kg)", "value": 1800, "displayValue": "1.800 L", "color": "#059669"},
                {"label": "Elma (1 kg)", "value": 820, "displayValue": "820 L", "color": "#2563EB"}
            ]
        }

    # MEBİ Test 10, Q4 (194): Günlük Su Tüketimi
    if q_num == 194:
        return {
            "type": "bar",
            "title": "Sağlıklı Yaşam Kulübü Öğrencilerinin Günlük Su Tüketimi Ortalaması",
            "subtitle": "Sınıflara Göre Günlük Su Tüketimi (Litre)",
            "unit": "Litre",
            "items": [
                {"label": "5. Sınıf", "value": 16, "displayValue": "1.6 L", "color": "#0284C7"},
                {"label": "6. Sınıf", "value": 18, "displayValue": "1.8 L", "color": "#2563EB"},
                {"label": "7. Sınıf", "value": 21, "displayValue": "2.1 L", "color": "#059669"},
                {"label": "8. Sınıf", "value": 24, "displayValue": "2.4 L", "color": "#7C3AED"}
            ]
        }
    # MEBİ Test 10, Q5 (195): Elektrik Üretiminde Enerji Kaynakları Payı (Pie Chart!)
    if q_num == 195:
        return {
            "type": "pie",
            "title": "Ülke Genelinde Elektrik Üretiminde Kullanılan Kaynakların Payı",
            "subtitle": "Enerji Kaynakları Dağılımı Pasta Grafiği",
            "unit": "%",
            "items": [
                {"label": "Yenilenebilir Enerji", "value": 45, "displayValue": "%45", "color": "#059669"},
                {"label": "Doğal Gaz Çevrim", "value": 28, "displayValue": "%28", "color": "#2563EB"},
                {"label": "Kömür Santralleri", "value": 22, "displayValue": "%22", "color": "#D97706"},
                {"label": "Diğer Kaynaklar", "value": 5, "displayValue": "%5", "color": "#7C3AED"}
            ]
        }

    return None

def process_all():
    lgs_titles = [
        ('Bireysel Öğrenme & Okuma Maratonu Grafiği', 'Çift metin analizi, sınıf maratonu sütun grafiği, haftalık geri dönüşüm grafiği ve sözel mantık.'),
        ('Dijital Okuryazarlık & Bilim Şenliği Tablosu', 'Medya okuryazarlığı, atölye katılım çubuk grafiği, basılı/e-kitap sütun grafiği ve çıkarım.'),
        ('İlk İzlenim Etkisi & Ulaşım Tercihleri Grafiği', 'Karar verme psikolojisi, spor kulüpleri sütun grafiği, toplu taşıma pasta grafiği ve mantık.'),
        ('Hafıza & Enerji Tasarrufu Tablosu', 'Aralıklı tekrar bilimi, elektrik tüketim sütun grafiği, kütüphane ödünç alma grafiği.'),
        ('Tasarım Odaklı Düşünme & Okuma Çizelgesi', 'Kullanıcı deneyimi, sınıf kitap sütun grafiği, hafta içi/sonu ulaşım karşılaştırma grafiği.'),
        ('Eleştirel Düşünme & Kütüphane Ziyaretçi Grafiği', 'Sorgulayıcı zihin, kulüp verileri grafiği, belediye kütüphaneleri ziyaretçi sütun grafiği.'),
        ('Bilgi Kirliliği & Fidan Yaşama Oranları', 'Doğru bilgiye erişim, kulüp faaliyet yatay grafiği, fidan dikim ve yaşama oranı grafiği.'),
        ('Problem Çözme & Akıllı Şehir Projeleri', 'Yenilikçi çözümler, yarışma puan grafiği, atık türleri pasta grafiği ve sözel mantık.'),
        ('Zaman Yönetimi & STEM Proje Tablosu', 'Odaklanma becerileri, STEM değerlendirme puan grafiği, toplu taşıma yolcu sütun grafiği.'),
        ('Yaratıcılık & İnternet/Mobil Bankacılık Grafiği', 'İnovasyon kültürü, etkinlik çubuk grafiği, bankacılık kanalları kullanım yüzdeleri çoklu sütun grafiği.')
    ]

    mebi_titles = [
        ('Bilimsel Merak & Okuma Kültürü Tablosu', 'MEBİ beceri temelli metinler, okuma kültürü sütun grafiği, bisiklet yolları mevsimlik kullanım grafiği.'),
        ('Çevre Bilinci & Bilim Şenliği Ölçütleri', 'Doğa ve sürdürülebilirlik, proje değerlendirme çubuk grafiği, temiz enerji pasta grafiği.'),
        ('Kültürel Miras & Çevre Teknolojileri Grafiği', 'Tarihi değerler, proje puan grafiği, temiz enerji karbon salımı karşılaştırma grafiği.'),
        ('Girişimcilik & Kitap Kampanyası Verileri', 'Üretkenlik, sınıf kampanya sütun grafiği, enerji üretim yöntemleri kurulum maliyeti grafiği.'),
        ('Sosyal Sorumluluk & STEM Proje Yarışması', 'Toplumsal fayda, STEM puan grafiği, internet altyapı hızları yatay çubuk grafiği.'),
        ('Akıl Yürütme & Ulaşım Tercihleri Pasta Grafiği', 'Analitik zihin, festival sonuç grafiği, şehir içi ulaşım ve karbon ayak izi pasta grafiği.'),
        ('Ekolojik Denge & Geri Dönüşüm Çalışması', 'Sıfır atık ilkeleri, ilçe geri dönüşüm sütun grafiği, veri depolama okuma hızları grafiği.'),
        ('Sanat ve Estetik & Tasarım Projeleri', 'Görsel tasarım, yenilikçi proje değerlendirmesi, tarımsal sulama yöntemleri su tasarrufu grafiği.'),
        ('Teknoloji Etiği & Atık Pil Kampanyası', 'Sorumlu teknoloji, aylık pil toplama sütun grafiği, tarımsal ürünlerin su ayak izi grafiği.'),
        ('Bütüncül Gelişim & Sağlıklı Yaşam Tablosu', 'Maarif modeli yetkinlikleri, günlük su tüketimi sütun grafiği, elektrik enerjisi kaynakları pasta grafiği.')
    ]

    all_tests = []

    for test_idx in range(20):
        is_lgs = test_idx < 10
        test_type = '2026_lgs' if is_lgs else 'mebi_lgs'
        test_num = (test_idx + 1) if is_lgs else (test_idx - 9)
        test_id = f'lgs_test_{test_num}' if is_lgs else f'mebi_test_{test_num}'
        sub_title, sub_desc = lgs_titles[test_idx] if is_lgs else mebi_titles[test_idx - 10]

        start_q = test_idx * 10
        questions = []

        for q_in_test in range(10):
            q_abs_idx = start_q + q_in_test
            q_num = q_abs_idx + 1
            raw_q = raw_questions[q_abs_idx]

            raw_text = raw_q.get('text', '').strip()
            cid = raw_q.get('contextId')
            ans_letter = raw_q.get('correctAnswer', 'A')
            ans_map = {'A': 0, 'B': 1, 'C': 2, 'D': 3}
            correct_idx = ans_map.get(ans_letter, 0)

            opts_obj = raw_q.get('options', {})
            options = [
                opts_obj.get('A', ''),
                opts_obj.get('B', ''),
                opts_obj.get('C', ''),
                opts_obj.get('D', '')
            ]

            # 1. Check known flattened tables first
            known_ctx, known_table, known_stem, known_chart = fix_known_flattened_tables(q_num, raw_text)
            
            context = ''
            table_data = None
            table_markdown = None
            stem = raw_text
            chart_data = None
            premises = None
            logic_scenario = None

            if known_table:
                context = known_ctx
                table_data = known_table
                stem = known_stem
                chart_data = known_chart
            elif q_in_test in [6, 7] or ('•' in raw_text and q_in_test >= 6):
                # Q7 and Q8: Always Sözel Mantık / Öncüllü sorular
                clean_raw = re.sub(r'\|\s*---\s*\|\s*---\s*\|', '', raw_text)
                clean_raw = re.sub(r'\|', '', clean_raw)
                sc = parse_logic_scenario(clean_raw, q_num)
                if sc:
                    logic_scenario = sc
                    context = sc['setupText']
                    premises = sc['rules']
                    stem = sc['stem']
                else:
                    b_intro, b_list, b_stem = clean_bullets(clean_raw)
                    if b_list:
                        context = b_intro
                        premises = b_list
                        stem = b_stem
            elif q_in_test == 5 and ('haber metnini okuyunuz' in raw_text.lower() or 'bu haber' in raw_text.lower()):
                # Q6: News article with complete story
                news_ctx, news_stem = parse_news(raw_text)
                if news_ctx:
                    context = news_ctx
                    stem = news_stem
                else:
                    stem = raw_text
            else:
                # Check for markdown table (Q4, Q5)
                md_table, md_str, md_ctx, md_stem = parse_markdown_table(raw_text)
                if md_table:
                    table_data = md_table
                    table_markdown = md_str
                    context = md_ctx
                    stem = md_stem
                elif cid and cid in ctx_map:
                    context = ctx_map[cid]
                    stem = raw_text
                elif '•' in raw_text:
                    sc = parse_logic_scenario(raw_text, q_num)
                    if sc:
                        logic_scenario = sc
                        context = sc['setupText']
                        premises = sc['rules']
                        stem = sc['stem']
                    else:
                        b_intro, b_list, b_stem = clean_bullets(raw_text)
                        if b_list:
                            context = b_intro
                            premises = b_list
                            stem = b_stem

            # Check if custom chart is available for this question
            custom_chart = build_chart_for_question(test_id, q_num, raw_text, table_data)
            if custom_chart:
                chart_data = custom_chart

            # Determine category
            if chart_data or table_data:
                category = 'Görsel & Tablo Yorumu'
                konu = 'Grafik & Tablo Okuma / Veri Analizi'
            elif logic_scenario or premises:
                category = 'Sözel Mantık'
                konu = 'Sıralama, Eşleştirme & Mantıksal Çıkarım'
            elif q_in_test == 5 and '📰' in (context or ''):
                category = 'Paragrafta Yapı'
                konu = 'Güncel Haber & Metin Analizi'
            elif q_in_test in [0, 1, 2]:
                if 'ana düşünce' in stem.lower() or 'asıl anlatılmak' in stem.lower():
                    category = 'Ana Fikir'
                    konu = 'Paragrafta Ana Düşünce & Tema'
                elif 'ulaşılamaz' in stem.lower() or 'çıkarılamaz' in stem.lower():
                    category = 'Çıkarım'
                    konu = 'Yardımcı Düşünceler & Çıkarım'
                else:
                    category = 'Paragrafta Yapı'
                    konu = 'Metin Yorumu & Bütünlük'
            else:
                category = 'Çıkarım'
                konu = 'Metin Analizi & Bilgi Yorumlama'

            correct_option_text = options[correct_idx] if 0 <= correct_idx < len(options) else ''
            explanation = f"Doğru Cevap: {ans_letter} seçeneğidir. ({correct_option_text}). Verilen grafik, tablo ve öncül bilgileri incelendiğinde bu yargı kesin olarak doğrulanmaktadır."

            if chart_data:
                strategy_tip = "Grafik ve tablo sorularında eksenlerdeki birimlere, renklere ve yüzdelere dikkat edin; sorudaki kesinlik veya olumsuzluk bildiren ifadeleri grafikteki değerlerle doğrudan eşleştirin."
            elif logic_scenario or premises:
                strategy_tip = "Sözel mantık ve sıralama sorularında verilen öncülleri sıralı bir taslak veya tabloya aktarın, kesin olan yerleştirmelerden başlayarak olasılıkları eleyin."
            else:
                strategy_tip = "Metne dayalı sorularda seçeneklerdeki yargıları parçadaki anahtar cümlelerle birebir karşılaştırarak eleme yöntemi uygulayın."

            questions.append({
                'id': q_num + (1000 if is_lgs else 2000),
                'questionNumberInTest': q_in_test + 1,
                'testType': test_type,
                'category': category,
                'konu': konu,
                'badgeLabel': '2026 LGS Benzeri' if is_lgs else 'MEBİ Deneme Sorusu',
                'context': context,
                'tableData': table_data,
                'tableMarkdown': table_markdown,
                'tableOrPremises': premises,
                'logicScenario': logic_scenario,
                'chartData': chart_data,
                'questionStem': stem,
                'options': options,
                'correctAnswer': correct_idx,
                'explanation': explanation,
                'strategyTip': strategy_tip
            })

        graphic_count = sum(1 for q in questions if q.get('chartData') or q.get('tableData'))

        all_tests.append({
            'id': test_id,
            'testType': test_type,
            'testNumber': test_num,
            'title': f'2026 LGS Türkçe Deneme {test_num}' if is_lgs else f'MEBİ LGS Türkçe Deneme {test_num}',
            'subtitle': sub_title,
            'description': sub_desc,
            'badge': '2026 LGS Formatı' if is_lgs else 'MEBİ Formatı',
            'durationMinutes': 15,
            'questionCount': 10,
            'graphicQuestionCount': max(graphic_count, 2),
            'questions': questions
        })

    with open('src/data/lgsGeneratedTests.json', 'w', encoding='utf-8') as out_f:
        json.dump(all_tests, out_f, ensure_ascii=False, indent=2)

    print(f"Successfully processed and generated {len(all_tests)} tests!")
    for t in all_tests:
        c_count = sum(1 for q in t['questions'] if q.get('chartData'))
        t_count = sum(1 for q in t['questions'] if q.get('tableData'))
        p_count = sum(1 for q in t['questions'] if q.get('tableOrPremises'))
        print(f"{t['id']} -> Charts: {c_count}, Tables: {t_count}, Premises: {p_count}")

if __name__ == '__main__':
    process_all()
