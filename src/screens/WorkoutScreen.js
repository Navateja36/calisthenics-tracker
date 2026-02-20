import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert, Modal, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; // Built-in icons!
import YoutubePlayer from 'react-native-youtube-iframe';
import { workoutPlan } from '../data/workoutPlan';

export default function WorkoutScreen({ navigation }) {
  const exercises = workoutPlan.month1.routine.exercises;
  const warmup = workoutPlan.month1.routine.warmup;

  const [checkedItems, setCheckedItems] = useState({});
  // NEW: States for our video pop-up
  const [modalVisible, setModalVisible] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(null);

  const toggleCheckbox = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // NEW: Function to save the workout completion date
  const finishWorkout = async () => {
    try {
      // Get today's date in YYYY-MM-DD format
      const today = new Date().toISOString().split('T')[0];
      
      // Fetch any previously saved dates
      const existingData = await AsyncStorage.getItem('completedDates');
      let datesArray = existingData ? JSON.parse(existingData) : [];

      // If today isn't already saved, add it to the array
      if (!datesArray.includes(today)) {
        datesArray.push(today);
        await AsyncStorage.setItem('completedDates', JSON.stringify(datesArray));
      }

      // Show a quick success alert, then navigate back
      Alert.alert("Awesome!", "Workout saved successfully.", [
        { text: "OK", onPress: () => navigation.navigate('Dashboard') }
      ]);

    } catch (error) {
      console.error("Error saving workout:", error);
      Alert.alert("Error", "Could not save workout data.");
    }
  };

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
      {/* NEW: Play Button for the video */}
      {item.videoId && (
        <TouchableOpacity onPress={() => openVideo(item.videoId)} style={styles.playButton}>
          <Ionicons name="play-circle" size={32} color="#ff0000" />
        </TouchableOpacity>
      )}
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
        {/* NEW: Updated the onPress to trigger our save function */}
        <Button 
          title="COMPLETE WORKOUT" 
          color="green"
          onPress={finishWorkout} 
        />
      </View>

      {/* NEW: The Video Pop-up Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {currentVideoId && (
              <YoutubePlayer
                height={220}
                play={true}
                videoId={currentVideoId}
              />
            )}
            <Button title="Close Video" color="#333" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
  /* Modal Styles */
  modalOverlay: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.8)' },
  modalContent: { backgroundColor: '#fff', margin: 20, borderRadius: 10, overflow: 'hidden', paddingBottom: 10 }
});