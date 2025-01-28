/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function App(): JSX.Element {
  const [randomBackground, setRandomBackground] = useState("#ffffff")

  // function to generate random colors
  const generateColor = () => {
    const hexRange = "0123456789ABCDEF"
    let color = "#"

    for(let i = 0; i < 6; i++) {
      color += hexRange[Math.floor(Math.random() * 16)] // multiplying by 16 to get the index between 0 to 16("0123456789ABCDEF") since hexRange is of 16
    }
    setRandomBackground(color);
  }

  return (
    <>
    <StatusBar backgroundColor={randomBackground}/>
    <View style = {[styles.container, {backgroundColor: randomBackground}]}>
      <TouchableOpacity onPress={generateColor}>
        <View style = {styles.actionBtn}>
          <Text style = {styles.actionBtnTxt}>Press me</Text>
        </View>
      </TouchableOpacity>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1, // flex:1 means the container can take all the available space
    alignItems: "center",
    justifyContent: "center"
  },
  actionBtn: {
    borderRadius: 12,
    backgroundColor: "#6A1B4D",
    paddingVertical: 10,
    paddingHorizontal: 40
  },
  actionBtnTxt: {
    fontSize: 24,
    color: "#FFFFFF",
    textTransform: "uppercase"
  },
});

export default App;
