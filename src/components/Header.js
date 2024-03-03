import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Header() {
    const navigation = useNavigation();
    const {colorScheme, toggleScheme } = useColorScheme();
  return (
   <View style={Styles.container}>
    
    <Text style={Styles.headers}>
        STACK NEWS
        </Text>
    
    <View style={Styles.containerBox}>
        <Switch value={colorScheme == "dark" } onChange={toggleScheme} />
    <TouchableOpacity 
        onPress={() => navigation.navigate("Search")} >
            <Icon style={Styles.magbtn} name="search" size={25} />
    </TouchableOpacity>

    </View>
    </View>
  )
};

const Styles = StyleSheet.create({
    container:{
      flexDirection:'row',
      marginTop:10 
    },
    headers:{
        color:'green',
        height:40,
        width:250,
        textAlign:'center',
        fontSize:30,
        fontWeight:'800',
    },
    containerBox:{
        flexDirection:'row',
        marginTop:10,
        width:120,
    },
    magbtn:{
        marginLeft:40
    },
  
})
