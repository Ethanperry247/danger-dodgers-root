import React, { useEffect, useContext } from "react";
import { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthContext from "../../Helpers/Auth";

const AlertMarker = (props) => {
    const context = useContext(AuthContext);
    const { latitude, longitude } = props.latlong;
    const { id } = props;

    useEffect(() => {
    }, []);

    const markerPressHandler = () => {
        console.log("Pressed");
    }
    
    const handleDrag = async (event) => {
        console.log(event.nativeEvent.coordinate)

        const data = await context.useAuthorizedPatch('/report/', {
            latitude: latitude,
            longitude: longitude
        });
        if (data.state === 'SUCCESS') {

        }
    };

    return (<Marker onPress={markerPressHandler} draggable coordinate={props.latlong} onDragEnd={handleDrag}>
        <Icon name="map-marker-alert" size={40} color='#ff0000'></Icon>
    </Marker>);
}

export default AlertMarker;