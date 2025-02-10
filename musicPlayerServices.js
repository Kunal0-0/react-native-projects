import TrackPlayer, { RepeatMode } from "react-native-track-player";

import { playListData } from "./src/constants";

export async function setupPlayer() {
    let isSetup = false;
    try { //Assuming the player is ready and is trying to get the track
        await TrackPlayer.getActiveTrackIndex()
        isSetup = true
    } catch (error) { // Setup player for first time when the player is not ready, app is just starting
        await TrackPlayer.setupPlayer()
        isSetup = true
    } finally {
        return isSetup;
    }
}

export async function addTrack() { // loading the entire data into the player
    await TrackPlayer.add(playListData) // make sure that the playListData is of type which is supported by TrackPlayer

    await TrackPlayer.setRepeatMode(RepeatMode.Queue) // if user has reached the end of playlist and wants to listen the playlist again from the 1st song
}

export async function playbackService (){
    TrackPlayer.addEventListener(Event.RemotePause, () => {
        TrackPlayer.pause()
    })
    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        TrackPlayer.play()
    })
    TrackPlayer.addEventListener(Event.RemoteNext, () => {
        TrackPlayer.skipToNext()
    })
    TrackPlayer.addEventListener(Event.RemotePrevious, () => {
        TrackPlayer.skipToPrevious()
    })
}