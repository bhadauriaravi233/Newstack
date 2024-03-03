import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react'
import { ScrollView, StatusBar, Text, View, useColorScheme } from 'react-native';
import { fetchBreakingNews, fetchRecommendedNews } from '../../utils/NewsApi';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MiniHeader from '../components/MiniHeader';
import BreakingNews from '../components/BreakingNews';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import NewsSection from '../components/NewsSection';

export default function HomeScreen() {
  const { colorScheme, toggleScheme } = useColorScheme();
  const [breakingNews, setBreakingNews] = useState([]);
  const [recommendedNews, setRecommendedNews] = useState([]);

  //  const {isLoading: isBreakingNewsLoading } = useQuery({
  //       queryKey: ["breakingNews"],
  //       queryFn: fetchBreakingNews,
  //       onSuccess: (data) =>{
  //         setBreakingNews(data.articles);
  //       },
  //       onError: (error) =>{
  //         console.log("Error fetching breaking news:", error)
  //       },
  //  });
  //  const {isLoading: isRecommendedNewsLoading } = useQuery({
  //   queryKey: ["recommendedNews"],
  //   queryFn: fetchRecommendedNews,
  //   onSuccess: (data) =>{
  //     setRecommendedNews(data.articles);
  //   },
  //   onError: (error) =>{
  //     console.log("Error fetching recommended news:", error)
  //   },
  // });

  const getbreakingnew = async () => {
    try {
      const data = await fetchBreakingNews();
      setBreakingNews(data.articles);
    } catch (error) {
      console.log(" error in fetchBreaking News : ", error.message)
    }
  };

  useEffect(() => {
    getbreakingnew();
  }, []);
  ;

  const getRecommendednew = async () => {
    try {
      const data = await fetchRecommendedNews();
      setRecommendedNews(data.articles);
    } catch (error) {
      console.log(" error in fetch Recommended News : ", error.message)
    }
  };

  useEffect(() => {
    getRecommendednew();
  }, []);
  
  return (
    <SafeAreaView>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <Header />
      <View>
        <MiniHeader label="Breaking News" />
        <BreakingNews label={"Breaking News"} data={breakingNews} />
      </View>
      <View>
        <MiniHeader label="Recommended News" />
        <ScrollView
            contentContainerStyle={{
            paddingBottom: hp(80),
            }}>
         <NewsSection label={"Recommendation"} data={recommendedNews} />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
