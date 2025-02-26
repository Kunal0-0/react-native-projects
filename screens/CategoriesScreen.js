import { FlatList } from 'react-native'
import React from 'react'

import { CATEGORIES } from '../data/dummy-data'
import CategoryGridTile from '../components/CategoryGridTile';



const CategoriesScreen = ({ navigation }) => {

  function renderCategoryItem(itemData) {
    
    function pressHandler() {
      navigation.navigate('MealsOverview', {
        categoryID: itemData.item.id
      })
    }

    return <CategoryGridTile title={itemData.item.title} color={itemData.item.color} onPress={pressHandler}/>; 
  }
  // Without destructuring (renderCategoryItem function): The parameter remains an object (itemData), so we access itemData.item.title.
  // So, when FlatList calls renderCategoryItem, it passes an argument like this:
  // { item: { id: 'c1', title: 'Italian', color: '#f5428d' } }

  // With destructuring (inline function): We directly extract item from itemData, so we use item.title.
  // item: { id: 'c1', title: 'Italian', color: '#f5428d' }
  return (
    <FlatList 
    data={CATEGORIES}
    keyExtractor={item => item.id}
    renderItem={renderCategoryItem}
    numColumns={2}
    />
  )
}

export default CategoriesScreen