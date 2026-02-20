import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function WorkoutScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Routine</Text>
      <Text>1. Warmup - 10 Min</Text>
      <Text>2. Pushups - 3 x 12</Text>
      <Text>3. Pull-ups - 3 x 8</Text>
      {/* We will replace this with real dynamic data and checkboxes later */}

      <View style={{ marginTop: 40 }}>
        <Button 
          title="COMPLETE WORKOUT" 
          color="green"
          onPress={() => navigation.navigate('Dashboard')} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});