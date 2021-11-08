import React, { useEffect, useState } from 'react';
import Map from '../../Components/Map';
import { View } from 'react-native';
import { StyleSheet, PermissionsAndroid } from 'react-native';
import { FAB } from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';

const locationUpdatePeriodMs = 5000;

const MainMap = (props) => {
  const [latitude, setLatitude] = useState(39.75523057362685);
  const [longitude, setLongitude] = useState(-105.2211);
  const [altitude, setAltitude] = useState(0);
  const [speed, setSpeed] = useState(0);

  // Configure location servcies.
  const locationHandler = () => {
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then(() => {
      Geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude)
          setLongitude(position.coords.longitude)
          setSpeed(position.coords.speed)
          setAltitude(position.coords.setAltitude)
        },
        (error) => {
          // See error code charts below.
          console.warn(error.code, error.message);
        },
        { enableHighAccuracy: false, timeout: 15000 }
      );
    }).catch((e) => console.log(`An error occured! ${e}`))
  }

  useEffect(() => {
    const beginLocationUpdates = () =>
      setInterval(() => {
        // locationHandler();
      }, locationUpdatePeriodMs)

    const initializeLocationServices = async () => {
      // Initially update and then continuously pull location after that.
      // locationHandler();
      beginLocationUpdates();
    }

    initializeLocationServices();
  }, [])

  const styles = StyleSheet.create({
  });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Map latitude={latitude} longitude={longitude}></Map>
    </View>
  )
};

export default MainMap;