import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState} from 'react'

import BouncyCheckbox from "react-native-bouncy-checkbox"

// Form Validation
import * as Yup from 'yup'
import { Formik } from 'formik';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
  .min(4, 'Should be min of 4 characters')
  .max(16, 'Should be max of 16 characters')
  .required('Length is required')
})

export default function App() {
  // useState: use to update states on UI 
  // Have two variables. First, one is the default value and the second one is a method which is used to update the default value
  const [password, setPassword] = useState('') // stores the generated password
  const [isPassGenerated, setIsPassGenerated] = useState(false) // for card that is generated when 

  const[lowerCase, setLowerCase] = useState(true)
  const[upperCase, setUpperCase] = useState(false)
  const[numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCasechars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if(upperCase) {
      characterList += upperCaseChars
    }
    if(lowerCase) {
      characterList += lowerCasechars
    }
    if(numbers) {
      characterList += digitChars
    }
    if(symbols) {
      characterList += specialChars 
    }

    const passwordResult = createPassword(characterList, passwordLength)

    setPassword(passwordResult)
    setIsPassGenerated(true)
  }

  const createPassword = (characters: string, passwordLength: number) => {
    let result = ''
    for(let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characters.length) // multiplying by characters length because math.random() generates a number between 0 and 1, but we want the index to be equal to or between the length of the characters string which is provided
      result += characters.charAt(characterIndex)
    }    
    return result
  }

  const resetPasswordState = () => {
    setPassword('')
    setIsPassGenerated(false)
    setLowerCase(true)
    setUpperCase(false)
    setNumbers(false)
    setSymbols(false)
  }
  return (
    <ScrollView keyboardShouldPersistTaps = "handled">
      <SafeAreaView style = {styles.appContainer}>
        <View style = {styles.formContainer}>
          <Text style = {styles.title}>Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={ values => {
              console.log(values) // values is an object which contains all the form values. Here, only value is passwordLength(which in itself is an object with key value pair. key is passwordLength and value is the length which we enter)
              generatePasswordString(+values.passwordLength) // values.passwordLength will give a string but we require a number in our generatePasswordString() method. So we need to convert that string value to a number and we can do this by: 1) Number(values.passwordLength) 2) +values.passwordLength
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
              /* and other goodies */
            }) => (
              <>
              <View style = {styles.inputWrapper}>
                <View style = {styles.inputColumn}>
                  <Text style = {styles.heading}>Password Length</Text>
                  // Displaying errors
                  {touched.passwordLength && errors.passwordLength && (
                    <Text style = {styles.errorText}>
                      {errors.passwordLength}
                    </Text>
                  )}
                </View>
                <TextInput
                  style = {styles.inputStyle}
                  value = {values.passwordLength} //Purpose: Sets the current value of the input field.
                  // It represents the current state of the input field for passwordLength. This ensures the input field is "controlled," meaning its value is tied to the form state managed by Formik.

                  onChangeText={handleChange('passwordLength')} // Purpose: Updates the value of the input field when the user types
                  // It automatically updates the passwordLength field in Formik's values object whenever the text in the input changes. This ensures seamless two-way data binding between the input field and the form state.

                  // Value Update: As the user types, the onChangeText function updates the values.passwordLength field in Formik's state.
                  // Controlled Input: The value prop ensures the input field reflects the current state of values.passwordLength.
                  placeholder='Ex. 8'
                  keyboardType='numeric'
                />
              </View>

              <View style = {styles.inputWrapper}>
                <Text style = {styles.heading}>Include Lowercase letters</Text>

                <BouncyCheckbox
                style= {styles.checksLowerCase}
                useBuiltInState={false}
                isChecked={lowerCase}
                onPress={() => setLowerCase(!lowerCase)}
                fillColor='#29AB87'
                />
              </View>

              <View style = {styles.inputWrapper}>
                <Text style = {styles.heading}>Include Uppercase letters</Text>

                <BouncyCheckbox
                style= {styles.checksUpperCase}
                useBuiltInState={false}
                isChecked={upperCase}
                onPress={() => setUpperCase(!upperCase)}
                fillColor='#FED85D'
                />
              </View>

              <View style = {styles.inputWrapper}>
                <Text style = {styles.heading}>Include Numbers</Text>

                <BouncyCheckbox
                style= {styles.checksNumbers}
                useBuiltInState={false}
                isChecked={numbers}
                onPress={() => setNumbers(!numbers)}
                fillColor='#C9A0DC'
                />
              </View>

              <View style = {styles.inputWrapper}>
                <Text style = {styles.heading}>Include Symbols</Text>

                <BouncyCheckbox
                style= {styles.checksSymbols}
                useBuiltInState={false}
                isChecked={symbols}
                onPress={() => setSymbols(!symbols)}
                fillColor='#FC80A5'
                />
              </View>

              <View style = {styles.formActions}>
                <TouchableOpacity
                disabled={!isValid} // disabled means we are only allowing to click on the button if and only if all the validation checks pass
                // The disabled prop in the component determines whether the button is interactive or not. If disabled is set to true, the button becomes non-clickable, and any actions associated with it like onPress won't execute. 

                /* isValid is a boolean provided by Formik.
                true: The form values pass all validation rules.
                false: At least one validation rule has failed.
                !isValid inverts the value:
                If isValid is false (form is invalid), disabled is true (button is disabled).
                If isValid is true (form is valid), disabled is false (button is enabled). */
                
                style={styles.primaryBtn}
                onPress={ () => handleSubmit()} // handleSubmit collects all the data it needs to collect like error, values and all of that and this handleSubmit calls the onSubmit which is prop in formik and then there we are generating password string
                >
                  <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style = {styles.secondaryBtn}
                onPress={ () => {
                  handleReset();
                  resetPasswordState() // like this we can call your own methods as well
                } }
                >
                  <Text style={styles.secondaryBtnTxt}>Reset</Text>
                </TouchableOpacity>
              </View>
              </>
            )}
          </Formik>
        </View>

        // conditional code for generating the password card
        {isPassGenerated ? (
          <View style = {[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long Press to copy</Text>
            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex:1
  },
  formContainer: {
    margin: 8,
    padding: 8
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  inputColumn: {
    flexDirection: 'column'
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e'
  },
  heading: {
    fontSize: 15
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10'
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA'
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 8
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12
  },
  cardElevated: {
    backgroundColor: '#5DA3FA',
    elevation: 1,
    shadowOffset: {
      height: 1,
      width: 1
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 8
  },
  description: {
    // color: '#758283',
    marginBottom: 8
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000'
  },
  checksLowerCase: {
    marginHorizontal: 88
  },
  checksUpperCase: {
    marginHorizontal: 89
  },
  checksNumbers: {
    marginHorizontal: 147
  },
  checksSymbols: {
    marginHorizontal: 151
  }
})