import * as React from "react";
import { Heatmap } from 'react-native-maps';

const customData = require('../../Assets/res.json')

const points = [{
        latitude: 39.75523057362685,
        longitude: -105.22186051013645,
        weight: 100,
}, {
        latitude: 39.75624057362685,
        longitude: -105.22186051013645,
        weight: 10,
}];

const Heat = () => {
        return (<Heatmap points={customData} radius={10} opacity={0.4} minIntensity={5} maxIntensity={100} gradientSmoothing={5} ></Heatmap>);
}

export default Heat;