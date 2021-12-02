import React, { useState, useContext } from 'react';
import { TextInput, ToggleButton, Button, Snackbar } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';
import AuthContext from '../../Helpers/Auth';

const Login = () => {
    const [value, setValue] = useState('login');
    const context = useContext(AuthContext);

    const LoginMenu = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        // Snackbar message states.
        const [visible, setVisible] = useState(false);
        const [snackBarMessage, setSnackBarMessage] = useState('');
        const onToggleSnackBar = () => setVisible(!visible);
        const onDismissSnackBar = () => setVisible(false);

        const handleLogIn = async () => {
            const result = await context.signIn({
                username: email,
                password: password
            });
            
            await setSnackBarMessage(result.message);
            onToggleSnackBar();
        };

        return (<View>
            <TextInput
                label="Email"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <Button mode="outlined" onPress={handleLogIn}>
                Sign In
            </Button>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                duration={2000}
                style={styles.snackbar}
                action={{
                    label: 'Ok',
                    onPress: onDismissSnackBar
                }}>
                { snackBarMessage }
            </Snackbar>
        </View>);
    };

    const SignUpMenu = () => {

        // Form fill states.
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [phone, setPhone] = useState('');

        // Snackbar message states.
        const [visible, setVisible] = useState(false);
        const [snackBarMessage, setSnackBarMessage] = useState('');
        const onToggleSnackBar = () => setVisible(!visible);
        const onDismissSnackBar = () => setVisible(false);

        const handleSignUp = async () => {
            const result = await context.signUp({
                firstname: firstName,
                lastname: lastName,
                phone: phone,
                username: email,
                password: password
            });
            await setSnackBarMessage(result.message);
            onToggleSnackBar();
        };

        return (<View style={styles.fullheight}>
            <TextInput
                label="Email"
                mode="outlined"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <TextInput
                label="First Name"
                value={firstName}
                onChangeText={text => setFirstName(text)}
            />
            <TextInput
                label="Last Name"
                value={lastName}
                onChangeText={text => setLastName(text)}
            />
            <TextInput
                label="Phone Number"
                value={phone}
                onChangeText={text => setPhone(text)}
            />
            <Button mode="outlined" onPress={handleSignUp}>
                Sign Up
            </Button>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                duration={2000}
                style={styles.snackbar}
                action={{
                    label: 'Ok',
                    onPress: onDismissSnackBar
                }}>
                { snackBarMessage }
            </Snackbar>
        </View>);
    };

    return(<View style={styles.fill}>
        <ToggleButton.Row onValueChange={value => setValue(value)} value={value}>
            <ToggleButton icon={() => <Text>Sign In</Text>} value="login"></ToggleButton>
            <ToggleButton icon={() => <Text>Sign Up</Text>} value="signup">Sign Up</ToggleButton>
        </ToggleButton.Row>
        {
            value == 'login' 
                ? <LoginMenu></LoginMenu>
                : <SignUpMenu></SignUpMenu>
        }
    </View>
)};

const styles = StyleSheet.create({
    snackbar: {
        position: 'absolute',
        bottom: 30
    }, fill: {
        ...StyleSheet.absoluteFillObject,
    }, fullheight: {
        height: '100%' 
    }
});

export default Login;