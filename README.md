# ArBonKas - Aplikasi Kas (Expense & Income Tracker)

Aplikasi web untuk mencatat pemasukan dan pengeluaran dengan fitur export ke berbagai format (PDF, Excel, Word, PowerPoint).

## 🌟 Fitur

- ✅ Pencatatan pemasukan dan pengeluaran
- 📊 Dashboard dengan ringkasan keuangan (Total Pemasukan, Total Pengeluaran, Saldo)
- 📝 Kategorisasi transaksi
- 🗓️ Pencatatan tanggal transaksi
- 💾 Penyimpanan data lokal (LocalStorage)
- 📄 Export laporan ke PDF
- 📊 Export laporan ke Excel (.xlsx)
- 📝 Export laporan ke Word (.doc)
- 📽️ Export laporan ke PowerPoint (.pptx)
- 🗑️ Hapus transaksi individual
- 🔄 Hapus semua data
- 📱 Responsive design (mobile-friendly)

## 🚀 Cara Menggunakan

1. Buka file `index.html` di browser web Anda
2. Tambahkan transaksi dengan mengisi form:
   - Pilih tipe (Pemasukan/Pengeluaran)
   - Masukkan tanggal
   - Isi keterangan
   - Masukkan jumlah
   - Tentukan kategori
3. Klik "Tambah Transaksi"
4. Lihat ringkasan keuangan di dashboard
5. Export laporan dengan format yang diinginkan

## 📦 Teknologi yang Digunakan

- HTML5
- CSS3
- JavaScript (Vanilla)
- LocalStorage API untuk penyimpanan data
- Browser Print API untuk export PDF
- Blob API untuk export file

## 🎨 Fitur Export

### Export ke PDF
Membuka jendela baru dengan laporan yang dapat dicetak atau disimpan sebagai PDF menggunakan fungsi Print browser:
- Header laporan
- Ringkasan keuangan
- Tabel detail transaksi
- Klik "Print / Save as PDF" untuk menyimpan

### Export ke Excel
Menghasilkan file CSV yang dapat dibuka di Excel:
- Format CSV dengan encoding UTF-8
- Ringkasan di bagian atas
- Detail transaksi lengkap
- Kompatibel dengan Microsoft Excel, Google Sheets, dll

### Export ke Word
Menghasilkan dokumen HTML yang dapat dibuka di Word:
- Format dokumen profesional
- Tabel ringkasan
- Tabel detail transaksi
- Dapat dibuka di Microsoft Word atau aplikasi pengolah kata lainnya

### Export ke PowerPoint
Membuka presentasi HTML yang dapat dicetak atau disimpan:
- Slide judul
- Slide ringkasan keuangan
- Slide detail transaksi (max 8 transaksi terakhir)
- Desain presentasi profesional

## 💾 Penyimpanan Data

Data disimpan secara lokal menggunakan LocalStorage browser. Data akan tetap tersimpan meskipun browser ditutup, selama LocalStorage tidak dihapus.

## 📱 Browser Support

Aplikasi ini mendukung browser modern:
- Chrome
- Firefox
- Safari
- Edge

## 📝 Lisensi

MIT License - lihat file LICENSE untuk detail

## 👨‍💻 Developer

Hendra829

## 🤝 Kontribusi

Kontribusi, issues, dan feature requests sangat diterima!

## 📞 Dukungan

Jika Anda menemukan bug atau memiliki saran, silakan buat issue di repository ini.