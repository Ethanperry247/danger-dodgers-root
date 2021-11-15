import * as React from "react";
import { List } from 'react-native-paper';
import { StyleSheet, Text, View } from "react-native";

const HeatMapSelector = (props) => {
    const [expanded, setExpanded] = React.useState(false);

    const handlePress = () => {
        console.log("Hello!")
        setExpanded(!expanded)
    
    };


    return (
        <View style={styles.selector}>
            <View onPress={handlePress}>
                <Text>
                    This is a menu!
                </Text>
            </View>
        </View>
    );
}

export default HeatMapSelector;

const styles = StyleSheet.create({
    selector: {
        height: 60
    },
});


// <List.Accordion
//     title="Controlled Accordion"
//     left={props => <List.Icon {...props} icon="folder" />}
//     expanded={expanded}
//     onPress={handlePress}>
//     <List.Item title="First item" />
//     <List.Item title="Second item" />
// </List.Accordion>