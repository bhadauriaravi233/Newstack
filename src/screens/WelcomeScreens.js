import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Text, View, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'

export default function WelcomeScreens() {
  const navigation = useNavigation();
  return (
    <ImageBackground 
    style={Styles.container}
    source={require("../Images/mediabox.jpg")}>
      <View style={Styles.containerBox}>
        <Text style={Styles.heading1}>
          Stay Informed from Day One
        </Text>
        <Text style={Styles.heading2}>
          Discover the latest News with our Seamless Onboarding
          Experience
        </Text>
      </View>
      <TouchableOpacity
      onPress={()=> navigation.navigate("HomeTabs")}>
        <Text style={Styles.btnStyle}>
          Getting Started
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const Styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'flex-end',
    alignItems:'center',
    
  },
  containerBox:{
    maxWidth:360
  },
  heading1:{
    color:'white',
    fontSize:45,
    fontWeight:'900',
    textAlign:'center',
    paddingBottom:10
  },
  heading2:{
    color:'white',
    fontSize:20,
    fontWeight:'500',
    paddingBottom:10,
    textAlign:'center',
    
  },
  btnStyle:{
    fontSize:25,
    backgroundColor:'green',
    padding:10,
    margin:10,
    borderRadius:20,
    color:'#fff',
    paddingBottom:10,
    fontWeight:'500',
    width:340,
    textAlign:'center'
  }
})