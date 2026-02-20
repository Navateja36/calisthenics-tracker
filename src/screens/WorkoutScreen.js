import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert, Modal, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; 
import YoutubePlayer from 'react-native-youtube-iframe';
import { workoutPlan } from '../data/workoutPlan';

export default function WorkoutScreen({ navigation }) {
  const exercises = workoutPlan.month1.routine.exercises;
  const warmup = workoutPlan.month1.routine.warmup;

  const [checkedItems, setCheckedItems] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(null);

  const toggleCheckbox = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const openVideo = (videoId) => {
    setCurrentVideoId(videoId);
    setModalVisible(true);
  };

  const finishWorkout = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const existingData = await AsyncStorage.getItem('completedDates');
      let datesArray = existingData ? JSON.parse(existingData) : [];

      if (!datesArray.includes(today)) {
        datesArray.push(today);
        await AsyncStorage.setItem('completedDates', JSON.stringify(datesArray));
      }

      Alert.alert("Awesome!", "Workout saved successfully.", [
        { text: "OK", onPress: () => navigation.navigate('Dashboard') }
      ]);
    } catch (error) {
      console.error("Error saving workout:", error);
      Alert.alert("Error", "Could not save workout data.");
    }
  };

  const renderExercise = ({ item }) => (
    // FIX 1: We changed this main View into a TouchableOpacity
    // Now tapping anywhere on the row triggers toggleCheckbox
    <TouchableOpacity 
      style={styles.exerciseRow} 
      onPress={() => toggleCheckbox(item.id)}
      activeOpacity={0.7}
    >
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
      
      {item.videoId && (
        <TouchableOpacity onPress={() => openVideo(item.videoId)} style={styles.playButton}>
          <Ionicons name="play-circle" size={36} color="#ff0000" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
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
        <Button title="COMPLETE WORKOUT" color="green" onPress={finishWorkout} />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {/* FIX 2: Redesigned the modal to be a sleek Bottom Sheet */}
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Tutorial</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close-circle" size={30} color="#d3d3d3" />
              </TouchableOpacity>
            </View>

            {currentVideoId && (
              <View style={styles.videoContainer}>
                <YoutubePlayer
                  height={220}
                  play={true}
                  videoId={currentVideoId}
                />
              </View>
            )}

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
  exerciseRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  checkbox: { marginRight: 15, width: 24, height: 24 },
  exerciseInfo: { flex: 1 },
  exerciseName: { fontSize: 18, fontWeight: '500' },
  exerciseDetails: { fontSize: 14, color: '#555', marginTop: 4 },
  playButton: { padding: 5 },
  buttonContainer: { marginTop: 20, paddingBottom: 20 },
  
  /* NEW: Bottom Sheet Modal Styles */
  modalOverlay: { 
    flex: 1, 
    justifyContent: 'flex-end', /* Pushes the box to the very bottom */
    backgroundColor: 'rgba(0,0,0,0.6)' /* Darkens the background behind it */
  },
  bottomSheet: { 
    backgroundColor: '#fff', 
    borderTopLeftRadius: 25, 
    borderTopRightRadius: 25, 
    padding: 20, 
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333'
  },
  videoContainer: {
    borderRadius: 10,
    overflow: 'hidden'
  }
});