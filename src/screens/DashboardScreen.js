import React, { useState, useCallback } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { workoutPlan } from '../data/workoutPlan';

export default function DashboardScreen({ navigation }) {
  const [selectedMonth, setSelectedMonth] = useState('month1');
  const [progress, setProgress] = useState(0);
  const [workoutsCompleted, setWorkoutsCompleted] = useState(0);
  
  const currentPlan = workoutPlan[selectedMonth];

  // NEW: The Safety Net! If data is missing, stop here and don't crash.
  if (!currentPlan) {
    return (
      <View style={styles.container}>
        <Text>Loading data or data not found for {selectedMonth}...</Text>
      </View>
    );
  }

  useFocusEffect(
    useCallback(() => {
      const fetchProgress = async () => {
        try {
          const storageKey = `completedDates_${selectedMonth}`;
          const existingData = await AsyncStorage.getItem(storageKey);
          
          const datesArray = existingData ? JSON.parse(existingData) : [];
          
          const completedCount = datesArray.length;
          setWorkoutsCompleted(completedCount);

          const targetSessions = currentPlan.minimumTargetSessions; 
          let calculatedProgress = (completedCount / targetSessions) * 100;
          if (calculatedProgress > 100) calculatedProgress = 100;
          
          setProgress(calculatedProgress);
        } catch (error) {
          console.error("Failed to load progress", error);
        }
      };

      fetchProgress();
    }, [selectedMonth])
  );

  return (
    <View style={styles.container}>
      {/* Month Selector Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, selectedMonth === 'month1' && styles.activeTab]}
          onPress={() => setSelectedMonth('month1')}
        >
          <Text style={[styles.tabText, selectedMonth === 'month1' && styles.activeTabText]}>Month 1</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedMonth === 'month2' && styles.activeTab]}
          onPress={() => setSelectedMonth('month2')}
        >
          <Text style={[styles.tabText, selectedMonth === 'month2' && styles.activeTabText]}>Month 2</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{currentPlan.title}</Text>
      <Text style={styles.subtitle}>{currentPlan.weeks}</Text>

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {Math.round(progress)}% Complete ({workoutsCompleted}/{currentPlan.minimumTargetSessions} target)
        </Text>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        {currentPlan.type === 'full_body' ? (
          <Button 
            title="START FULL BODY WORKOUT" 
            color="#4630EB"
            onPress={() => navigation.navigate('Workout', { monthId: selectedMonth })} 
          />
        ) : (
          <View style={styles.splitButtons}>
            <View style={styles.splitBtnWrapper}>
              <Button 
                title="START UPPER BODY" 
                color="#e53935"
                onPress={() => navigation.navigate('Workout', { monthId: selectedMonth, routineType: 'upper' })} 
              />
            </View>
            <View style={styles.splitBtnWrapper}>
              <Button 
                title="START LOWER BODY" 
                color="#1e88e5"
                onPress={() => navigation.navigate('Workout', { monthId: selectedMonth, routineType: 'lower' })} 
              />
            </View>
          </View>
        )}
        
        <View style={{ marginTop: 20 }}>
          <Button 
            title="VIEW CALENDAR HISTORY" 
            color="#555"
            onPress={() => navigation.navigate('History')} 
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#f9f9f9', paddingTop: 40 },
  tabContainer: { flexDirection: 'row', marginBottom: 30, backgroundColor: '#eee', borderRadius: 10, padding: 5 },
  tab: { paddingVertical: 10, paddingHorizontal: 30, borderRadius: 8 },
  activeTab: { backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  tabText: { fontSize: 16, color: '#666', fontWeight: 'bold' },
  activeTabText: { color: '#4630EB' },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { fontSize: 16, color: 'gray', marginBottom: 40 },
  progressContainer: { width: '100%', marginBottom: 40 },
  progressText: { fontSize: 16, marginBottom: 10, textAlign: 'center', fontWeight: '600' },
  progressBarBackground: { height: 20, backgroundColor: '#e0e0e0', borderRadius: 10, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#4caf50' },
  buttonContainer: { width: '90%' },
  splitButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  splitBtnWrapper: { flex: 1, marginHorizontal: 5 }
});