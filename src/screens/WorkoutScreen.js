import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, Modal, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; 
import YoutubePlayer from 'react-native-youtube-iframe';
import { workoutPlan } from '../data/workoutPlan';

export default function WorkoutScreen({ route, navigation }) {
  const { monthId = 'month1', routineType } = route.params || {};
  
  const plan = workoutPlan[monthId];
  const isSplit = plan.type === 'split';
  
  const exercises = isSplit ? plan.routines[routineType].exercises : plan.routine.exercises;
  const warmup = isSplit ? plan.routines[routineType].warmup : plan.routine.warmup;
  
  // Format the title nicely depending on if it's a split routine or not
  const screenTitle = isSplit ? plan.routines[routineType].name.toUpperCase() : "FULL BODY WORKOUT";

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
    const completedCount = Object.values(checkedItems).filter(value => value === true).length;
    
    if (completedCount < exercises.length) {
      Alert.alert(
        "Hold up!", 
        `You've only finished ${completedCount} out of ${exercises.length} exercises. Finish your sets bro!`
      );
      return; 
    }

    try {
      const today = new Date().toISOString().split('T')[0];
      const storageKey = `completedDates_${monthId}`;
      const existingData = await AsyncStorage.getItem(storageKey);
      let datesArray = existingData ? JSON.parse(existingData) : [];

      if (!datesArray.includes(today)) {
        datesArray.push(today);
        await AsyncStorage.setItem(storageKey, JSON.stringify(datesArray));
      }

      Alert.alert("Awesome!", "Workout saved successfully. Great job today!", [
        { text: "OK", onPress: () => navigation.navigate('Dashboard') }
      ]);
    } catch (error) {
      console.error("Error saving workout:", error);
      Alert.alert("Error", "Could not save workout data.");
    }
  };

  const renderExercise = ({ item }) => {
    const isChecked = checkedItems[item.id] || false;

    return (
      <TouchableOpacity 
        style={[styles.exerciseCard, isChecked && styles.exerciseCardCompleted]} 
        onPress={() => toggleCheckbox(item.id)}
        activeOpacity={0.7}
      >
        {/* Premium Custom Checkbox using Icons */}
        <View style={styles.checkContainer}>
          <Ionicons 
            name={isChecked ? "checkmark-circle" : "ellipse-outline"} 
            size={32} 
            color={isChecked ? "#4caf50" : "#ccc"} 
          />
        </View>

        <View style={styles.exerciseInfo}>
          <Text style={[styles.exerciseName, isChecked && styles.textCompleted]}>{item.name}</Text>
          <Text style={[styles.exerciseDetails, isChecked && styles.textCompleted]}>{item.sets} sets x {item.reps}</Text>
        </View>
        
        {item.videoId && (
          <TouchableOpacity onPress={() => openVideo(item.videoId)} style={styles.playButton}>
            <Ionicons name="play-circle" size={40} color={isChecked ? "#ff9999" : "#ff0000"} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      
      {/* Sleek Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>{screenTitle}</Text>
        <View style={styles.warmupBox}>
          <Ionicons name="flame" size={20} color="#ff9800" style={{ marginRight: 8 }} />
          <Text style={styles.warmupText}>Warmup: {warmup.duration} - {warmup.notes}</Text>
        </View>
      </View>

      {/* List of Exercise Cards */}
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={renderExercise}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Sticky Bottom Premium Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={finishWorkout} activeOpacity={0.8}>
          <Text style={styles.submitButtonText}>COMPLETE WORKOUT</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet Video Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Tutorial</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close-circle" size={32} color="#d3d3d3" />
              </TouchableOpacity>
            </View>
            {currentVideoId && (
              <View style={styles.videoContainer}>
                <YoutubePlayer height={220} play={true} videoId={currentVideoId} />
              </View>
            )}
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8' },
  
  /* Header Styles */
  header: { padding: 20, paddingTop: 40, backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 3, zIndex: 10 },
  title: { fontSize: 24, fontWeight: '900', color: '#1a1a1a', marginBottom: 15, textAlign: 'center', letterSpacing: 1 },
  warmupBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff3e0', padding: 12, borderRadius: 10 },
  warmupText: { fontSize: 14, color: '#e65100', fontWeight: '600', flex: 1 },
  
  /* List Styles */
  listContent: { padding: 20, paddingBottom: 100 },
  
  /* Premium Exercise Card Styles */
  exerciseCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15, marginBottom: 15, borderRadius: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 4 },
  exerciseCardCompleted: { backgroundColor: '#f0fdf4', borderColor: '#bbf7d0', borderWidth: 1 },
  checkContainer: { marginRight: 15 },
  exerciseInfo: { flex: 1 },
  exerciseName: { fontSize: 18, fontWeight: '700', color: '#333' },
  exerciseDetails: { fontSize: 14, color: '#666', marginTop: 4, fontWeight: '500' },
  textCompleted: { color: '#4caf50', textDecorationLine: 'line-through' },
  playButton: { padding: 5 },
  
  /* Sticky Footer Styles */
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: 'rgba(244,246,248,0.9)' },
  submitButton: { flexDirection: 'row', backgroundColor: '#4caf50', paddingVertical: 18, borderRadius: 15, alignItems: 'center', justifyContent: 'center', shadowColor: '#4caf50', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 6, elevation: 5 },
  submitButtonText: { color: '#fff', fontSize: 15, fontWeight: 'bold', letterSpacing: 1 },
  
  /* Modal Styles */
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.6)' },
  bottomSheet: { backgroundColor: '#fff', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 20, paddingBottom: 40, shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 5 },
  sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sheetTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  videoContainer: { borderRadius: 10, overflow: 'hidden' }
});