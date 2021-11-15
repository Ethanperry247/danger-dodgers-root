import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar, Headline, Modal, Portal } from 'react-native-paper';

const RecordRideBar = () => {
    // Visibility state for our modal.
    const [visible, setVisible] = useState(false);
    const [recording, setRecording] = useState(false);
    const [paused, setPaused] = useState(false);
    const [intervalState, setIntervalState] = useState(null);
    const [currentTime, setCurrentTime] = useState(Date.now());
    const [startTime, setStartTime] = useState(Date.now());
    const [pausedDuration, setPausedDuration] = useState(Date.now());

    const handleHideModal = () => {
        setVisible(false);
    };

    const beginInterval = () => {
        setIntervalState(setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000));
    }

    const onStart = () => {
        setRecording(true);
        setStartTime(Date.now());
        setCurrentTime(Date.now());
        beginInterval();
    };

    const onStop = () => {
        clearInterval(intervalState);
        setRecording(false);
        setPaused(false);
    };

    const onPause = () => {
        clearInterval(intervalState);
        setPaused(true);
        setPausedDuration(Date.now())
    };

    const onResume = async () => {
        setPaused(false);
        await setStartTime(startTime + Date.now() - pausedDuration);
        await setCurrentTime(Date.now());
        beginInterval();
    };

    const styles = StyleSheet.create({
        bar: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 70
        },
        play: {
        },
        modal: {
        },
        modalContainer: {
            backgroundColor: 'white',
            padding: 20
        },
        recording: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: 'white',
            margin: 0,
            padding: 0,
            paddingLeft: 20,
            paddingRight: 20,
        }
    });

    const RecordingDisplay = () => {
        return (<>
            {paused
                ? <Appbar.Action
                    icon="play"
                    onPress={onResume}
                />
                : <Appbar.Action
                    icon="pause"
                    onPress={onPause}
                />
            }
            <View style={styles.recording}>
                <Timer startTime={startTime} currentTime={currentTime}></Timer>
            </View>
            <Appbar.Action
                icon="stop"
                onPress={onStop}
            />
        </>);
    };

    return (
        <View>
            <Portal>
                <Modal
                    visible={visible}
                    onDismiss={handleHideModal}
                    contentContainerStyle={styles.modalContainer}
                    style={styles.modal}
                >
                    <Headline>Time</Headline>
                    <Text>
                        Time
                    </Text>
                </Modal>
            </Portal>
            <Appbar style={styles.bar}>
                {
                    !recording ?
                        <Appbar.Action
                            style={styles.play}
                            size={40}
                            icon="play-circle"
                            onPress={onStart}
                        /> : <RecordingDisplay />
                }
            </Appbar>
        </View>
    )
};

export default RecordRideBar;

const Timer = ({currentTime, startTime}) => (
    <Headline>
        {
            (() => {
                const date = new Date(currentTime - startTime);
                return `${String(date.getUTCHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`
            })()
        }
    </Headline>
);