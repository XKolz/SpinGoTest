// src/screens/SettingsScreen.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CalculatorScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CalculatorScreen;
