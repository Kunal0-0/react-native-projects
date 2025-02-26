import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useRoute } from '@react-navigation/native'

import React, { useEffect, useLayoutEffect } from 'react'

import MealItem from '../components/MealsList/MealItem'
import { MEALS, CATEGORIES } from '../data/dummy-data'
import MealsList from '../components/MealsList/MealsList'

const MealsOverviewScreen = ({ route, navigation }) => {
  // const route = useRoute(); // this can be used as an alternative to the prop route. This is useful for getting the currently loaded route information in some nested component which is not registered as a screen


  const catID = route.params.categoryID // accepting categooryID with route.params which was passed from Home screen while navigating from CategoriesScreen
  // params - object containing parameters which is defined while navigating e.g., navigate('MealsOverview', {categoryID: itemData.item.id})  
  
  // logic for displaying Meals which match the categoryIDs
  const displayedMeals = MEALS.filter( (mealItem) => {
    return mealItem.categoryIds.indexOf(catID) >= 0
  } )


  useLayoutEffect(() => { // use to set navigation options dynamically, i.e, heading of each page changes dynamically according to the category title
    const categoryTitle = CATEGORIES.find((category) => category.id === catID).title

    navigation.setOptions({
      title: categoryTitle
    })
  }, [catID, navigation])
  

  return <MealsList items={displayedMeals} />
}

export default MealsOverviewScreen