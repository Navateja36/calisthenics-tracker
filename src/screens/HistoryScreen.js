import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function HistoryScreen() {
  const [markedDates, setMarkedDates] = useState({});

  useFocusEffect(
    useCallback(() => {
      const fetchDates = async () => {
        try {
          const existingData = await AsyncStorage.getItem('completedDates');
          const datesArray = existingData ? JSON.parse(existingData) : [];

          // Format the array into the object structure the calendar requires
          let marks = {};
          datesArray.forEach(date => {
            marks[date] = { selected: true, selectedColor: '#4caf50' };
          });

          setMarkedDates(marks);
        } catch (error) {
          console.error("Error loading dates", error);
        }
      };
      fetchDates();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout History</Text>
      <Text style={styles.subtitle}>Consistency is key.</Text>
      
      <Calendar
        // This is where we pass our formatted dates to color the calendar
        markedDates={markedDates}
        theme={{
          selectedDayBackgroundColor: '#4caf50',
          todayTextColor: '#4630EB',
          arrowColor: '#4630EB',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 5, textAlign: 'center' },
  subtitle: { fontSize: 16, color: 'gray', marginBottom: 20, textAlign: 'center' },
});