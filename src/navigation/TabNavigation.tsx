import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ChartScreen from '../screens/ChartScreen';
import ReceiptScreen from '../screens/ReceiptScreen';
import CalculatorScreen from '../screens/CalculatorScreen';
import StoreScreen from '../screens/StoreScreen';

const Tab = createBottomTabNavigator();

const TabNavigation: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
        headerShown: true,
        headerTitle: route.name,
        tabBarShowLabel: false,
        tabBarLabelPosition: 'below-icon',
        tabBarActiveTintColor: '#00A6FB',
        tabBarInactiveTintColor: "#292D32",
        tabBarIcon: ({ color, size }) => {
          let imageSource;

          if (route.name === 'Home') {
            imageSource = require('../../assets/tabicons/home.png');
          } else if (route.name === 'Store') {
            imageSource = require('../../assets/tabicons/store.png');
          } else if (route.name === 'Receipt') {
            imageSource = require('../../assets/tabicons/receipt.png');
          } else if (route.name === 'Calculator') {
            imageSource = require('../../assets/tabicons/calculator.png');
          } else if (route.name === 'Chart') {
            imageSource = require('../../assets/tabicons/chart.png');
          }

          return <Image source={imageSource} style={{ width: size, height: size, tintColor: color }} />;
        },
      })}
    >   
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Store" component={StoreScreen} />
      <Tab.Screen name="Receipt" component={ReceiptScreen} />
      <Tab.Screen name="Calculator" component={CalculatorScreen} />
      <Tab.Screen name="Chart" component={ChartScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;