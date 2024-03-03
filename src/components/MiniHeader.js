import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function MiniHeader({label}) {
  return (
   <View style={Styles.container}>
    <Text style={Styles.header1}>{label}</Text>
    <Text style={Styles.headering}>View All</Text>
   </View>
  )
};

const Styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginLeft:30,
        marginRight:10, 
    },
    header1:{
        fontSize:23,
        fontWeight:'700',
        color: 'green',
        
    },
    headering:{
        fontSize:15,
        padding:10
        
    
    }

})
