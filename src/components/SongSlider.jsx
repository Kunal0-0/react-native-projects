import React from 'react'
import Slider from '@react-native-community/slider'
import { useProgress } from 'react-native-track-player'
import { StyleSheet } from 'react-native'

const SongSlider = () => {
    const {position, duration} = useProgress()

  return (
    <View>
        <Slider 
        value={position}
        minimumValue={0}
        maximumValue={duration}
        thumbTintColor='#FFF'
        maximumTrackTintColor='#FFF'
        style={styles.sliderContainer}
        />

        <View style={styles.timeContainer}>
            <Text style={styles.time}>
                // how much time has progressed
                {new Date(position*1000).toISOString().substring(15, 19)} // to extract MM:SS (minutes and seconds) from a timestamp(e.g:- "1970-01-01T00:00:00.000Z"),(YYYY-MM-DDTHH:MM:SS.sssZ) when displaying time progress we do substring(15,19)
            </Text>
            <Text style={styles.time}>
                // how much time has remaining
                {new Date((duration-position)*1000).toISOString().substring(15, 19)}
            </Text>
        </View>   
    </View>
    
  )
}

const styles = StyleSheet.create({
    sliderContainer: {
        width: 350,
        height: 40,
        marginTop: 25,
    
        flexDirection: 'row',
    },
    timeContainer: {
        width: 340,
    
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    time: {
        color: '#fff',
    },
})
export default SongSlider