import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
  Pressable
} from 'react-native';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

// Without PropsWithChildren we have to manually add children to every type, PropsWithChildren automatically includes children.
/*type diceProps = {
  imageUrl: ImageSourcePropType,
  children?: React.ReactNode // Add this manually to allow children
}*/

// A type is like a blueprint that describes the shape of data.
type diceProps = PropsWithChildren<{ // To allow React components to accept these children, you need to include a children property in the props. This is where PropsWithChildren comes in.
  imageUrl: ImageSourcePropType
}>

// Dice component which accpets image
const Dice = ({imageUrl}: diceProps): JSX.Element => {
  return (
    <View>
      <Image style = {styles.diceImage} source = {imageUrl}/>
    </View>
  )
}

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

// importing images in react-native(images needs to be imported as modules)
import DiceOne from '../assets/One.png'
import DiceTwo from '../assets/Two.png'
import DiceThree from '../assets/Three.png'
import Dicefour from '../assets/Four.png'
import DiceFive from '../assets/Five.png'
import DiceSix from '../assets/Six.png'

function App(): JSX.Element {
  const [diceImage, setDiceImage] = useState<ImageSourcePropType> (DiceOne)

  const rollDiceOnTap = () => {
    let randomNumber = Math.floor(Math.random() * 6) + 1 // adding 1 to exclude 0 means number will always start from 1

    switch(randomNumber) {
      case 1:
        setDiceImage(DiceOne)
        break;
      case 2:
        setDiceImage(DiceTwo)
        break;
      case 3:
        setDiceImage(DiceThree)
        break;
      case 4:
        setDiceImage(Dicefour)
        break;
      case 5:
        setDiceImage(DiceFive)
        break;
      case 6:
        setDiceImage(DiceSix)
        break;

      default:
        setDiceImage(DiceOne)
        break;
    }
    ReactNativeHapticFeedback.trigger("impactLight", options);
  }
  return (
    <View style={styles.container}>
      <Dice imageUrl={diceImage} />
      {/* //onPress={rollDiceOnTap()} is wrong since we only need to pass the reference of function so that it doesn't run everytime and only runs on the onPress event. */}
      <Pressable onPress={rollDiceOnTap}>
      <Text style = {styles.rollDiceBtnText}>Roll the dice</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF2F2'
  },
  diceImage: {
    height: 200,
    width:200
  },
  rollDiceBtnText: {
    paddingVertical:10,
    paddingHorizontal: 40,
    borderWidth: 4,
    borderColor: '#E5E0FF',
    fontSize: 16,
    color: '#8EA7E9',
    fontWeight: '700',
    textTransform: 'uppercase'
  }
});

export default App;
