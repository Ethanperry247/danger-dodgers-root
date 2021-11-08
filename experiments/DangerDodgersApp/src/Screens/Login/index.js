import React from 'react';
import { TextInput } from 'react-native-paper';
import { View } from 'react-native';

const Login = () => {
    const [text, setText] = React.useState('');

    return(<View>
        <TextInput
            label="Email"
            mode="outlined"
            value={text}
            onChangeText={text => setText(text)}
        />
        <TextInput
            label="Email"
            value={text}
            onChangeText={text => setText(text)}
        />
    </View>
)};

export default Login;