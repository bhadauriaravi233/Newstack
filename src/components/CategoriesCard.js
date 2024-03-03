import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CategoriesCard({
  categories,
  activeCategory,
  handleCategoryChange,
}) {
  return (
    <View style={styles.containers}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingRight: 20,
        }}>
        {categories.map((category, index) => {
          const isActive = category.title === activeCategory;
          const activeButtonStyle = isActive
            ? styles.activeButton
            : styles.inactiveButton;
          const activeTextStyle = isActive
            ? styles.activeText
            : styles.inactiveText;

          return (
            <TouchableOpacity 
              key={index}
              onPress={() => handleCategoryChange(category.title)}>
              <View style={[styles.containerBox, activeButtonStyle]}>
                <Text style={[styles.container, activeTextStyle]}>
                  {category.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containers:{
    marginLeft:15,
    marginTop:5
  },
  containerBox: {
    margin: 4,
    borderRadius: 20,
  },
  container: {
    padding: 10,
    fontSize:15,
    textTransform:'capitalize',
    fontWeight:500
  },
  activeButton: {
    backgroundColor: 'green', 
  },
  inactiveButton: {
    backgroundColor: 'lightgray',
  },
  activeText: {
    color: 'white',
  },
  inactiveText: {
    color: '#000', 
  },
});
