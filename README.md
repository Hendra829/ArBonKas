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
- jsPDF - untuk export PDF
- SheetJS (xlsx) - untuk export Excel
- FileSaver.js - untuk download file
- PptxGenJS - untuk export PowerPoint

## 🎨 Fitur Export

### Export ke PDF
Menghasilkan laporan PDF dengan:
- Header laporan
- Ringkasan keuangan
- Tabel detail transaksi

### Export ke Excel
Menghasilkan spreadsheet Excel dengan:
- Sheet "Laporan Kas"
- Ringkasan di bagian atas
- Detail transaksi lengkap

### Export ke Word
Menghasilkan dokumen Word dengan:
- Format dokumen profesional
- Tabel ringkasan
- Tabel detail transaksi

### Export ke PowerPoint
Menghasilkan presentasi PowerPoint dengan:
- Slide judul
- Slide ringkasan keuangan
- Slide detail transaksi (max 10 transaksi terakhir)

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