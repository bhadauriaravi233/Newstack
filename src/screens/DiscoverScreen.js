import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'react-native';
import { useColorScheme } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import CategoriesCard from '../components/CategoriesCard';
import { categories } from '../constants';
import { fetchDiscoverNews } from '../../utils/NewsApi';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import NewsSection from '../components/NewsSection';

export default function DiscoverScreen() {
  const navigation = useNavigation();
  const { colorScheme} = useColorScheme();
  const [activeCategory, setActiveCategory] = useState("business");
  const [discovernews, setDiscoverNews] = useState([]);

  useEffect(() => {
    console.log("activeCategory", activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setDiscoverNews([]);
  };

  const getDiscovernew = async () => {
    try {
      const data = await fetchDiscoverNews(activeCategory);
      const filteredNews =data.articles.filter(
        (article) => article.title !== "[Removed]"
      );
      setDiscoverNews(filteredNews);
    } catch (error) {
      console.log(" error in fetch Recommended News : ", error.message)
    }
  };
  
  
  useEffect(() => {
    getDiscovernew();
  }, [activeCategory]);

  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar style={colorScheme =="dark" ? "light" : "dark"} />
   <View >
    <Text style={Styles.Heading}>Discover</Text>
    <Text style={Styles.Heading1}>News from all over the world</Text>
   </View>
   <View style={Styles.inputHead}>
    <TouchableOpacity style={Styles.inputIcon}>
      <Icon name="search"  size={25} color={"#000"}/>
    </TouchableOpacity>

    <TextInput style={Styles.inputstyle}
      onPressIn={() => navigation.navigate("Search")}
      placeholder='Search for news'
      placeholderTextColor={"gray"}
    /> 
   </View>
    <View>
      <CategoriesCard 
      categories={categories}
      activeCategory={activeCategory}
      handleCategoryChange={handleCategoryChange}
      />
    </View>
    <View style={Styles.MiniHeading}>
      <Text style={Styles.MiniHeadingMain}>
        Discover
      </Text>
      <Text style={Styles.MiniHeadingSec}>
        View All
      </Text>
    </View>
    <ScrollView
    contentContainerStyle={{
      paddingBottom: heightPercentageToDP(70)
    }}>
      <NewsSection data ={discovernews} label="Discovery"/>
    </ScrollView>
   </SafeAreaView>
  )
}

const Styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
  },
  Heading:{
    fontSize:35,
    fontWeight:'600',
    color:'green',
    
    paddingLeft:25,
  },
  Heading1:{
    fontSize:15,
    color:"#000", 
    paddingLeft:25,
    
  },
  inputHead:{
    flexDirection:'row',
    backgroundColor:'lightgray',
    borderRadius:25,
    marginTop:15,
    marginLeft:20,
    marginRight:10  
  },
  inputIcon:{
    padding:12
  },
  inputstyle:{
    backgroundColor:'lightgray',
    width:250,
    paddingLeft:10,
    paddingRight:10
  },
  MiniHeading:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:5,
    padding:10,
    paddingLeft:25,
  },
  MiniHeadingMain:{
    fontSize:25,
    color:"green",
  },
  MiniHeadingSec:{
    fontSize:15,
    color:"#000",
    textAlignVertical:'center'
  }
})