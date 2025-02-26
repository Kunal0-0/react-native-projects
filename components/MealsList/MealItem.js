import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import MealDetails from '../MealDetails';

const Mealtem = ( {id, title, imageUrl,duration, complexity, affordability} ) => {
  const navigation = useNavigation(); // here we need useNavigation hook since this component is not registered as a screen and therefore doesn't have navigation object. Here we are navigating from a component instead of navigating from a screen

  function selectMealItemHandler() {
    navigation.navigate('MealDetails', {
    mealId: id
    })
  }
  
  return (
    <View style={styles.mealItem}>
      <Pressable 
      android_ripple={{color: '#ccc'}}
      style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
      onPress={selectMealItemHandler}
      >
        <View style={styles}>
          <Image 
          style={styles.image}
          source={{ uri: imageUrl }}
          />
          <Text style={styles.title}>{title}</Text>
          <MealDetails duration={duration} affordability={affordability} complexity={complexity}/>
        </View>
      </Pressable>
    </View>
  )
}

export default Mealtem

const styles = StyleSheet.create({
  mealItem: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 4,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 8,
  },
  buttonPressed: {
    opacity: 0.5
  },
  image: {
    width: '100%',
    height: 200
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    margin: 8
  }
})