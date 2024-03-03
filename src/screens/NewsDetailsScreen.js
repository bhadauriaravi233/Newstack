import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {WebView} from "react-native-webview";

const {width, height} = Dimensions.get("window")

export default function NewsDetailsScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  // const [isBookmarked, setBookMarked] = useState(false);
  // const [visible, setVisible] = useState(false);

  console.log("detail", item.url )
  const toggleBookmarkandSave = () => {};
  return (
    <View style={{flex: 1}}>
   <View style={Styles.headingLine}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name='chevron-left' size={30} color={"#000"} />
      </TouchableOpacity>
      <TouchableOpacity style={Styles.headingIcon}>
        <Icon style={Styles.shareIcon} name='share-alt' size={30} color={"#000"} />
        <Icon onPress={toggleBookmarkandSave} style={Styles.shareIcon} name='save' size={30} color={"#000"} />
      </TouchableOpacity>
   </View> 
   <View style={{flex: 1}}>
    
   <WebView style={{flex:1}}
    source={{uri: item.url }}
    // onLoadStart={() => setVisible(true)}
    // onLoadEnd={() => setVisible(false)}
   />
   {/* {visible && (
    <ActivityIndicator 
    size={"large"}
    color={'green'}
    style={{
      position:"absolute",
      top:height/2,
      left: width/2,
    }}
    />
   )}  */}
   </View>
   </View>
  )
}

const Styles = StyleSheet.create({
  container:{
    flex:1
  },
  headingLine:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:15,
    backgroundColor:"#fff"
  },
  headingIcon:{
    flexDirection:'row', 
  },
  shareIcon:{
    paddingHorizontal:12
  }
})