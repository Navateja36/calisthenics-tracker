import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function HistoryScreen({ route }) {
  // Grab the monthId from the dashboard
  const { monthId = 'month1' } = route.params || {};
  
  const [markedDates, setMarkedDates] = useState({});

  const fetchDates = async () => {
    try {
      const storageKey = `completedDates_${monthId}`;
      const existingData = await AsyncStorage.getItem(storageKey);
      
      const datesArray = existingData ? JSON.parse(existingData) : [];

      let marks = {};
      datesArray.forEach(date => {
        // This ensures the dot is the premium green color we want
        marks[date] = { 
          selected: true, 
          selectedColor: '#4caf50',
          marked: true,
          dotColor: 'white' 
        };
      });

      setMarkedDates(marks);
    } catch (error) {
      console.error("Error loading dates", error);
    }
  };

  // This hook runs EVERY time you navigate to the Calendar screen
  useFocusEffect(
    useCallback(() => {
      fetchDates();
    }, [monthId])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>WORKOUT LOG</Text>
        <Text style={styles.subtitle}>{monthId.toUpperCase()} Progress</Text>
      </View>

      <View style={styles.calendarCard}>
        <Calendar
          key={Object.keys(markedDates).length} // Force-re-renders if dates change
          markedDates={markedDates}
          theme={{
            selectedDayBackgroundColor: '#4caf50',
            todayTextColor: '#4630EB',
            arrowColor: '#4630EB',
            monthTextColor: '#333',
            textMonthFontWeight: 'bold',
          }}
        />
      </View>
      
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Total Sessions This Month: {Object.keys(markedDates).length}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 20 },
  header: { marginTop: 40, marginBottom: 20, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '900', color: '#333', letterSpacing: 1 },
  subtitle: { fontSize: 14, color: '#666', fontWeight: 'bold' },
  calendarCard: { 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    padding: 10,
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 10 
  },
  infoBox: { marginTop: 30, padding: 20, backgroundColor: '#fff', borderRadius: 15, alignItems: 'center', elevation: 2 },
  infoText: { fontSize: 16, fontWeight: 'bold', color: '#4caf50' }
});