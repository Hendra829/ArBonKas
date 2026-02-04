# ArBonKas

ArBonKas adalah contoh aplikasi catatan kas sederhana untuk beberapa platform: Android native, Flutter, React Native, dan aplikasi web dengan PWA.

## Struktur folder

- `android-native/` - Contoh aplikasi Android native (Kotlin).
- `flutter/` - Contoh aplikasi Flutter.
- `react-native/` - Contoh aplikasi React Native.
- `web-pwa/` - Contoh aplikasi web + PWA.

## Menjalankan di handphone

> Catatan: contoh kode ini adalah scaffold awal. Pastikan Anda sudah memasang Android Studio/Xcode, Flutter SDK, atau Node.js sesuai kebutuhan.

### Android native (Kotlin)

1. Unduh seluruh folder `android-native/` (atau clone repo ini).
2. Buka folder `android-native` di Android Studio.
3. Sinkronkan Gradle jika diminta.
4. Hubungkan handphone Android dengan USB (aktifkan USB debugging) atau gunakan emulator.
5. Tekan **Run** untuk menjalankan aplikasi.
6. Jika ingin file instalasi, gunakan Android Studio: **Build > Build APK(s)** lalu salin APK ke handphone.

### Flutter

1. Install Flutter SDK lalu jalankan `flutter doctor`.
2. Masuk ke folder `flutter`.
3. Jalankan:
   ```bash
   flutter pub get
   flutter run
   ```
4. Pilih device yang terdeteksi (handphone/emulator).

### React Native

1. Pastikan Node.js, Android Studio, dan React Native CLI sudah terpasang.
2. Masuk ke folder `react-native`.
3. Install dependensi:
   ```bash
   npm install
   ```
4. Jalankan Metro bundler:
   ```bash
   npm start
   ```
5. Di terminal baru jalankan:
   ```bash
   npm run android
   ```

### Web + PWA

1. Masuk ke folder `web-pwa`.
2. Jalankan server statis (contoh dengan Python):
   ```bash
   python -m http.server 8080
   ```
3. Buka `http://localhost:8080` di browser mobile (pastikan HP berada di jaringan yang sama) atau gunakan fitur “Add to Home Screen”.

## Catatan tambahan

- Untuk iOS, React Native memerlukan Xcode dan `npm run ios`.
- Android native dapat ditambahkan konfigurasi Gradle lengkap sesuai kebutuhan proyek nyata.
