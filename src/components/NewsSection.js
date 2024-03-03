import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { heightPercentageToDP } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome6'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NewsSection({ data }) {
  const navigation = useNavigation();
  const [urlList, SetUrlList] = useState([]);
  const [bookmarkStatus , setBookmarkStatus] = useState([]);

  const handleClick = (item) => {
    navigation.navigate("NewsDetails", item);
  }
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

  useEffect(() =>{
    const urls = data.map ((item) => item.url);
    SetUrlList(urls);
  }, [data])

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
          const isArticleBookedmarkedList = urlList.map((url) =>
          savedArticlesArray.some((savedArticle) => savedArticle.url ===url)
          );
          setBookmarkStatus(isArticleBookedmarkedList);
        } catch(error) {
          console.log("Error loading saved  articles", error)
        }
      };
      loadSavedArticles();
    },[urlList, navigation])
  );

  return (
    
    <View style={Styles.container}>
      <FlatList style={{ flex: 1}}
        nestedScrollEnabled={true}
        scrollEnabled={false}
        data={data}
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
  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerBox:{
     borderBottomWidth:0.5,
    flexDirection:'row', 
    backgroundColor:'#rgb(220, 220, 220)'
    
  },
  textAuthor:{
    color:'#000',
    fontWeight:'600'
    
  },
  textTitle:{
    width:270,
    paddingTop:5,
    paddingBottom:2,
    fontSize:15,
    color:'#000',
    fontWeight:'800'
    
  },
  textPublised:{
    color:'#000'
  },
  iconStyle:{
    paddingTop:25,
    paddingLeft:5
  }
})