import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function FlatCards() {
  return (
    <View>
      <Text style = {styles.headingText}>Flat Cards</Text>
      <View style = {styles.container}>
        <View style = {[styles.card, styles.cardOne]}> // to use multiple styling properties at once on an element we can use an array [property1, property2, etc...]
          <Text>Red</Text>
        </View>

        <View style = {[styles.card, styles.cardTwo]}>
          <Text>Green</Text>
        </View>

        <View style = {[styles.card, styles.cardThree]}>
          <Text>Blue</Text>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 8
  },

  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 8
  },

  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    borderRadius: 4,
    margin: 8
  },

  cardOne: {
    backgroundColor: '#EF5354'
  },

  cardTwo: {
    backgroundColor: '#50DBB4'
  },

  cardThree: {
    backgroundColor: '#5DA3FA'
  },
})