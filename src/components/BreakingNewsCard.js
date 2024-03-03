import React from 'react'
import { Dimensions, Text, TouchableWithoutFeedback, View, Image, StyleSheet } from 'react-native'


const { width, height } = Dimensions.get("window")

export default function BreakingNewsCard({ item, handleClick }) {
  return (
    <TouchableWithoutFeedback style={{flex:1}} onPress={() => handleClick(item)}>
      <View style={Styles.container}>
        <Image style={Styles.Slider}
          source={{
            uri: item.urlToImage || "https://picsum.photos/200/300",
          }}
          resizeMode='cover'
        />
            <Text style={Styles.titlestyle}>
              {item.title.length > 60 ? 
              item.title.slice(0, 58) + "..."
              : item.title.split(" - ")[0] || ("N/A")}
            </Text>
            <Text style={Styles.titlestyle1}>
              {item?.author?.length > 20
              ? item.author.slice(0,20) + "..."
              : item.author}
            </Text>
          </View>

    </TouchableWithoutFeedback>
  )
}

const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  Slider: {

    width: width*0.8,
    borderWidth:2,
    height: height*0.22
  },
  titlestyle:{
    position:'absolute',
    color:'#fff',
    bottom:30,
    fontSize:15,
    fontWeight:'700' 
  },
  titlestyle1:{
    position:'absolute',
    color:'#fff',
    bottom:10,
    fontSize:13,
    fontWeight:'700',
    right:10 
  }
})