import React from 'react';
import {View, Text} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import SavedScreen from '../screens/SavedScreen';
import SearchScreen from '../screens/SearchScreen';
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreens from '../screens/WelcomeScreens';
import NewsDetailsScreen from '../screens/NewsDetailsScreen';
import { useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const AppNavigation = () => {
    const {colorScheme, togglescheme } = useColorScheme();
    const TabNavigator = () =>{
        return(
            <Tab.Navigator
                screenOptions={({route}) =>({
                    headerShown:false,
                    tabBarIcon:({focused}) => {
                        if(route.name === "Home"){
                           return( <Icon name="home" size={25} color= {focused ? "green" : "#999"} />);
                        } else if(route.name === "Discover"){
                            return<Icon name="compass" size={25} color= {focused ? "green" : "#999"}/>
                        } else if(route.name === "Saved"){
                            return<Icon name="save" size={25} color= {focused ? "green" : "#999"}/>
                        } else if(route.name === "Search"){
                            return<Icon name="search" size={25} color= {focused ? "green" : "#999"}/>
                        }

                        
                    },
                    tabBarActiveTintColor:'green',
                    tabBarInactiveTintColor: "gray",
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontFamily:"SpaceGroteskMedium",
                    },
                    tabBarStyle:{
                        backgroundColor: colorScheme === "dark" ? "black" : "white",
                    },
                })}>
                <Tab.Screen name='Home' component={HomeScreen} />
                <Tab.Screen name='Discover' component={DiscoverScreen} />
                <Tab.Screen name='Saved' component={SavedScreen} />
                <Tab.Screen name='Search' component={SearchScreen} />
            </Tab.Navigator>
        )
    }
  return (
   <NavigationContainer>
    <Stack.Navigator 
        initialRouteName='Splashs'
        screenOptions={
           {headerShown: false
        }}>
        <Stack.Screen name='Splashs' component={SplashScreen} />
        <Stack.Screen name='Welcome' component={WelcomeScreens} />
        <Stack.Screen name='Search' component={SearchScreen} />
        <Stack.Screen name='NewsDetails' component={NewsDetailsScreen} />
        <Stack.Screen name='HomeTabs' component={TabNavigator} />
    </Stack.Navigator>
   </NavigationContainer>
  );
}

export default AppNavigation;
