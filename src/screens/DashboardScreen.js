import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function DashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Month 1: Building Foundation</Text>
      <Text style={styles.subtitle}>25% Complete</Text>
      
      {/* We will make this button look much better later */}
      <Button 
        title="START TODAY'S WORKOUT" 
        onPress={() => navigation.navigate('Workout')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 18, color: 'gray', marginBottom: 30 },
});