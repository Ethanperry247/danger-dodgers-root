import * as React from "react";
import { List } from 'react-native-paper';
import { StyleSheet } from "react-native";

const HeatMapSelector = (props) => {
    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);


    return (
        <List.Accordion
            title="Controlled Accordion"
            left={props => <List.Icon {...props} icon="folder" />}
            expanded={expanded}
            onPress={handlePress}>
            <List.Item title="First item" />
            <List.Item title="Second item" />
        </List.Accordion>
    );
}

export default HeatMapSelector;

const styles = StyleSheet.create({
    selector: {
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        width: '100%'
    },
});