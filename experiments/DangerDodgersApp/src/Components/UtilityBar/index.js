import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const UtilityBar = () => (
 <Appbar style={styles.top}>
  <Appbar.Action
    icon="cog-outline"
    onPress={() => console.log('Pressed settings')}
    />
   <Appbar.Action
     icon="information-outline"
     onPress={() => console.log('Pressed information')}
    />
  </Appbar>
 );

export default UtilityBar;

const styles = StyleSheet.create({
  top: {
    width: '100%'
  },
});