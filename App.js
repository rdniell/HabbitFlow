import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import HabitItem from "./components/HabitItem";

const HABITS_KEY = "@habbitflow_habits";
const STATS_KEY = "@habbitflow_stats";

// Helper: format tanggal ke YYYY-MM-DD untuk perbandingan harian
function todayString() {
  return new Date().toISOString().split("T")[0];
}

export default function App() {
  return (
    <SafeAreaProvider>
      <HabbitFlowScreen />
    </SafeAreaProvider>
  );
}

function HabbitFlowScreen() {
  const [habits, setHabits] = useState([]);
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({ totalCreated: 0, totalCheckIns: 0 });

  useEffect(() => {
    loadHabits();
    loadStats();
  }, []);

  // ===== READ =====
  const loadHabits = async () => {
    try {
      const saved = await AsyncStorage.getItem(HABITS_KEY);
      if (saved) {
        let parsed = JSON.parse(saved);
        // Reset doneToday kalau lastCheckedDate bukan hari ini
        const today = todayString();
        parsed = parsed.map((h) =>
          h.lastCheckedDate !== today ? { ...h, doneToday: false } : h,
        );
        setHabits(parsed);
        await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(parsed));
      }
    } catch (error) {
      console.log("Gagal load habits:", error);
    }
  };

  const loadStats = async () => {
    try {
      const saved = await AsyncStorage.getItem(STATS_KEY);
      if (saved) {
        setStats(JSON.parse(saved));
      }
    } catch (error) {
      console.log("Gagal load stats:", error);
    }
  };

  const saveHabits = async (newHabits) => {
    try {
      await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(newHabits));
    } catch (error) {
      console.log("Gagal simpan habits:", error);
    }
  };

  const saveStats = async (newStats) => {
    try {
      await AsyncStorage.setItem(STATS_KEY, JSON.stringify(newStats));
    } catch (error) {
      console.log("Gagal simpan stats:", error);
    }
  };

  // ===== CREATE =====
  const handleAddHabit = async () => {
    const trimmed = inputText.trim();
    if (trimmed === "") {
      Alert.alert("Input Kosong", "Nama habit tidak boleh kosong.");
      return;
    }

    const newHabit = {
      id: Date.now().toString(),
      name: trimmed,
      streak: 0,
      doneToday: false,
      lastCheckedDate: null,
    };

    const newHabits = [...habits, newHabit];
    setHabits(newHabits);
    await saveHabits(newHabits);
    setInputText("");

    const newStats = { ...stats, totalCreated: stats.totalCreated + 1 };
    setStats(newStats);
    await saveStats(newStats);
  };

  // ===== UPDATE (toggle selesai hari ini + streak) =====
  const handleToggleToday = async (id) => {
    const today = todayString();
    let checkInDelta = 0;

    const newHabits = habits.map((h) => {
      if (h.id !== id) return h;

      if (h.doneToday) {
        // Uncheck: kurangi streak
        checkInDelta = -1;
        return {
          ...h,
          doneToday: false,
          streak: Math.max(0, h.streak - 1),
          lastCheckedDate: null,
        };
      } else {
        // Check: tambah streak
        checkInDelta = 1;
        return {
          ...h,
          doneToday: true,
          streak: h.streak + 1,
          lastCheckedDate: today,
        };
      }
    });

    setHabits(newHabits);
    await saveHabits(newHabits);

    const newStats = {
      ...stats,
      totalCheckIns: Math.max(0, stats.totalCheckIns + checkInDelta),
    };
    setStats(newStats);
    await saveStats(newStats);
  };

  // ===== DELETE =====
  const handleDelete = async (id) => {
    const newHabits = habits.filter((h) => h.id !== id);
    setHabits(newHabits);
    await saveHabits(newHabits);
  };

  // ===== SEARCH / FILTER =====
  const filteredHabits = habits.filter((h) =>
    h.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Text style={styles.title}>🔥 HabbitFlow</Text>

        {/* Statistik Tersimpan */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{stats.totalCreated}</Text>
            <Text style={styles.statLabel}>Total Habit</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{stats.totalCheckIns}</Text>
            <Text style={styles.statLabel}>Total Check-in</Text>
          </View>
        </View>

        {/* Input tambah habit */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Tambah habit baru..."
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleAddHabit}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddHabit}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <TextInput
          style={styles.searchInput}
          placeholder="🔎 Cari habit..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* List */}
        <FlatList
          data={filteredHabits}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <HabitItem
              habit={item}
              onToggleToday={handleToggleToday}
              onDelete={handleDelete}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>
                {searchQuery
                  ? "Tidak ada habit yang cocok."
                  : "Belum ada habit. Tambahkan satu di atas! 💪"}
              </Text>
            </View>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff8f3",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  flex: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ff6b35",
    marginTop: 12,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#ffe8dc",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff6b35",
  },
  statLabel: {
    fontSize: 12,
    color: "#a85a37",
    marginTop: 2,
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#eee",
  },
  addButton: {
    backgroundColor: "#ff6b35",
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  list: {
    paddingBottom: 20,
  },
  emptyBox: {
    marginTop: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
});
