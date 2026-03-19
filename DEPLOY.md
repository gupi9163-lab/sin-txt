# Render.com-a Deploy Təlimatı

## Avtomatik Deploy (Tövsiyə olunur)

1. **Render.com-a daxil olun**
   - https://render.com saytına daxil olun
   - GitHub hesabınızla giriş edin

2. **Yeni Static Site yaradın**
   - Dashboard-da "New +" düyməsinə basın
   - "Static Site" seçin

3. **Repository seçin**
   - `gupi9163-lab/sin-txt` repository-sini seçin
   - "Connect" düyməsinə basın

4. **Konfiqurasiya**
   - **Name**: `bal-hesablayici` (və ya istədiyiniz ad)
   - **Branch**: `main`
   - **Build Command**: boş saxlayın
   - **Publish Directory**: `.` (nöqtə)
   - "Create Static Site" düyməsinə basın

5. **Deploy gözləyin**
   - Deploy prosesi başlayacaq (1-2 dəqiqə)
   - Deploy tamamlandıqdan sonra URL alacaqsınız
   - Məsələn: `https://bal-hesablayici.onrender.com`

## Manual Deploy

Əgər avtomatik deploy işləməzsə:

```bash
# 1. Render CLI quraşdırın
npm install -g render-cli

# 2. Render-ə login olun
render login

# 3. Deploy edin
render deploy
```

## Deploy Sonrası

✅ **PWA test edin:**
- Saytı açın
- Service Worker qeydiyyatını yoxlayın (DevTools → Application)
- "Tətbiqi endir" düyməsi görünməlidir
- Offline işləməsini yoxlayın (Network → Offline)

✅ **Mobil test edin:**
- iPhone Safari: Paylaş → Ana ekrana əlavə et
- Android Chrome: Menu → Ana ekrana əlavə et

## Qeydlər

- ⚡ Render.com static site pulsuz tier təklif edir
- 🔄 GitHub-a push etdikdə avtomatik yenilənir
- 🌐 HTTPS avtomatik verilir
- 📱 PWA tam işləkdir

## Dəstək

Problem yaranarsa:
- Render Dashboard-da logları yoxlayın
- Build Command boş olduğuna əmin olun
- Publish Directory `.` (nöqtə) olduğuna əmin olun

---

**Uğurlar! 🎉**

Render URL: https://bal-hesablayici.onrender.com
GitHub: https://github.com/gupi9163-lab/sin-txt
Test URL: https://3000-io8u1j34u2o8bj7hzstac-a402f90a.sandbox.novita.ai
