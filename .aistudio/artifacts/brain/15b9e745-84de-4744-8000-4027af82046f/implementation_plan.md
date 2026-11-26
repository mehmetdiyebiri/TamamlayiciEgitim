# ARİF Gerçek Öğrenci Sıralaması ve Davranış Takip Uyarı Listesi Planı

ARİF projesindeki **Gelişim Kartı** (Okul Sıralaması İlk 10 ve Sınıf Sıralaması İlk 5) ile **Davranış Notu** (Davranış Takip Uyarı Listesi) ekranlarına sızan eski/örnek kayıtları tamamen temizleyip, yalnızca okulun aktif sınıflarındaki gerçek öğrencilerin güncel puanlarını sınıf etiketleri ve tıklayarak öğrenci seçme özelliğiyle birlikte göstereceğiz.

---

## Kullanıcı Onayı ve Kesinleşen Kararlar

> [!IMPORTANT]
> Aşağıdaki ürün tercihleri onayınız doğrultusunda plana dahil edilmiştir. Onayladığınızda doğrudan uygulamaya geçilecektir.

- **Öğrenci Kapsamı (Kesinleşti):** Her iki listede de yalnızca okulun aktif sınıflarında kayıtlı öğrenciler yer alacak; `Nakil Gidenler` havuzundakiler, devam durumu `Başka Okula Nakil` olanlar ve veritabanında kalmış eski demo/arşiv kayıtları kesinlikle listelenmeyecek.
- **0 Puanlı Öğrenciler (Kesinleşti):** Gelişim Kartı Okul ve Sınıf Sıralamalarında yalnızca puanı **0'dan büyük** olan öğrenciler gösterilecek; henüz puanı olan aktif öğrenci yoksa düzenli boş durum mesajı gösterilecek.
- **Satır Görünümü ve Etkileşim (Kesinleşti):** Tüm sıralama ve uyarı satırlarında öğrencinin **sınıf etiketi** (örn. `6-A`) yer alacak ve öğretmen/yönetici bir öğrenci satırına tıkladığında doğrudan ilgili sınıf ve öğrenci seçilerek değerlendirme ekranı açılacak.

---

## 1. Genel Bakış ve Temel Sorun Çözümü

- **Sorunun Kaynağı:**
  1. **Koleksiyon Uyumsuzluğu:** Okul genel sıralama dinleyicisi, varsayılan okul için yeni aktivite ve davranış kayıtlarının yazıldığı okul portfolyo koleksiyonu yerine yalnızca eski ortak koleksiyonu dinliyordu; bu nedenle gerçek öğrencilere yeni girilen puanlar alt listelere yansımıyordu.
  2. **Aktif Sınıf Filtresinin Eksikliği:** Alt listeler, aktif sınıf listesini tek doğruluk kaynağı (Single Source of Truth) almak yerine portfolyo koleksiyonundaki tüm belgeleri (eski demo öğrenciler dahil) listeye dahil ediyordu.
  3. **Çift Sayım Riski:** Davranış uyarı listesinde seçili öğrencinin mevcut kayıtları, portfolyo kayıtlarının üzerine tekrar eklenerek puanın çift hesaplanmasına yol açabiliyordu.
- **Hedef Kitle:** ARİF modülünü kullanan okul yöneticileri, rehber öğretmenler, sınıf öğretmenleri ve öğrenciler.
- **Temel Kazanım:** Okul sıralaması, sınıf sıralaması ve 5 kademeli davranış uyarı listesi anlık olarak %100 gerçek aktif okul mevcudu ve güncel Firestore kayıtlarıyla eşleşir.

---

## 2. Kullanıcı Deneyimi ve Görsel Tasarım

### Temel Kullanıcı Akışları
1. **Gelişim Kartı — Okul Sıralaması (İlk 10) & Sınıf Sıralaması (İlk 5):**
   - Yönetici veya öğretmen Gelişim Kartı sekmesine girdiğinde yalnızca aktif sınıflardaki ve puanı `> 0` olan gerçek öğrenciler en yüksek puandan sıralı görünür.
   - Her satırda sıra rozeti (`1`, `2`, `3`...), öğrencinin adı, yanında temiz bir sınıf etiketi (örn. `6-A`) ve sağda gerçek toplam aktivite puanı yer alır.
   - Yeni bir aktivite eklendiğinde veya silindiğinde sıralama sayfa yenilemeye gerek kalmadan anında güncellenir.
   - Öğretmen/yönetici listedeki herhangi bir öğrenciye tıkladığında o öğrencinin sınıfı ve kendisi otomatik seçilir ve ekran yukarı kaydırılarak öğrencinin gelişim kartı açılır.
2. **Davranış Notu — Davranış Takip Uyarı Listesi (5 Kademe):**
   - `Sözlü Uyarı Alacaklar (-5 ile -10)`, `Öğrenci Sözleşmesi (-10 ile -20)`, `Öğrenci-Veli-Okul Sözleşmesi (-20 ile -30)`, `İdare Tarafından Son Uyarı (-30 ile -40)` ve `Disiplin Kuruluna Yönlendirilecekler (-40 ve altı)` kutuları yalnızca aktif sınıflardaki gerçek öğrencilerin silinmemiş davranış kayıtlarının net toplamına göre dolar.
   - Her öğrenci kartında öğrencinin adı, sınıf etiketi (örn. `7-A`) ve güncel net davranış puanı yer alır; tıklanarak doğrudan o öğrencinin davranış değerlendirme sayfasına geçilebilir.
   - Hiçbir aktif öğrenci ilgili negatif puan aralığında değilse kutuda temiz bir *"Öğrenci Yok"* ibaresi görünür (eski demo isimler asla görünmez).

### Görsel Kimlik ve Etkileşim
- **Mevcut Tasarım Diline Uyum:** ARİF modülünün mevcut temiz beyaz kart (`bg-white`), yumuşak kenarlık (`rounded-2xl / rounded-3xl`), mavi/indigo vurgu (Gelişim Kartı) ve kademeli kırmızı uyarı tonları (Davranış Notu) korunur.
- **Sınıf Etiketi:** Öğrenci adının yanında kompakt, yüksek kontrastlı küçük bir sınıf rozeti (`bg-slate-100 text-slate-600` / seçili satırda `bg-indigo-100 text-indigo-700`) kullanılır.
- **Etkileşim Geri Bildirimi:** Tıklanabilir satırlarda yumuşak hover vurgusu (`hover:shadow-sm`, `cursor-pointer`) uygulanır; öğrenci rolündeki kullanıcılar başka öğrencilere geçiş yapamayacağı için onlarda satırlar salt okunur kalır.

---

## 3. Temel Ürün Kararları ve Gerekçeleri

- **Karar 1 — Aktif Sınıf Listesinin Tek Doğruluk Kaynağı Olması:**
  - *Seçilen Yaklaşım:* Sıralama ve uyarı listeleri önce okulun aktif sınıflarındaki (arşiv yılı inceleniyorsa o arşiv yılının sınıflarındaki) öğrencileri toplar; `Nakil Gidenler` sınıfını ve devam durumu `Başka Okula Nakil` olanları eler; ardından yalnızca bu gerçek öğrenciler için portfolyo verilerini eşleştirir.
  - *Neden:* Veritabanında kalmış eski test/demo veya silinmiş öğrenci belgelerinin hiçbir koşulda okul listelerine sızmasını engeller.
  - *Alternatifler:* Veritabanındaki eski belgeleri manuel silmek — tek başına yeterli değildir çünkü mezun olan veya nakil giden öğrenciler ileride tekrar eski kayıt bırakabilir.

- **Karar 2 — Okul Portfolyo Dinleyicisinin Birleştirilmesi ve Tekilleştirilmesi:**
  - *Seçilen Yaklaşım:* Varsayılan okulda hem güncel okul portfolyo koleksiyonu hem de geriye dönük uyumluluk için eski portfolyo/aktivite kaynakları dinlenecek; ancak bir öğrencinin aktivite ve davranış kayıtları benzersiz kayıt kimliğine (`id`) göre tekilleştirilerek birleştirilecek ve okul değiştiğinde eski dinleyiciler temizlenecek.
  - *Neden:* Hem mevcut veriler kaybolmaz hem de yeni eklenen puanlar anında gerçek zamanlı olarak tüm sıralamalara yansır.

- **Karar 3 — Seçili Öğrencide Çift Sayımın Önlenmesi:**
  - *Seçilen Yaklaşım:* O an seçili olan öğrencinin canlı aktivite ve davranış listesi, toplu portfolyo verisinin üzerine eklenmek yerine benzersiz kimlik bazlı birleştirme / doğrudan önceliklendirme ile hesaplanacak.
  - *Neden:* Davranış notu eklendiğinde veya silindiğinde puanın iki kez toplanmasını engeller.

---

## 4. Teknik Mimari ve Veri Stratejisi *(Teknik Referans)*

### Sistem Akış Diyagramı

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                       Firestore Gerçek Zamanlı Kaynaklar                │
│  ┌──────────────────────┐  ┌──────────────────┐  ┌───────────────────┐ │
│  │ portfolios_{schoolId}│  │ portfolios (eski)│  │ activities_{id}   │ │
│  └──────────┬───────────┘  └────────┬─────────┘  └─────────┬─────────┘ │
└─────────────┼───────────────────────┼──────────────────────┼───────────┘
              └───────────────────────┼──────────────────────┘
                                      ▼
                ┌───────────────────────────────────────────┐
                │   Okul Portfolyo Birleştirici (ID Bazlı   │
                │   Tekilleştirme + Anlık İyimser Güncelle) │
                └─────────────────────┬─────────────────────┘
                                      │
          ┌───────────────────────────┴───────────────────────────┐
          │         Aktif Sınıf Mevcudu Filtresi                  │
          │  • Aktif / Arşiv Sınıflarından Gerçek Öğrenciler      │
          │  • "Nakil Gidenler" & "Başka Okula Nakil" Hariç       │
          │  • Türkçe Karakter & Okul No Normalizasyon Eşleştirme │
          └───────────┬───────────────────────────────┬───────────┘
                      ▼                               ▼
     ┌────────────────────────────────┐  ┌────────────────────────────────┐
     │  Gelişim Kartı Sıralamaları    │  │ Davranış Takip Uyarı Listesi   │
     │  • Okul Sıralaması (İlk 10)    │  │ • 5 Negatif Puan Kademesi      │
     │  • Sınıf Sıralaması (İlk 5)    │  │ • Silinmemiş Kayıtların Neti   │
     │  • Yalnızca Puan > 0           │  │ • Sınıf Etiketi + Tıkla & Git  │
     │  • Sınıf Etiketi + Tıkla & Git │  │                                │
     └────────────────────────────────┘  └────────────────────────────────┘
```

### Veri Modeli ve Durum Yönetimi
- **Aktif Öğrenci Haritası:** Her gerçek öğrenci `{ fullName, className, normalizedKey }` olarak aktif sınıflardan türetilir. Aynı öğrencinin portfolyosu hem tam ad (`38 - MUHAMMED EMİN GÜVENMAN`) hem de okul numarasız / küçük-büyük harf varyantı üzerinden Türkçe normalizasyonla güvenli biçimde eşleştirilir.
- **Gerçek Zamanlı Güncelleme:** Gelişim Kartı aktivite ekleme/silme ve Davranış Notu ekleme/telafi/silme aksiyonları hem Firestore'a yazar (belgede `fullName` alanını da koruyarak) hem de okul portfolyo durumunu anlık günceller.
- **Dinleyici Temizliği:** Okul kimliği değiştiğinde önceki Firestore abonelikleri (`unsubscribe`) düzgün şekilde kapatılır ve eski okulun verileri sıfırlanır.

### Etkileşimli Bileşen ve Durum Eşleştirmesi
- **Öğrenci Satırına Tıklama:** Öğretmen/yönetici bir satıra tıkladığında önce `setSelectedClass(student.className)`, ardından `setSelectedStudent(student.fullName)` tetiklenir ve sayfa yumuşak biçimde üst alana (`window.scrollTo`) kaydırılır.
- **Arşiv Yılı Uyumu:** Kullanıcı üst menüden bir arşiv yılına geçtiğinde aktif sınıf listesi yerine ilgili arşiv döneminin sınıf listesi esas alınır.
- **Güvenli Boş Durumlar:** Puanı olan aktif öğrenci bulunmadığında eski demo kayıtlar yerine ilgili kartlarda temiz boş durum mesajları gösterilir.
