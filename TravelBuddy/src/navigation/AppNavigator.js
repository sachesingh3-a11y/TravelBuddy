import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#ffffff' },
        headerTintColor: '#2d3436',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 16 },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
        name="HomeMain" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Detail" 
        component={DetailScreen} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { favorites } = useContext(AppContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00b894',
        tabBarInactiveTintColor: '#b2bec3',
        tabBarStyle: { height: 60, paddingBottom: 8, paddingTop: 6, backgroundColor: '#ffffff' },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
        headerStyle: { backgroundColor: '#ffffff', shadowColor: 'transparent', elevation: 0 },
        headerTitleStyle: { fontWeight: 'bold', color: '#2d3436', fontSize: 18 }
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack} 
        options={{ headerShown: false, tabBarLabel: 'Beranda' }} 
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{ title: 'Pencarian', tabBarLabel: 'Cari' }} 
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        options={{ 
          title: 'Favorit Saya', 
          tabBarLabel: 'Favorit',
          tabBarBadge: favorites.length > 0 ? favorites.length : null,
          tabBarBadgeStyle: { backgroundColor: '#ff7675', color: '#fff', fontSize: 10 }
        }} 
      />
    </Tab.Navigator>
  );
}