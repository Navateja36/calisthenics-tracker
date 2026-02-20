import React, { useState, useCallback } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { workoutPlan } from '../data/workoutPlan';

export default function DashboardScreen({ navigation }) {
  const [progress, setProgress] = useState(0);
  const [workoutsCompleted, setWorkoutsCompleted] = useState(0);
  
  const targetSessions = workoutPlan.month1.minimumTargetSessions; // 12 sessions

  // useFocusEffect runs every time this screen becomes the active screen
  useFocusEffect(
    useCallback(() => {
      const fetchProgress = async () => {
        try {
          const existingData = await AsyncStorage.getItem('completedDates');
          const datesArray = existingData ? JSON.parse(existingData) : [];
          
          const completedCount = datesArray.length;
          setWorkoutsCompleted(completedCount);

          // Calculate percentage and cap it at 100%
          let calculatedProgress = (completedCount / targetSessions) * 100;
          if (calculatedProgress > 100) calculatedProgress = 100;
          
          setProgress(calculatedProgress);
        } catch (error) {
          console.error("Failed to load progress", error);
        }
      };

      fetchProgress();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{workoutPlan.month1.title}</Text>
      <Text style={styles.subtitle}>{workoutPlan.month1.weeks}</Text>

      {/* Progress Bar Container */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {Math.round(progress)}% Complete ({workoutsCompleted}/{targetSessions} workouts)
        </Text>
        <View style={styles.progressBarBackground}>
          {/* The actual fill line that grows based on the state */}
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="START TODAY'S WORKOUT" 
          color="#4630EB"
          onPress={() => navigation.navigate('Workout')} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f9f9f9' },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { fontSize: 16, color: 'gray', marginBottom: 40 },
  
  progressContainer: { width: '100%', marginBottom: 50 },
  progressText: { fontSize: 16, marginBottom: 10, textAlign: 'center', fontWeight: '600' },
  progressBarBackground: { height: 20, backgroundColor: '#e0e0e0', borderRadius: 10, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#4caf50' },
  
  buttonContainer: { width: '80%' }
});