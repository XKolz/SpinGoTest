// src/screens/WelcomeScreen.tsx
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');

type RootStackParamList = {
  Welcome: undefined;
  Main: undefined;
  Register: undefined;
};

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

type Props = {
  navigation: WelcomeScreenNavigationProp;
  route: RouteProp<RootStackParamList, 'Welcome'>;
};

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0); // State to track active image index

  const images = [
    { id: 1, source: require('../../assets/welcome/welcome.png') },
    { id: 2, source: require('../../assets/welcome/welcome.png') },
    { id: 3, source: require('../../assets/welcome/welcome.png') },
  ];

  const renderIndicator = (index: number) => {
    return (
      <TouchableOpacity
        key={index}
        style={[styles.indicator, activeIndex === index && styles.activeIndicator]}
        onPress={() => setActiveIndex(index)}
      />
    );
  };

  const barHeight = 8; // Adjust the height of the barline
  const barColor = '#00A6FB'; // Adjust the color of the barline

  const barWidth = screenWidth / images.length;
  const translateX = activeIndex * barWidth;

  return (
    <View style={styles.container}>
      <View>

      <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ width: screenWidth }}>
            <Image source={item.source} style={{ width: '100%', height: 500, }} />
          </View>
        )}
        onScroll={(event) => {
          const contentOffsetX = event.nativeEvent.contentOffset.x;
          setActiveIndex(Math.floor(contentOffsetX / screenWidth));
        }}
      />
      <View style={styles.barContainer}>
           <View style={[styles.bar, { transform: [{ translateX }], height: barHeight, backgroundColor: barColor }]} />
      </View>
      </View>
      <View style={styles.content}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-between'}}>
          <Text style={{ fontWeight: 'bold', fontSize: 90, color: '#80808059' }}>O1</Text>
          <Text style={{ width: 200, fontSize: 16 }}>Welcome to <Text style={{ fontWeight: 'bold', color: '#007BFF' }}>SPINGO!</Text> 
          Your ultimate Business Companion.</Text>
        </View>
        <Text style={styles.text}>Streamline your business operations and maximize efficiency with our all-in-one platform.</Text>
        <View style={{ marginTop: 16, gap: 8, marginBottom: 10 }}>
        <TouchableOpacity style={styles.homebutton} onPress={() => navigation.navigate('Main')}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupbutton} onPress={() => navigation.navigate('Register')}>
            <Text style={{ color: '#00A6FB', textAlign: 'center' }}>Sign up</Text>
          </TouchableOpacity>
          {/* <Button title="Home" onPress={() => navigation.navigate('Home')} /> */}
          {/* <Button title="Sign Up" /> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  barContainer: {
    position: 'absolute',
    bottom: 5,
    left: 0, 
    right: 0, 
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginLeft: 20,
    marginRight: 20,
  },
  bar: {
    height: 2,
    width: screenWidth / 3, // Assuming 3 images
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#007BFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  homebutton: {
    backgroundColor: '#00A6FB',
    padding: 15,
    borderRadius: 20,
  },
  signupbutton: {
    padding: 15,
    borderRadius: 20,
    borderColor: '#00A6FB',
    borderWidth: 1,
  },
  text: {
    fontFamily: 'SF-ProDisplay-Light',
    marginTop: 8,
    fontSize: 14
  },
});

export default WelcomeScreen;
