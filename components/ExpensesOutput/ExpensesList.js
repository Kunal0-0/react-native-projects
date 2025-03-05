import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ExpenseItem from './ExpenseItem'

const ExpensesList = ({expenses}) => {
  function renderExpenseItem(itemData) {
    return (
      <ExpenseItem {...itemData.item}/>
    )
  }
  return (
    <FlatList 
    data={expenses}
    keyExtractor={(item) => item.id}
    renderItem={renderExpenseItem}
    />
  )
}

export default ExpensesList

const styles = StyleSheet.create({})