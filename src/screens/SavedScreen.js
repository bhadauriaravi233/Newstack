import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text,FlatList, TouchableOpacity, View, useColorScheme } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import {AsyncStorage} from '@react-native-async-storage/async-storage';


export default function SavedScreen() {
  const navigation = useNavigation();
  const {colorScheme } = useColorScheme();
  const [savedArticles , setSavedArticles] = useState([]);
  const [bookmarkStatus, setBookmarkStatus] = useState([]);
  const [urlList, SetUrlList] = useState([])

  console.log("savedArticles", savedArticles)

  
  const handleClick = (item) => {
    navigation.navigate("NewsDetails", item);
  }

  useEffect(() =>{
    const urls = savedArticles.map ((item) => item.url);
    SetUrlList(urls);
  }, [savedArticles])

  function formatDate(isoDate){
    const options ={
      weekday: "short",
      day:"2-digit",
      month:"short",
      year:"numeric"
    };

    const date = new Date(isoDate);
    return date.toLocaleDateString(undefined, options)
  }

  const toggleBookmarkandSave = async (item , index) => {
    try {
      const savedArticles = await AsyncStorage.getItem("savedArticles");
      let savedArticlesArray = savedArticles 
      ? JSON.parse(savedArticles) 
      : [];

      const isArticleBookedmarked = savedArticlesArray.some(
        (savedArticle) => savedArticle.url === item.url
      );
      if(!isArticleBookedmarked) {
        savedArticlesArray.push(item);
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(savedArticlesArray)
        );
        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = true;
        setBookmarkStatus(updatedStatus);
      }
      else{
        const updatedSavedArticlesArray = savedArticlesArray.filter(
          (savedArticle) => savedArticle.url !== item.url
        );
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(updatedSavedArticlesArray)
        );
        
        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = false;
        setBookmarkStatus(updatedStatus);
      }
    } catch (error) {
      console.log("Error saving news", error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      const loadSavedArticles = async () =>{
        try{
          const savedArticles = await AsyncStorage.getItem("savedArticles");
          const savedArticlesArray = savedArticles
          ? JSON.parse(savedArticles) : [];
         
          setSavedArticles(savedArticlesArray);
        } catch(error) {
          console.log("Error loading saved  articles", error)
        }
      };
      loadSavedArticles();
    },[urlList, navigation])
  );

  return (
    <SafeAreaView>
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"}/>
   <View style={Styles.heading}>
    <Text style={Styles.MainHeading}>
        Saved Articles
    </Text>
    <TouchableOpacity style={Styles.BtnStyle}>
      <Text style={Styles.secHeading}>Clear</Text>
    </TouchableOpacity>
   </View>
   <View style={Styles.container}>
      <FlatList style={{ flex: 1}}
        nestedScrollEnabled={true}
        scrollEnabled={false}
        data={savedArticles}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
        key={index}
        onPress={() => handleClick(item)} >
          <View  style={Styles.containerBox}>
            <View>
            <Image style={{
              width: heightPercentageToDP(9),
              height: heightPercentageToDP(10),
              borderRadius: 8,
              margin: 5,  
            }}
              source={{
                uri: item.urlToImage || "https://picsum.photos/200/300",
              }}
              resizeMode='cover'
            />
            </View>
            <View >
              <Text style={Styles.textAuthor}>
                {item?.author?.length > 20 ?
                  item.author.slice(0, 20) + "..." : item.author}
              </Text>
              <Text style={Styles.textTitle}>
                {item?.title?.length > 50 ? item?.title?.slice(0, 50) + "..." : item?.title}
              </Text>
              <Text style={Styles.textPublised}>
                {formatDate(item.publishedAt)}
              </Text>
            </View>
            <TouchableOpacity onPress={() => toggleBookmarkandSave(item, index)}>
        <View style={Styles.iconStyle}>
          <Icon name="book-bookmark" size={25} color= {bookmarkStatus[index] ? "green" : "gray"}/>
        </View>
          </TouchableOpacity>
          </View>
          </TouchableOpacity>
        )}
        />

    </View>
   </SafeAreaView>
  )
}

const Styles = StyleSheet.create({
  heading:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  MainHeading:{
    fontSize:30,
    color:'green',
    margin:5,
    fontWeight:'500'
  },
  BtnStyle:{
    backgroundColor:'green',
    margin:12,
    marginTop:8,
    borderRadius:10,
    paddingHorizontal:15
  },
  secHeading:{
    padding:5,
    color:"#fff",
    fontSize:20,
    fontWeight:'500'
  }
})