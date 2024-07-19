import React from 'react';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';
import Navigation from './src/navigation/Navigation';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    'SF-ProDisplay-Black': require('./assets/fonts/SF-Pro-Display-Black.otf'),
    'SF-ProDisplay-Regular': require('./assets/fonts/SF-Pro-Display-Regular.otf'),
    'SF-ProDisplay-Medium': require('./assets/fonts/SF-Pro-Display-Medium.otf'),
    'SF-ProDisplay-Light': require('./assets/fonts/SF-Pro-Display-Light.otf'),
    // Add more fonts as needed
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>; // Example loading indicator
  }
  

  return <Navigation />;
};

export default App;
