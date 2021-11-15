import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { DefaultTheme, Provider as PaperProvider, Portal } from 'react-native-paper';
import { StyleSheet } from 'react-native';

// Screen views
import MainMap from './src/Screens/MainMap';
import Reports from './src/Screens/Reports';
import Alerts from './src/Screens/Alerts';
// import About from './src/Screens/About';
import Account from './src/Screens/Account';
import Splash from './src/Screens/Splash';

// Top level components 
import UtilityBar from './src/Components/UtilityBar';
import Permissions from './src/Helpers/Permissions';

// Other components
import HeatMapSelector from './src/Components/HeatMapSelector';
import RecordRideBar from './src/Components/RecordRideBar';

// Create navigators.
const Tab = createMaterialBottomTabNavigator();

// Edit global theming here.
const theme = {
  ...DefaultTheme,
  mode: 'adaptive',
  dark: true,
  roundness: 15,
  colors: {
    ...DefaultTheme.colors,
    primary: '#BABBB1',
    accent: '#000000',
    light: '#ffffff',
    backgroundColor: '#ffffff',
    splashBackground: '#000000'
  },
};

const bottomNavStyles = StyleSheet.create({
  nav: {
    // position: 'absolute',
    // padding: 5,
    // right: 10,
    // left: 10,
    // bottom: 10,
    backgroundColor: theme.colors.light,
    shadowRadius: 3.5,
    shadowOpacity: 0.25,
    elevation: 5,
  },
});

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    const initializeLocationServices = async () => {
      await Permissions.requestPermissions();
    }

    initializeLocationServices();
  }, [])

  if (isLoading) {
    console.log("Now Rendering Splash");
    return (<Splash></Splash>);
  }

  return (
    <PaperProvider theme={theme}>
      <Portal.Host><UtilityBar></UtilityBar>
        <NavigationContainer>
          <Tab.Navigator
            barStyle={bottomNavStyles.nav}
            shifting={true}
            sceneAnimationEnabled={false}>
            <Tab.Screen name="Explore" children={() => <MainMap><HeatMapSelector></HeatMapSelector></MainMap>} options={{
              tabBarIcon: 'home-account',
            }} />
            <Tab.Screen name="Record Ride" children={() => <MainMap><RecordRideBar></RecordRideBar></MainMap>} options={{
              tabBarIcon: 'radiobox-marked',
            }} />
            <Tab.Screen name="Create Report" component={Reports} options={{
              tabBarIcon: 'alert-octagon-outline',
            }} />
            <Tab.Screen name="My Alerts" component={Alerts} options={{
              tabBarIcon: 'bell-outline',
            }} />
            {/* <Tab.Screen name="My Account" component={Account} options={{
            tabBarIcon: 'account-circle-outline',
          }} /> */}
          </Tab.Navigator>
        </NavigationContainer>
      </Portal.Host>
    </PaperProvider>
  );
}


// <Tab.Navigator>
// <Tab.Screen name="Home" component={MainMap} />
// {/* <Tab.Screen name="Reports" component={Reports} /> */}
// </Tab.Navigator>


export default App;