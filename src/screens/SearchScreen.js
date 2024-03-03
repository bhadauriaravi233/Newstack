import React, { useCallback, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { debounce } from "lodash";
import { useNavigation } from '@react-navigation/native';
import { fetchSearchNews } from '../../utils/NewsApi';
import Icon from 'react-native-vector-icons/FontAwesome';
import NewsSection from '../components/NewsSection';
import { heightPercentageToDP} from 'react-native-responsive-screen';

export default function SearchScreen() {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [searchTerm , setSearchTerm ] = useState("");

  const handleSearch = async (search) =>{
    if(search && search.length > 2) {
      setResults([]);
      setSearchTerm(search);

      try{
        const data = await fetchSearchNews(search);
        
        if (data && data.articles) {
          setResults(data.articles)
        }
    } catch (error) {
      console.log("Error searching news", error );
    }
    }
  };

   const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  return (
    <View style={Styles.container} >
    <View style={Styles.inputHead}>
    <TouchableOpacity style={Styles.inputIcon}>
      <Icon name="search"  size={25} color={"#000"}/>
    </TouchableOpacity>

    <TextInput style={Styles.inputstyle}
      onChangeText = {handleTextDebounce}
      placeholder='Search for news'
      placeholderTextColor={"gray"}
    /> 
    <TouchableOpacity style={Styles.closeIcon}
    onPress={() => navigation.navigate("Home")}>
    <Icon name='remove' size={25} color={"#000"} />
    </TouchableOpacity>
   </View>
    <View >
      <Text style={Styles.textStyle}>
        {results.length} News for {searchTerm}
      </Text>
    </View>

    <ScrollView
    contentContainerStyle={{
      paddingBottom: heightPercentageToDP(5),
    }}>
      <NewsSection data={results} label="Search Results" />
    </ScrollView>

   </View>
  )
}

const Styles = StyleSheet.create({
  container:{
    flex:1
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
    padding:12,
    
  },
  inputstyle:{
    backgroundColor:'lightgray',
    width:260,
    paddingLeft:10,
    paddingRight:10
  },
  closeIcon:{
    padding:12
  },
  textStyle:{
    fontSize:20,
    fontWeight:'600',
    margin:15,
    color:"#000"
  }

})