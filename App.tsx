import React from 'react'

import {
  View, 
  Text, 
  SafeAreaView,
  Button
} from 'react-native'

function App(){
  return(
    <SafeAreaView>
    <View>
      <Text>Hello World!</Text>
    </View>
    <Button title = "Click Me!"/>
    </SafeAreaView>
  )
}

export default App;