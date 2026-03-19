# Developer üçün Kod Strukturu

## 📁 Fayl Strukturu

```
webapp/
├── index.html           # Ana HTML (bütün bölmələr burada)
├── styles.css           # CSS stillər
├── app.js               # JavaScript funksiyalar
├── service-worker.js    # PWA Service Worker (cache versiyası burada)
├── manifest.json        # PWA Manifest
├── icon-192.png         # PWA ikonu
├── icon-512.png         # PWA ikonu
├── render.yaml          # Render.com konfiqurasiyası
├── README.md            # Ümumi məlumat
├── DEPLOY.md            # Deploy təlimatı
└── STRUKTUR.md          # Bu fayl (Developer guide)
```

---

## 🔧 Yeni Məlumat Əlavə Etmək

**Fayl:** `index.html`

**Yer:** `<div id="melumat" class="section hidden">` bölməsində

```html
<!-- ✅ BURAYA YENI MƏLUMAT ƏLAVƏ EDİN -->
<div class="info-item">
    <h3>📌 Yeni Məlumat Başlığı</h3>
    <p>Buraya yeni məlumat mətni yazın. İstədiyiniz qədər uzun ola bilər.</p>
</div>
```

**Misal:**
```html
<div class="info-item">
    <h3>📌 İmtahan tarixi</h3>
    <p>Buraxılış imtahanları iyun ayında keçirilir.</p>
</div>

<div class="info-item">
    <h3>📌 Qeydiyyat qaydası</h3>
    <p>Qeydiyyat mart ayından başlayır.</p>
</div>
```

---

## 🔗 Yeni Link Əlavə Etmək

**Fayl:** `index.html`

**Yer:** `<div id="linkler" class="section hidden">` bölməsində

```html
<!-- ✅ BURAYA YENİ LİNK ƏLAVƏ EDİN -->
<a href="https://example.com" class="link-button" target="_blank" rel="noopener noreferrer">
    <span class="link-icon">🔗</span>
    <span class="link-text">Link Adı</span>
</a>
```

**İkon dəyişmək üçün emoji-lər:**
- 🎓 - Universitet
- 📖 - Kitab/Təhsil
- 📱 - Mobil/Tətbiq
- 🌐 - Website
- 📧 - Email
- 📞 - Telefon
- 💬 - Mesaj
- 🔗 - Ümumi link

**Mobil tətbiqlər üçün xüsusi linklər:**
```html
<!-- Instagram -->
<a href="https://instagram.com/username" class="link-button">
    <span class="link-icon">📷</span>
    <span class="link-text">Instagram</span>
</a>

<!-- Telegram -->
<a href="https://t.me/username" class="link-button">
    <span class="link-icon">✈️</span>
    <span class="link-text">Telegram</span>
</a>

<!-- WhatsApp (mobil açılır) -->
<a href="https://wa.me/994559406018" class="link-button">
    <span class="link-icon">💬</span>
    <span class="link-text">WhatsApp</span>
</a>
```

---

## 🔄 Cache Versiyasını Yeniləmək

**Fayl:** `service-worker.js`

**Yer:** Faylın əvvəlində

```javascript
// ✅ BURADAN VERSİYANI ARTIRIN
const CACHE_VERSION = 'v1.0.0';  // Bu rəqəmi artırın
```

**Nə zaman artırmalısınız:**
- HTML dəyişdikdə → `v1.0.0` → `v1.0.1`
- CSS dəyişdikdə → `v1.0.1` → `v1.0.2`
- JS dəyişdikdə → `v1.0.2` → `v1.0.3`
- Böyük yeniliklər → `v1.0.3` → `v2.0.0`

**Yeniləmə avtomatik işləyir:**
1. Versiya artırın
2. Git commit edin
3. GitHub-a push edin
4. Render.com avtomatik deploy edəcək
5. İstifadəçilər səhifəni yeniləyəndə yeni versiya yüklənəcək

---

## 🎨 Rəngləri Dəyişmək

**Fayl:** `styles.css`

**Yer:** `:root` bölməsində

```css
:root {
    /* ✅ BURADAN RƏNGLƏRİ DƏYİŞDİRİN */
    --primary-color: #4F46E5;      /* Əsas rəng (düymələr, başlıqlar) */
    --primary-hover: #4338CA;      /* Hover rəng */
    --success-color: #10B981;      /* Uğurlu rəng (hesabla düyməsi) */
    --warning-color: #F59E0B;      /* Xəbərdarlıq rəngi */
    --danger-color: #EF4444;       /* Xəta rəngi */
    --text-primary: #1F2937;       /* Əsas mətn rəngi */
    --text-secondary: #6B7280;     /* İkinci dərəcəli mətn */
    --bg-primary: #F9FAFB;         /* Arxa fon */
    --bg-secondary: #FFFFFF;       /* Kart arxa fonu */
    --border-color: #E5E7EB;       /* Sərhəd rəngi */
}
```

---

## 📊 Hesablama Düsturlarını Dəyişmək

**Fayl:** `app.js`

### Buraxılış düsturları:
```javascript
// ✅ BURAXILIŞ DÜSTURLARI (app.js, calculateBuraxilis funksiyası)

// Azərbaycan dili: 2.5 * (2*açıq + qapalı)
let azScore = 2.5 * (2 * azAciq + azQapali);

// Riyaziyyat: 3.125 * (2*ətraflı + açıq + qapalı)
let riyScore = 3.125 * (2 * riyEtrafli + riyAciq + riyQapali);

// Xarici dil: 2.7 * (2*açıq + qapalı)
let xariciScore = 2.7 * (2 * xariciAciq + xariciQapali);
```

### Blok düsturları:
```javascript
// ✅ BLOK DÜSTURLARI (app.js, calculateBlok funksiyası)

// Qapalı: (düzgün - 0.25*səhv) * 3.03
let qapaliScore = (duzgun - 0.25 * sehv) * 3.03;
if (qapaliScore < 0) qapaliScore = 0;

// Açıq və ətraflı: (açıq + 2*ətraflı) * 3.03
const aciqEtrafliScore = (aciq + 2 * etrafli) * 3.03;
```

---

## 🎯 Qiymətləndirmə Sərhədlərini Dəyişmək

**Fayl:** `app.js`

**Buraxılış üçün:** (calculateBuraxilis funksiyasında)
```javascript
// ✅ BURAXILIŞ QİYMƏTLƏNDİRMƏ
if (totalScore === 0) {
    grade = '0 BAL';
} else if (totalScore >= 300) {
    grade = 'MÜVƏFFƏQİYYƏTLƏ KEÇDİNİZ';
} else if (totalScore >= 250) {
    grade = 'ÇOX YAXŞI';
} else if (totalScore >= 160) {
    grade = 'YAXŞI';
} else if (totalScore >= 140) {
    grade = 'KAFİ';
} else if (totalScore >= 120) {
    grade = 'ZƏİF';
} else {
    grade = 'YAXŞI OLACAQ';
}
```

**Blok üçün:** (calculateBlok funksiyasında)
```javascript
// ✅ BLOK QİYMƏTLƏNDİRMƏ
if (totalScore === 0) {
    grade = '0 BAL';
} else if (totalScore >= 400) {
    grade = 'MÜVƏFFƏQİYYƏTLƏ KEÇDİNİZ';
} else if (totalScore >= 250) {
    grade = 'ÇOX YAXŞI';
} else if (totalScore >= 160) {
    grade = 'YAXŞI';
} else if (totalScore >= 140) {
    grade = 'KAFİ';
} else if (totalScore >= 120) {
    grade = 'ZƏİF';
} else {
    grade = 'YAXŞI OLACAQ';
}
```

---

## 📱 Banner Mətnini Dəyişmək

**Fayl:** `index.html`

**Yer:** `<div class="top-banner">` bölməsində

```html
<div class="top-banner">
    <!-- ✅ BURADAN BANNERİ DƏYİŞDİRİN -->
    <span class="banner-text">ən ucuz sərbəst iş hazırlanması</span>
    <a href="https://wa.me/994559406018" class="whatsapp-icon">
        <!-- WhatsApp ikonu -->
    </a>
</div>
```

**WhatsApp nömrəsini dəyişmək:**
```html
<a href="https://wa.me/994559406018">  <!-- ← Buranı dəyişdirin -->
```

---

## 🚀 Deploy İş Axını

1. **Kodu dəyişdirin** (HTML/CSS/JS)
2. **Cache versiyasını artırın** (service-worker.js)
3. **Git commit edin:**
   ```bash
   git add .
   git commit -m "Dəyişiklik təsviri"
   ```
4. **GitHub-a push edin:**
   ```bash
   git push origin main
   ```
5. **Render.com avtomatik deploy edəcək** (1-2 dəqiqə)
6. **İstifadəçilər səhifəni yeniləyəndə yeni versiya yüklənəcək**

---

## 🐛 Debug və Test

### Local test:
```bash
cd /home/user/webapp
python3 -m http.server 3000
```

### Service Worker test:
1. Chrome DevTools açın (F12)
2. Application tab → Service Workers
3. "Update on reload" aktivləşdirin
4. Səhifəni yeniləyin

### PWA test:
1. Chrome DevTools → Application → Manifest
2. Install düyməsinin göründüyünü yoxlayın
3. Offline mode test edin (Network → Offline)

---

## 📞 Dəstək

Problem yaranarsa:
1. Chrome DevTools Console-da xətaları yoxlayın
2. Service Worker statusunu yoxlayın
3. Cache-ni təmizləyin (Hard Reload: Ctrl+Shift+R)

---

**Uğurlar! 🎉**
