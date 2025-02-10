import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player'
import Icon from '@react-native-vector-icons/material-icons'
import { playbackService } from '../../musicPlayerServices'

const ControlCenter = () => {

  const playBackState = usePlaybackState() // hook provided by react native track player so we can keep of all the states that are happening

  // next button
  const skipToNext = async () => {
    await TrackPlayer.skipToNext()
  }

  // Previous button
  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious()
  }

  const togglePlayback = async (playback: State) => {
    const currentTrack = await TrackPlayer.getActiveTrackIndex()

    if(currentTrack != null) {
      if(playback === State.Paused || playback === State.Ready) {
        await TrackPlayer.play()
      } else {
        await TrackPlayer.pause()
      }
    }
  }
  return (
    <View style={styles.container}>
      // Previous button
      <Pressable onPress={skipToPrevious}>
        <Icon style={styles.icon} name="skip-previous" size={40} />
      </Pressable>

      // Pause/Play button
      <Pressable onPress={() =>{
        if(playBackState.state !== undefined) {
          togglePlayback(playBackState.state)
        }
      }}>
        <Icon 
        style={styles.icon} 
        name={playBackState.state === State.Playing ? "pause" : "play-arrow"} 
        size={40} />
      </Pressable>
      
      // Next button
      <Pressable onPress={skipToNext}>
        <Icon style={styles.icon} name="skip-next" size={40} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 56,

    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '#FFFFFF',
  }
})
export default ControlCenter