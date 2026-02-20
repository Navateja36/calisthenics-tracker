import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import Checkbox from 'expo-checkbox';
import { workoutPlan } from '../data/workoutPlan';

export default function WorkoutScreen({ navigation }) {
  // Pulling Month 1 data directly from our JSON file
  const exercises = workoutPlan.month1.routine.exercises;
  const warmup = workoutPlan.month1.routine.warmup;

  // State to keep track of which boxes are checked
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheckbox = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // How a single exercise row should look
  const renderExercise = ({ item }) => (
    <View style={styles.exerciseRow}>
      <Checkbox
        style={styles.checkbox}
        value={checkedItems[item.id] || false}
        onValueChange={() => toggleCheckbox(item.id)}
        color={checkedItems[item.id] ? '#4630EB' : undefined}
      />
      <View style={styles.exerciseInfo}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <Text style={styles.exerciseDetails}>{item.sets} sets x {item.reps}</Text>
      </View>
      {/* We will add the video link button here later */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Month 1 Routine</Text>
      <Text style={styles.warmup}>Warmup: {warmup.duration} - {warmup.notes}</Text>

      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={renderExercise}
        style={styles.list}
      />

      <View style={styles.buttonContainer}>
        <Button 
          title="COMPLETE WORKOUT" 
          color="green"
          onPress={() => navigation.navigate('Dashboard')} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  warmup: { fontSize: 14, color: '#666', marginBottom: 20, fontStyle: 'italic' },
  list: { flex: 1 },
  exerciseRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  checkbox: { marginRight: 15, width: 24, height: 24 },
  exerciseInfo: { flex: 1 },
  exerciseName: { fontSize: 18, fontWeight: '500' },
  exerciseDetails: { fontSize: 14, color: '#555', marginTop: 4 },
  buttonContainer: { marginTop: 20, paddingBottom: 20 },
});