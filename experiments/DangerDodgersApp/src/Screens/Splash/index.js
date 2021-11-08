import * as React from "react";
import { View } from 'react-native';
// import Logo from "../../Components/Logo";
import { StyleSheet } from 'react-native';
import { withTheme } from 'react-native-paper';

const Splash = () => {
    return (<View style={styles.background}>
        {/* <Logo /> */}
    </View>);
};

export default withTheme(Splash);

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#000000'
    },
});