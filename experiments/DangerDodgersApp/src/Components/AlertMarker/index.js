import React, { useEffect, useContext } from "react";
import { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthContext from "../../Helpers/Auth";

const AlertMarker = (props) => {
    const context = useContext(AuthContext);
    const { latitude, longitude, id, risk_level, type, description } = props.content;

    useEffect(() => {
    }, []);

    const markerPressHandler = () => {
        console.log("Pressed");
    }
    
    const handleDrag = async (event) => {

        const data = await context.useAuthorizedPatch(`/report/${id}`, {
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude
        });
        if (data.state === 'SUCCESS') {
            // TODO
        }
    };

    return (<Marker onPress={markerPressHandler} draggable coordinate={{ latitude: latitude, longitude: longitude }} onDragEnd={handleDrag}>
        <Icon name="map-marker-alert" size={40} color='#ff0000'></Icon>
    </Marker>);
}

export default AlertMarker;