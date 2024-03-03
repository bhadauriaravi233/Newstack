import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import BreakingNewsCard from './BreakingNewsCard';
import Carousal from 'react-native-snap-carousel';


const { width } = Dimensions.get("window")

export default function BreakingNews({ data, label }) {
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate("NewsDetails", item)
  }
  return (

    <View style={Styles.sliderContainer}>
      <Carousal style={Styles.Slider}
        firstItem={1}
        loop={true}
        inactiveSlideScale={0.86}
        sliderWidth={width}
        itemWidth={width*0.8}
        autoplay={true}
        autoplayDelay={5000}
        autoplayInterval={3000}
        infiniteLoop={true}
        data={data}
        renderItem={({ item }) => (
          <BreakingNewsCard item={item} handleClick={handleClick} />
        )}
          
      />
    </View>
  )
}

const Styles = StyleSheet.create({
  sliderContainer: {
    alignContent:'center',
    alignItems: 'center',
    width: 380,
  },
  Slider: {
    borderWidth:2,
    width: 380,
    
  }
})
