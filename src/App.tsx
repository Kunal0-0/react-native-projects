import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

// Constants
import { currencyByRupee } from './constants'
// Component
import CurrencyButton from './components/CurrencyButton';

import Snackbar from 'react-native-snackbar';

function App(): React.JSX.Element {
  const [inputValue, setInputValue] = useState('')
  const [resultValue, setResultValue] = useState('')
  const [targetCurrency, setTargetCurrency] = useState('')

  const buttonPressed = (targetValue: Currency) => {
    if(!inputValue) { // if the input field is empty show a message (if inputValue is empty, i.e, false(empty string is false) !inputValue inverts the false value to true and shows this message, !inputValue means the input field is empty)
      return Snackbar.show({
        text: "Enter a value to convert",
        backgroundColor: "#EA7773",
        textColor: "#000000"
      })
    }

    const inputAmount = parseFloat(inputValue)
    if (!isNaN(inputAmount)) { // if inputAmount is a number isNAN will return false and !isNAN will convert it to true therefore this if will work only if there is a number in inputAmount(type safety)
      const convertedValue = inputAmount * targetValue.value // targetValue is of Currency type which we defined as interface so (.value) works to access the targetted currency's value

      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)}`

      setResultValue(result)
      setTargetCurrency(targetValue.name)
    }
    else { // if value is not a number
      return Snackbar.show({
        text: "Not a valid number to convert",
        backgroundColor: "#F4BE2C",
        textColor: "#000000"
      })
    }
  }

  return (
    <>
      <StatusBar/>
      <View style = {styles.container}>

        <View style = {styles.topContainer}>
          <View style={styles.rupeesContainer}>
            <Text style = {styles.rupee}>₹</Text>
            <TextInput 
            maxLength={14}
            value={inputValue} // used to display the current value
            onChangeText={setInputValue} // used to update the current value whenever the text is changed
            keyboardType='number-pad'
            placeholder='Enter amount in Rupees'
            />
          </View>
          {resultValue && (
            <Text style = {styles.resultTxt}>
              {resultValue}
            </Text>
          )}
        </View>

        <View style = {styles.bottomContainer}>
          <FlatList 
          numColumns={3}
          data={currencyByRupee}
          keyExtractor={item => item.name}
          renderItem={ ({item}) => ( // renderItem is used for element which you want to print in the screen
            <Pressable
            style = {[
              styles.button, 
              targetCurrency === item.name && styles.selected // Applies conditional styling: If targetCurrency matches item.name, the styles.selected style is applied (indicating a selected button).
            ]}
            onPress={ () => buttonPressed(item) }
            >
              <CurrencyButton {...item} /> // spread operator spreads all the properties(name, value, flag, symbol) of the current object which is represented as item here
            </Pressable>
          )}
          />  
        </View>  
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#515151'
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rupee: {
    marginRight: 8,
    fontSize: 22,
    color: '#000000',
    fontWeight: '800'
  },
  resultTxt: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '800'
  },
  bottomContainer: {
    flex: 3
  },
  button: {
    flex: 1,
    margin: 12,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 1
  },
  selected: {
    backgroundColor: '#ffeaa7'
  }
});

export default App;
