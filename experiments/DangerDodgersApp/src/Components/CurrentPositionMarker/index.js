import * as React from "react";
import { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CurrentPositionMarker = (props) => {
    return (<Marker coordinate={props.latlong}>
        <Icon style={styles.inner} name="circle-slice-8" size={25} color='#000000'></Icon>
    </Marker>);
}

export default CurrentPositionMarker;

const styles = StyleSheet.create({
    inner: {
    }
});