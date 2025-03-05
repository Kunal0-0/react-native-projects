import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, {useContext, useLayoutEffect} from 'react'

import Button from '../components/UI/Button'
import IconButton from '../components/UI/IconButton'
import {GlobalStyles} from '.././constants/styles'
import { ExpensesContext } from '../store/expenses-context'
import ExpenseForm from '../components/ManageExpense/ExpenseForm'

const ManageExpenses = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseID; // optional chaining(?.) drill into the route.params object and get the expenseId. If any params are not provided/doesn't exist, return undefined. This is useful when we need to open the ManageExpenses screen for adding a new expense. In this case, the route.params object will be empty and route.params.expenseId will be undefined.
  const isEditing = !!editedExpenseId; // JAVASCRIPT TRICK TO CONVERT TO BOOLEAN. By adding !!, it will convert the value to a boolean. If the value is truthy, it will return true. If the value is falsy, it will return false.

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId 
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    }) 
  }, [navigation, isEditing])

  function deleteExpenseHandler() {
    expensesCtx.deleteExpense(editedExpenseId)
    navigation.goBack();
  }
  
  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(expenseData) {
    if(isEditing) {
      expensesCtx.updateExpense(editedExpenseId, expenseData);
    }
    else {
      expensesCtx.addExpense(expenseData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm 
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler} 
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton 
            icon = "trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  )
}

export default ManageExpenses

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
})