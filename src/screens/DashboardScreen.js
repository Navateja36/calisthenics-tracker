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
  
  const [resetModalVisible, setResetModalVisible] = useState(false);
  const [resetInput, setResetInput] = useState('');

  const currentPlan = workoutPlan[selectedMonth];

  if (!currentPlan) {
    return (
      <View style={styles.container}>
        <Text>Loading data...</Text>
      </View>
    );
  }

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

  useFocusEffect(
    useCallback(() => {
      fetchProgress();
    }, [selectedMonth])
  );

  const executeReset = async () => {
    if (resetInput.toLowerCase().trim() !== 'reset') {
      Alert.alert("Hold up!", "You must type the word 'reset' exactly to clear your data.");
      return;
    }

    try {
      await AsyncStorage.removeItem('completedDates_month1');
      await AsyncStorage.removeItem('completedDates_month2');
      await AsyncStorage.removeItem('completedDates_month3');

      setWorkoutsCompleted(0);
      setProgress(0);
      setResetModalVisible(false);
      setResetInput('');

      Alert.alert("Wiped Clean", "Your 90-day slate has been completely wiped. Time to start fresh!");
    } catch (error) {
      console.error("Error resetting data", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, selectedMonth === 'month1' && styles.activeTab]} onPress={() => setSelectedMonth('month1')}>
          <Text style={[styles.tabText, selectedMonth === 'month1' && styles.activeTabText]}>M1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, selectedMonth === 'month2' && styles.activeTab]} onPress={() => setSelectedMonth('month2')}>
          <Text style={[styles.tabText, selectedMonth === 'month2' && styles.activeTabText]}>M2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, selectedMonth === 'month3' && styles.activeTab]} onPress={() => setSelectedMonth('month3')}>
          <Text style={[styles.tabText, selectedMonth === 'month3' && styles.activeTabText]}>M3</Text>
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
      
      {/* Upgraded Custom Premium Buttons */}
      <View style={styles.buttonContainer}>
        {currentPlan.type === 'full_body' ? (
          <View style={styles.splitBtnWrapper}>
            <TouchableOpacity 
              style={[styles.customButton, { backgroundColor: '#4630EB' }]} 
              onPress={() => navigation.navigate('Workout', { monthId: selectedMonth })}
              activeOpacity={0.8}
            >
              <Text style={styles.customButtonText}>START FULL BODY WORKOUT</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.splitButtons}>
            {Object.keys(currentPlan.routines).map((routineKey) => {
              // Dynamic coloring based on the routine type
              const btnColor = routineKey === 'push' || routineKey === 'upper' ? '#e53935' : 
                               routineKey === 'pull' || routineKey === 'lower' ? '#1e88e5' : '#43a047';
              
              return (
                <View key={routineKey} style={styles.splitBtnWrapper}>
                  <TouchableOpacity 
                    style={[styles.customButton, { backgroundColor: btnColor }]} 
                    onPress={() => navigation.navigate('Workout', { monthId: selectedMonth, routineType: routineKey })}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.customButtonText}>{`START ${currentPlan.routines[routineKey].name.toUpperCase()}`}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}
        
        <View style={styles.historyWrapper}>
          <TouchableOpacity 
            style={[styles.customButton, styles.historyButton]} 
            onPress={() => navigation.navigate('History', { monthId: selectedMonth })}
            activeOpacity={0.8}
          >
            <Ionicons name="calendar-outline" size={20} color="#333" style={{ marginRight: 8 }} />
            <Text style={styles.historyButtonText}>VIEW CALENDAR HISTORY</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.floatingResetButton} onPress={() => setResetModalVisible(true)}>
        <Ionicons  size={24} color="#fff" />
      </TouchableOpacity>

      {/* Reset Modal */}
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
              autoFocus={true} 
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
  activeTab: { backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  tabText: { fontSize: 16, color: '#666', fontWeight: 'bold' },
  activeTabText: { color: '#4630EB' },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { fontSize: 16, color: 'gray', marginBottom: 30 },
  progressContainer: { width: '100%', marginBottom: 40 },
  progressText: { fontSize: 16, marginBottom: 10, textAlign: 'center', fontWeight: '600' },
  progressBarBackground: { height: 20, backgroundColor: '#e0e0e0', borderRadius: 10, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#4caf50' },
  
  buttonContainer: { width: '100%' },
  splitButtons: { width: '100%' },
  splitBtnWrapper: { marginBottom: 15, width: '100%' },
  historyWrapper: { marginTop: 15, width: '100%' },
  
  /* Premium Custom Button Styles */
  customButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  customButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  historyButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
  },
  historyButtonText: {
    color: '#333',
    fontSize: 15,
    fontWeight: 'bold',
  },

  /* Floating Reset Button Styles */
  floatingResetButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    width: 20,
    height: 20,
    borderRadius: 25,
    backgroundColor: '#c62828',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  
  /* Modal Styles */
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' },
  modalContent: { width: '85%', backgroundColor: '#fff', borderRadius: 15, padding: 20, alignItems: 'center', elevation: 10 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: 'red', marginBottom: 10 },
  modalText: { fontSize: 14, color: '#333', textAlign: 'center', marginBottom: 15 },
  modalInstructions: { fontSize: 14, color: '#555', marginBottom: 10 },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, fontSize: 16, marginBottom: 20 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' }
});