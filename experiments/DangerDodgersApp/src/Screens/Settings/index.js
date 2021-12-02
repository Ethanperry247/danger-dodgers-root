import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, List, Portal, Dialog, Button, Paragraph } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import Persist from '../../Helpers/Persist';


const Settings = () => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(0.5);
  const [initialValue, setIntialValue] = useState(0.5);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  useEffect(() => {
    const getRadiusValue = async () => {
      const stored = await Persist.retrieve('radius');
      if (stored) {
        const storedValue = (Math.round(convertKilometersToMiles(Number(stored)) * 100) / 100);
        setValue(storedValue);
        setIntialValue(storedValue);
      }
    };

    getRadiusValue();
  }, [visible]);

  const convertMilesToKilometers = (miles) => {
    return miles * 1.60934;
  }

  const convertKilometersToMiles = (km) => {
    return km * 0.621371;
  }

  const handleCancel = () => {
    hideDialog();
  };

  const handleSubmit = () => {
    Persist.store('radius', String(convertMilesToKilometers(value)));
    hideDialog();
  };

  const handleChange = (displayValue) => {
    setValue(Math.round(displayValue * 100) / 100);
  };

  return (
    <ScrollView>
      <List.Section>
        <List.Subheader>Map Settings</List.Subheader>
        <List.Item
          title={"Alert Display Radius"}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={showDialog}
        />
      </List.Section>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{"Change Alert Display Radius"}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Set the search radius for alerts around your location.</Paragraph>
            <View style={styles.slider}>
              <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={0.125}
                maximumValue={20}
                minimumTrackTintColor="#000000"
                maximumTrackTintColor="#000000"
                thumbTintColor="#000000"
                onValueChange={handleChange}
                value={initialValue}
              ></Slider>
              <Text>{value + " miles"}</Text>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button style={{ color: '#ff0000' }} onPress={handleCancel}>Cancel</Button>
            <Button onPress={handleSubmit}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  slider: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
});

export default Settings;