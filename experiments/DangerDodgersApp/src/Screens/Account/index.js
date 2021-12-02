import React, { useEffect, useContext, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Paragraph, Dialog, Portal, List, TextInput, Snackbar } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import AuthContext from '../../Helpers/Auth';

const Stack = createStackNavigator();

const Settings = ({ navigation }) => {
  const context = useContext(AuthContext);
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      const data = await context.useAuthorizedGet('/user/');
      if (data.state === 'SUCCESS') {
        setFirst(data.content.firstname);
        setLast(data.content.lastname);
        setPhone(data.content.phone);
        setUsername(data.content.username);
      }
    };

    getUserData();
  }, []);

  const handleLogOut = () => {
    context.signOut();
  };

  return (
    <View style={styles.settings}>
      <View style={styles.infoContainer}>
        {/* <Headline>Account Settings</Headline> */}
        <Text>Welcome {first} {last}!</Text>
        <Text>Registered Phone Number: {phone}</Text>
        <Text>Registered Email/Username: {username}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={() => navigation.navigate("Update Account")} styles={styles.button}>Update Account Information</Button>
        <Button onPress={handleLogOut} styles={styles.button}>Log Out</Button>
      </View>
    </View>
  );
};

const Account = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account Settings" component={Settings} />
      <Stack.Screen name="Update Account" component={Update} />
    </Stack.Navigator>);
}

const styles = StyleSheet.create({
  settings: {
    padding: 10,
    ...StyleSheet.absoluteFillObject,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }, button: {
  }, buttonContainer: {
  }, infoContainer: {
  }
});

const Update = () => {
  const context = useContext(AuthContext);

  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [current, setCurrent] = useState(0);

  // Used for editing dialog.
  const [show, setShow] = useState(false);
  const [field, setField] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const onToggleSnackBar = () => setSnackBarVisible(!snackBarVisible);
  const onDismissSnackBar = () => setSnackBarVisible(false);

  const updateHandler = async (index) => {
    await setCurrent(index);
    showDialog();
  };

  const handleShow = () => {
    setShow(!show);
  }

  const handleCancel = () => {
    hideDialog();
    setShow(false);
    setField('');
    setUsername('');
    setPassword('');
  };

  const options = [
    "Username",
    "Password",
    "Phone",
    "First Name",
    "Last Name",
  ];

  const attributes = [
    "newUsername",
    "newPassword",
    "phone",
    "firstname",
    "lastname",
  ];

  const handleSubmit = async () => {
    setShow(false);
    const data = await context.useAuthorizedPatch('/user/', {
      username: username,
      password: password,
      // Spot for future improvement, could be implemented/organized differently:
      newUsername: current === 0 ? field : null,
      newPassword: current === 1 ? field : null,
      phone: current === 2 ? field : null,
      firstname: current === 3 ? field : null,
      lastname: current === 4 ? field : null,
    });

    hideDialog();
    if (data.status === 400) {
      onToggleSnackBar();
    }
  };

  return (
    <ScrollView>
      <List.Section>
        <List.Subheader>Account Settings</List.Subheader>
        {options.map((option, index) => {
          return (
            <List.Item
              key={index}
              title={"Change " + option}
              right={() => <List.Icon icon="chevron-right" />}
              onPress={() => updateHandler(index)}
            />
          );
        })}
      </List.Section>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{"Change " + options[current]}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Please enter your new account information in addition to your current username and password.</Paragraph>
            <TextInput
              label={"New " + options[current]}
              value={field}
              onChangeText={text => setField(text)}
            />
            <TextInput
              label="Current Username"
              value={username}
              onChangeText={text => setUsername(text)}
            />
            <TextInput
              label="Current Password"
              value={password}
              secureTextEntry={show}
              onChangeText={text => setPassword(text)}
              right={<TextInput.Icon name="eye" onPress={handleShow} />}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button style={{ color: '#ff0000' }} onPress={handleCancel}>Cancel</Button>
            <Button onPress={handleSubmit}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Snackbar
        visible={snackBarVisible}
        onDismiss={onDismissSnackBar}
        duration={2000}
        style={styles.snackbar}
        action={{
          label: 'Ok',
          onPress: onDismissSnackBar
        }}>
        Incorrect username or password. Please try again.
      </Snackbar>
    </ScrollView>
  );
};

export default Account;