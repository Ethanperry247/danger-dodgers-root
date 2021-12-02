import MapView, { Marker } from 'react-native-maps';
import React, { useRef, useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { FAB, Modal, Portal } from 'react-native-paper';
import Heat from '../HeatMap';
import CurrentPositionMarker from '../CurrentPositionMarker';
import AlertMarker from '../AlertMarker';
import RecordRideBar from '../../Components/RecordRideBar';
import AuthContext from '../../Helpers/Auth';
import Persist from '../../Helpers/Persist';

const mapStyle = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#1d2c4d"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#8ec3b9"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1a3646"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#4b6878"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#64779e"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#4b6878"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#334e87"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#023e58"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#283d6a"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#6f9ba5"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1d2c4d"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#023e58"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#3C7680"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#304a7d"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#98a5be"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1d2c4d"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2c6675"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#255763"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#b0d5ce"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#023e58"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#98a5be"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1d2c4d"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#283d6a"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#3a4762"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0e1626"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#4e6d70"
            }
        ]
    }
];

const mapStyleLight = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#f5f5f5"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#bdbdbd"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e5e5e5"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dadada"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#c2c2c2"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e5e5e5"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c9c9c9"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    }
];

const recenterAnimationDurationMs = 500;
const defaultMapDelta = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
}

const Map = (props) => {
    const context = useContext(AuthContext);
    const { latitude, longitude, altitude } = props;
    const mapRef = useRef(null);
    const [alerts, setAlerts] = useState([]);
    const [heatmapVisible, setHeatmapVisible] = useState(false);

    const alignmentHandler = () => {
        mapRef?.current?.animateToRegion({
            latitude,
            longitude,
            ...defaultMapDelta
        }, recenterAnimationDurationMs);
    }

    useEffect(() => {
        const getNearbyAlerts = async () => {
            const radius = await Persist.retrieve('radius') ?? 0.5;
            const data = await context.useAuthorizedGet(`/report/filter/lat/${latitude}/long/${longitude}/?radius=${radius}`);
            if (data.state === 'SUCCESS') {
                setAlerts([...alerts, data.content.map((content, index) => (<AlertMarker key={alerts.length + index} content={content}></AlertMarker>))]);
            }
        };

        getNearbyAlerts();
    }, [props.mapSettingValue]);

    const quickAddHandler = () => {
        alignmentHandler();

        const createReport = async () => {
            const data = await context.useAuthorizedPost('/report/', {
                latitude: latitude,
                longitude: longitude
            });
            if (data.state === 'SUCCESS') {
                setTimeout(() => {
                    setAlerts([...alerts, <AlertMarker key={alerts.length} content={{ id: data.content.id, latitude: latitude, longitude: longitude }}></AlertMarker>]);
                }, recenterAnimationDurationMs);
            }
        };

        createReport();
    };

    const openLayerHandler = () => {
        setHeatmapVisible(true)
    }

    const closeLayerHandler = () => {
        setHeatmapVisible(false)
    }

    const activityHandler = () => {

    }

    return (
        <>
            <MapView
                ref={mapRef}
                customMapStyle={mapStyleLight}
                style={styles.map}
                initialRegion={{
                    latitude,
                    longitude,
                    ...defaultMapDelta
                }}
                region={{
                    latitude,
                    longitude,
                    ...defaultMapDelta
                }}
            >
                <Heat></Heat>
                <CurrentPositionMarker latlong={{
                    latitude,
                    longitude
                }}></CurrentPositionMarker>
                {alerts}
            </MapView>
            <Portal>
                <Modal visible={heatmapVisible} onDismiss={closeLayerHandler} style={styles.selector}>
                    <View>
                        <View>
                            <Text>
                                This is a menu!
                            </Text>
                        </View>
                    </View>
                </Modal>
            </Portal>
            <RecordRideBar latitude={latitude} longitude={longitude} altitude={altitude}></RecordRideBar>
            <FAB
                style={styles.reportFab}
                large
                icon="plus"
                onPress={quickAddHandler}
            />
            <FAB
                style={styles.activityFab}
                large
                icon="play"
                onPress={activityHandler}
            />
            <FAB
                style={styles.alignFab}
                small
                icon="crosshairs-gps"
                onPress={alignmentHandler}
            />
            <FAB
                style={styles.layerFab}
                small
                icon="layers-outline"
                onPress={openLayerHandler}
            />
        </>);
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    reportFab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    activityFab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 70,
        backgroundColor: '#ffffff'
    },
    layerFab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        top: 0,
        backgroundColor: '#ffffff'
    },
    alignFab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        top: 50,
        backgroundColor: '#ffffff'
    },
    selector: {
        backgroundColor: 'white',
        top: '30%'
    },
});

export default Map;