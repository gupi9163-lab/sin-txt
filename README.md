# Bal Hesablayıcı

Progressive Web App (PWA) - Buraxılış və Blok bal hesablama, yaş hesablayıcı

## 🎯 Xüsusiyyətlər

### 1. Buraxılış Bal Hesablama
- 9-cu və 11-ci sinif buraxılış imtahanı ballarının hesablanması
- Azərbaycan dili, Riyaziyyat və Xarici dil fənləri
- Dəqiq düsturlarla hesablama
- Detallı statistika və qiymətləndirmə

### 2. Blok Bal Hesablama
- 1-ci, 2-ci, 3-cü və 4-cü qruplar
- Alt qruplar (Rİ, RK, DT, TC)
- Fən üzrə 150 və 100 ballıq sistemlər
- Səhv qapalı sualların düzgün hesablanması

### 3. Yaş Hesablayıcı
- Dəqiq yaş hesablaması
- Yaşanılan günlərin sayı
- Növbəti ad gününə qalan günlər

### 4. Məlumat Bölməsi
- Akademik məlumatlar
- Developer üçün asan strukturda yeni məlumat əlavə etmək mümkündür

### 5. Sürətli Linklər
- BDU rəsmi web sayt
- BDU SemsLogin tələbə sistemi
- Developer üçün asan strukturda yeni linklər əlavə etmək mümkündür

## 🚀 Texnologi

- **PWA (Progressive Web App)** - Offline işləmə və quraşdırma dəstəyi
- **Service Worker** - Versiyalı cache sistemi
- **Responsive Design** - Mobil və desktop uyğun
- **Vanilla JavaScript** - Heç bir framework istifadə edilməyib
- **Modern CSS** - CSS Grid və Flexbox

## 📱 Quraşdırma

### Desktop (Chrome, Edge, Opera):
1. Sayta daxil olun
2. Ünvan çubuğunda "Quraşdır" ikonuna basın
3. və ya səhifənin aşağı hissəsində "Tətbiqi endir" düyməsinə basın

### iOS (Safari):
1. Sayta daxil olun
2. "Paylaş" düyməsinə basın (⬆️)
3. "Ana ekrana əlavə et" seçin

### Android (Chrome):
1. Sayta daxil olun
2. Menu açın (⋮)
3. "Ana ekrana əlavə et" seçin

## 🛠️ Developer üçün məlumat

### Cache versiya sistemi
Service Worker faylında `CACHE_VERSION` dəyişənini artırın:
```javascript
const CACHE_VERSION = 'v1.0.1'; // Versiyonu artırın
```

Yeni versiya yayımlandıqda köhnə cache avtomatik silinir və yeni cache yaranır.

### Yeni məlumat əlavə etmək
`index.html` faylında `melumat` bölməsində:
```html
<div class="info-item">
    <h3>📌 Yeni Məlumat Başlığı</h3>
    <p>Buraya yeni məlumat mətni yazın.</p>
</div>
```

### Yeni link əlavə etmək
`index.html` faylında `linkler` bölməsində:
```html
<a href="https://example.com" class="link-button" target="_blank" rel="noopener noreferrer">
    <span class="link-icon">🔗</span>
    <span class="link-text">Link Adı</span>
</a>
```

## 📁 Fayl strukturu

```
webapp/
├── index.html           # Ana HTML səhifəsi
├── styles.css           # CSS stillər
├── app.js               # JavaScript funksiyalar
├── service-worker.js    # PWA Service Worker
├── manifest.json        # PWA Manifest
├── icon-192.png         # PWA ikonu (192x192)
├── icon-512.png         # PWA ikonu (512x512)
├── .gitignore          # Git ignore faylı
└── README.md           # Bu fayl
```

## 🌐 Render.com Deploy

### Avtomatik Deploy:
1. GitHub repository-ni Render.com ilə bağlayın
2. Static Site seçin
3. Build Command: boş
4. Publish Directory: `.`

### Manual Deploy:
```bash
# Git repository-ni push edin
git add .
git commit -m "Initial commit"
git push origin main
```

## 📝 Lisenziya

Bu layihə təhsil məqsədilə hazırlanmışdır.

## 📞 Əlaqə

WhatsApp: +994559406018

---

**Developer notes:**
- Bütün hesablamalar düzgün düsturlara əsasən həyata keçirilir
- PWA tam offline işləyir
- iOS və Android-də quraşdırıla bilir
- Versiyalı cache sistemi avtomatik yenilənir
- Responsive dizayn bütün ekranlarda işləyir
