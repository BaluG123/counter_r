// src/navigation/AppNavigator.tsx

import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ListScreen from '../screens/ListScreen';
import DetailScreen from '../screens/DetailScreen';
import Splashscreen from '../screens/Splashscreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState('SplashScreen');
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="List" component={ListScreen}
        options={{
          headerTitle: 'Pray List', // Set title for List screen
          headerTitleAlign: 'center', // Center the title
          headerStyle: {
            backgroundColor: '#f8f8f8', // Background color for the header
          },
          headerTitleStyle: {
            fontSize: 20, // Font size for the title
            color: '#333', // Color of the title
          },
        }} />
        <Stack.Screen name="Detail" component={DetailScreen} 
        options={{
          headerLeft: null,
          headerTitle: 'Pray Details', // Set a different title for Detail screen
          headerTitleAlign: 'center', // Center the title
          headerStyle: {
            backgroundColor: '#f8f8f8', // Different background color for Detail header
          },
          headerTitleStyle: {
            fontSize: 20, // Font size for the title
            color: '#333', // Color of the title
          },
        }}/>
        <Stack.Screen name="SplashScreen" component={Splashscreen}
        options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
