import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native' // useNavigation hook is used if you want to use navigation object inside a nested component

import React from 'react'

const CategoryGridTile = ({title, color, onPress}) => {
  // const navigation = useNavigation();
  return (
    <View style={[styles.gridItem, {backgroundColor: color}]}>
      <Pressable 
        android_ripple={{color: '#ccc'}} 
        style={({ pressed }) => [
          styles.button, 
          pressed ? styles.buttonPressed : null
        ]}
        onPress={onPress}
      >
        <View style={styles.innerContainer}>
            <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default CategoryGridTile

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 16,
        height: 150,
        borderRadius: 8,
        elevation: 4,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 8,
        overflow: 'hidden'
    },

    button: {
        flex: 1
    },

    buttonPressed: {
        opacity: 0.5
    },

    innerContainer: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },

    title: {
        fontWeight: 'bold',
        fontSize: 18
    }
})