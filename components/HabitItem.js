import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HabitItem({ habit, onToggleToday, onDelete }) {
  const handleDelete = () => {
    Alert.alert("Hapus Habit", `Yakin ingin menghapus "${habit.name}"?`, [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: () => onDelete(habit.id),
      },
    ]);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={[
          styles.checkCircle,
          habit.doneToday && styles.checkCircleActive,
        ]}
        onPress={() => onToggleToday(habit.id)}
      >
        {habit.doneToday && <Text style={styles.checkMark}>✓</Text>}
      </TouchableOpacity>

      <View style={styles.info}>
        <Text style={[styles.name, habit.doneToday && styles.nameDone]}>
          {habit.name}
        </Text>
        <Text style={styles.streak}>🔥 Streak: {habit.streak} hari</Text>
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  checkCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#ff6b35",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  checkCircleActive: {
    backgroundColor: "#ff6b35",
  },
  checkMark: {
    color: "#fff",
    fontWeight: "bold",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  nameDone: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  streak: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
  deleteButton: {
    padding: 8,
  },
  deleteText: {
    fontSize: 18,
  },
});
