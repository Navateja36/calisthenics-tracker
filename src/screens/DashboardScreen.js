import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
import { workoutPlan } from '../data/workoutPlan';

export default function DashboardScreen({ navigation }) {
  const [selectedMonth, setSelectedMonth] = useState('month1');
  const [progress, setProgress] = useState(0);
  const [workoutsCompleted, setWorkoutsCompleted] = useState(0);
  
  // NEW: State to track which months are unlocked
  const [unlockedMonths, setUnlockedMonths] = useState({
    month1: true,
    month2: false,
    month3: false
  });

  const [resetModalVisible, setResetModalVisible] = useState(false);
  const [resetInput, setResetInput] = useState('');

  const currentPlan = workoutPlan[selectedMonth];

  const checkUnlocks = async () => {
    try {
      // Check Month 1 Progress
      const m1Data = await AsyncStorage.getItem('completedDates_month1');
      const m1Count = m1Data ? JSON.parse(m1Data).length : 0;
      const m1Target = workoutPlan.month1.minimumTargetSessions;
      const m1Done = m1Count >= m1Target;

      // Check Month 2 Progress
      const m2Data = await AsyncStorage.getItem('completedDates_month2');
      const m2Count = m2Data ? JSON.parse(m2Data).length : 0;
      const m2Target = workoutPlan.month2.minimumTargetSessions;
      const m2Done = m2Count >= m2Target;

      setUnlockedMonths({
        month1: true,
        month2: m1Done,
        month3: m1Done && m2Done
      });
    } catch (e) {
      console.error(e);
    }
  };

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
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      checkUnlocks();
      fetchProgress();
    }, [selectedMonth])
  );

  const handleTabPress = (month) => {
    if (unlockedMonths[month]) {
      setSelectedMonth(month);
    } else {
      const prevMonth = month === 'month2' ? 'Month 1' : 'Month 2';
      Alert.alert("Locked!", `Finish all target sessions in ${prevMonth} to unlock this stage!`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Tab Container with Lock Icons */}
      <View style={styles.tabContainer}>
        {['month1', 'month2', 'month3'].map((m, index) => {
          const isLocked = !unlockedMonths[m];
          return (
            <TouchableOpacity 
              key={m}
              style={[styles.tab, selectedMonth === m && styles.activeTab, isLocked && styles.lockedTab]} 
              onPress={() => handleTabPress(m)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.tabText, selectedMonth === m && styles.activeTabText, isLocked && styles.lockedTabText]}>
                  M{index + 1}
                </Text>
                {isLocked && <Ionicons name="lock-closed" size={12} color="#999" style={{ marginLeft: 4 }} />}
              </View>
            </TouchableOpacity>
          );
        })}
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
      
      {/* Rest of the UI remains same... */}
      <View style={styles.buttonContainer}>
        {Object.keys(currentPlan.routines || {}).length === 0 ? (
          <TouchableOpacity style={[styles.customButton, { backgroundColor: '#4630EB' }]} onPress={() => navigation.navigate('Workout', { monthId: selectedMonth })}>
            <Text style={styles.customButtonText}>START WORKOUT</Text>
          </TouchableOpacity>
        ) : (
          Object.keys(currentPlan.routines).map((key) => (
            <TouchableOpacity 
              key={key}
              style={[styles.customButton, { backgroundColor: key === 'upper' ? '#e53935' : key === 'lower' ? '#1e88e5' : '#43a047', marginBottom: 10 }]} 
              onPress={() => navigation.navigate('Workout', { monthId: selectedMonth, routineType: key })}
            >
              <Text style={styles.customButtonText}>START {currentPlan.routines[key].name.toUpperCase()}</Text>
            </TouchableOpacity>
          ))
        )}
        <TouchableOpacity style={[styles.customButton, styles.historyButton, { marginTop: 10 }]} onPress={() => navigation.navigate('History', { monthId: selectedMonth })}>
          <Ionicons name="calendar-outline" size={20} color="#333" style={{ marginRight: 8 }} />
          <Text style={styles.historyButtonText}>VIEW CALENDAR HISTORY</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.floatingResetButton} onPress={() => setResetModalVisible(true)}>
        <Ionicons size={24} color="#fff" />
      </TouchableOpacity>

      {/* Reset Modal code remains same... */}
      <Modal animationType="fade" transparent={true} visible={resetModalVisible} onRequestClose={() => setResetModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Are you absolutely sure?</Text>
            <Text style={styles.modalText}>This will permanently delete all your completed workouts for Month 1, 2, and 3. You cannot undo this.</Text>
            <Text style={styles.modalInstructions}>Type the word <Text style={{fontWeight: 'bold', color: 'red'}}>reset</Text> to confirm:</Text>
            
            <TextInput
              style={styles.input}
              onChangeText={setResetInput}
              value={resetInput}
              placeholder="Type reset here..."
              placeholderTextColor="#999"
              autoCapitalize="none"
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.customButton, { backgroundColor: '#555', flex: 1, marginRight: 10 }]} onPress={() => { setResetModalVisible(false); setResetInput(''); }}>
                <Text style={styles.customButtonText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.customButton, { backgroundColor: 'red', flex: 1, marginLeft: 10 }]} onPress={executeReset}>
                <Text style={styles.customButtonText}>WIPE DATA</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#f9f9f9', paddingTop: 50 },
  tabContainer: { flexDirection: 'row', backgroundColor: '#e0e0e0', borderRadius: 10, padding: 4, width: '100%', marginBottom: 30 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 8, marginHorizontal: 2 },
  activeTab: { backgroundColor: '#fff', elevation: 2 },
  lockedTab: { backgroundColor: '#d0d0d0', opacity: 0.7 },
  tabText: { fontSize: 16, color: '#666', fontWeight: 'bold' },
  activeTabText: { color: '#4630EB' },
  lockedTabText: { color: '#999' },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { fontSize: 16, color: 'gray', marginBottom: 30 },
  progressContainer: { width: '100%', marginBottom: 40 },
  progressText: { fontSize: 16, marginBottom: 10, textAlign: 'center', fontWeight: '600' },
  progressBarBackground: { height: 20, backgroundColor: '#e0e0e0', borderRadius: 10, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#4caf50' },
  buttonContainer: { width: '100%' },
  customButton: { width: '100%', paddingVertical: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', elevation: 4 },
  customButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  historyButton: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd' },
  historyButtonText: { color: '#333', fontSize: 15, fontWeight: 'bold' },
  floatingResetButton: { position: 'absolute', bottom: 30, left: 20, width: 20, height: 20, borderRadius: 25, backgroundColor: '#c62828', justifyContent: 'center', alignItems: 'center', elevation: 5 }
});