import * as React from "react";
import { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const markerPressHandler = () => {
    console.log("Pressed");
}

const AlertMarker = (props) => {
    return (<Marker onPress={markerPressHandler} draggable coordinate={props.latlong}>
        <Icon name="map-marker-alert" size={35} color='#ff0000'></Icon>
    </Marker>);
}

export default AlertMarker;