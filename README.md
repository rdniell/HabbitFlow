# 🔥 HabbitFlow — Habit Tracker dengan Streak

Aplikasi React Native (Expo) untuk melacak kebiasaan harian dengan sistem streak, dilengkapi pencarian habit dan statistik yang tersimpan secara lokal.

## ✅ Daftar Fitur

### Level 1 — Core
- **CREATE** — tambah habit baru via TextInput (validasi: input kosong ditolak)
- **READ** — data habit dimuat otomatis saat app dibuka
- **DELETE** — hapus habit dengan konfirmasi Alert
- **AsyncStorage** — semua data disimpan dengan `JSON.stringify` setiap kali berubah
- **FlatList** — daftar habit dengan `keyExtractor` unik
- **Empty state** — pesan ramah saat belum ada habit
- **Persistensi terbukti** — data tetap ada setelah app ditutup total

### Level 2 — Pengembangan
- ✏️ **Update/Edit** — toggle status "selesai hari ini" yang otomatis menambah/mengurangi streak
- 🔎 **Search/Filter** — cari habit berdasarkan nama secara real-time
- 📊 **Statistik Tersimpan** — total habit dibuat & total check-in disimpan di key AsyncStorage terpisah
- 🗑️ **Konfirmasi Hapus** — Alert konfirmasi sebelum habit benar-benar dihapus

## 📸 Screenshot

**Daftar Habit**

*(tambahkan screenshot di sini)*

**Fitur Search & Statistik**

*(tambahkan screenshot di sini)*

**Bukti Persistensi (sebelum & sesudah tutup-buka app)**

*(tambahkan screenshot sebelum tutup app)*

*(tambahkan screenshot setelah buka app lagi — data masih sama)*

## 🛠️ Tech Stack

- React Native + Expo
- `@react-native-async-storage/async-storage` — persistensi data lokal
.

## 🔗 Expo Snack

[Coba langsung di Expo Snack](https://snack.expo.dev/) — *(tempel link Snack di sini)*

## 👤 Dibuat oleh

Revael Daniel
