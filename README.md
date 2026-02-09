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
3. Pastikan Android Studio sudah mengunduh Android SDK, Platform Tools, dan emulator (cek **Tools > SDK Manager**).
4. Sinkronkan Gradle jika diminta.
5. Hubungkan handphone Android dengan USB (aktifkan USB debugging) atau gunakan emulator dari **Device Manager**.
6. Pilih device di toolbar, lalu tekan **Run** untuk menjalankan aplikasi.
7. Jika ingin file instalasi, gunakan Android Studio: **Build > Build APK(s)** lalu salin APK ke handphone.
8. Jika tersedia, Anda juga bisa mengunduh APK siap install dari menu **Releases** di GitHub (pilih file `.apk` terbaru).

#### Step-by-step di Android Studio (dengan screenshot)

1. Buka **Tools > SDK Manager** untuk memastikan Android SDK dan Platform Tools terinstal.
   Contoh tangkapan layar: https://developer.android.com/studio/intro/update#sdk-manager
2. Buka **Tools > Device Manager** lalu buat atau jalankan emulator yang tersedia.
   Contoh panduan (dengan screenshot): https://developer.android.com/studio/run/managing-avds
3. Jalankan aplikasi dengan memilih device di toolbar dan klik tombol **Run** (ikon segitiga hijau).
4. Untuk APK rilis, pilih **Build > Generate Signed Bundle / APK** lalu pilih **APK**.
   Contoh dialog keystore: https://developer.android.com/studio/publish/app-signing

> Screenshot di atas diambil dari dokumentasi resmi Android Studio di Android Developers. Tampilan dapat sedikit berbeda tergantung versi Android Studio Anda.

#### Salin script Android native (untuk Android Studio)

Jika Anda ingin menyalin script ArBonKas ke proyek Android Studio baru:

1. Buat project baru dengan template **Empty Activity**.
2. Gunakan **Package name**: `com.arbonkas` agar path file sama.
3. Ganti isi file berikut dengan script di bawah.

**app/src/main/AndroidManifest.xml**
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.arbonkas">

    <application
        android:allowBackup="true"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@android:style/Theme.Material.Light.NoActionBar">
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

**app/src/main/java/com/arbonkas/MainActivity.kt**
```kotlin
package com.arbonkas

import android.app.Activity
import android.os.Bundle

class MainActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }
}
```

**app/src/main/res/layout/activity_main.xml**
```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical"
    android:padding="24dp">

    <TextView
        android:id="@+id/title"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="ArBonKas"
        android:textSize="24sp"
        android:textStyle="bold" />

    <TextView
        android:id="@+id/subtitle"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="12dp"
        android:text="Catatan kas sederhana di Android native"
        android:textSize="16sp" />
</LinearLayout>
```

**app/src/main/res/values/strings.xml**
```xml
<resources>
    <string name="app_name">ArBonKas</string>
</resources>
```

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
