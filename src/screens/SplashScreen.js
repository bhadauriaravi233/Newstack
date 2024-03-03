import React,{useCallback, useEffect} from 'react';
import { Text, View, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function SplashScreen() {
  const navigation = useNavigation();
 
  setTimeout(() =>{
    navigation.navigate("Welcome");
  }, 3000);

  return (
    <ImageBackground 
    style={Styles.container}
    source={require("../Images/reporter.jpg")}>
   <View style={Styles.containerBox}>
    <Text style={Styles.headering}>
        India's no 1
    </Text>
      <Text style={Styles.headering}>NewsReporting App</Text>
   </View>
   </ImageBackground>
  )
}

const Styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  headering:{
    fontSize:45,
    fontWeight:"900",
    textAlign:'center',
    color:'#fff',
    paddingBottom:20
  },
  containerBox:{
    paddingBottom:350,
  }
})