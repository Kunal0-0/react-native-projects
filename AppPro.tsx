import React from 'react'

import {
    View,
    Text,
    StyleSheet,
    useColorScheme
} from 'react-native'

function AppPro(): JSX.Element{ // will only allow JSX code // feature of typescript
    const isDarkMode = useColorScheme() === 'dark'

    return(
        <View style = {styles.container}>
            <Text style = {isDarkMode ? styles.whiteText : styles.darkText}>
                Hello World
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', // axis of align items: from left to right(main axis) in react-native
        // some commands are different like its flex-start instead of start and flex-end instead of end in case of react-native
        justifyContent: 'center' // axis of justify content: from top to bottom(cross axis) in react-native
    },

    whiteText: {
        color: '#FFFFFF'
    },

    darkText: {
        color: '#000000'
    }
})

export default AppPro;