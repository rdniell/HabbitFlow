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

<img width="720" height="1600" alt="Daftar Habbit" src="https://github.com/user-attachments/assets/e20dd226-0d63-4ddc-a803-14156ea3aaf9" />


**Fitur Search & Statistik**

<img width="1080" height="2400" alt="Fitur Search   Statistic" src="https://github.com/user-attachments/assets/183696e0-80c3-409d-8427-6e07812310aa" />


**Bukti Persistensi (sebelum & sesudah tutup-buka app)**

<img width="720" height="1600" alt="Presistensi" src="https://github.com/user-attachments/assets/e2c0a3c9-d0cb-4513-915b-9ac3c5b545da" />


## 🛠️ Tech Stack

- React Native + Expo
- `@react-native-async-storage/async-storage` — persistensi data lokal
.

## 🔗 Expo Snack

[Coba langsung di Expo Snack](https://snack.expo.dev/@niell77/habbitflow) 

## 👤 Dibuat oleh

Revael Daniel
