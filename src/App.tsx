import React, {useState, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { setupPlayer, addTrack } from '../musicPlayerServices';
import MusicPlayer from './screens/MusicPlayer';

function App(): JSX.Element {
  const [isPlayerReady, setIsPlayerReady] = useState(false) // this state is responsible for repainting the UI whenever the player is ready or at the very first point of time

  async function setup () {
    let isSetup = await setupPlayer() // the value of true or false from setupPlayer() is being hold here

    if (isSetup) {
      await addTrack()
    }

    setIsPlayerReady(isSetup)
  }

  useEffect(() => { // useEffect rerender the layout of the application 2 times. First, on the first time when the layout is being portrayed and other on the basis of variables mentioned
    setup()
  }, [])
  
  // conditional rendering the UI based on whether the player is ready or not, if the player is ready then render the code written in the return to display on the UI else run this code

  if(!isPlayerReady) { // if isPlayerReady is false, i.e., player is not ready then this if condition will run  
    return (
      <SafeAreaView>
        <ActivityIndicator /> // a component which displays a buffering circle
      </SafeAreaView>
    )
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <MusicPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
