import React from 'react';
import { View, Linking, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const About = () => (
  <View>
    <Text>Chad Young was a man of many talents. Not only was he devoted to his Mechanical Engineering degree at Mines with a near-perfect GPA, but he was also a powerful and accomplished cyclist, receiving numerous accolades at the professional level. On top of all that, Chad was a compassionate, humble, leader.


      On April 28th, 2017, Chad, unfortunately, had his life cut too short as a brain injury sustained during a race ended up being fatal. Shortly after the accident, Chad’s parents, Kevin and Lois Young, began the Chad William Young Foundation in an effort to minimize cycling incidents and continue Chad’s legacy.


      This app was conceptualized and funded by the
      {' '}<Text style={styles.link} onPress={() => Linking.openURL('https://cwyf.org/')}>
        Chad William Young Foundation
      </Text>{' '}
      , and many students/faculty at 
      {' '}<Text style={styles.link} onPress={() => Linking.openURL('https://www.mines.edu/')}>
        Colorado School of Mines
      </Text>{' '}
      , primarily in the 
      {' '}<Text style={styles.link} onPress={() => Linking.openURL('https://www.cs.mines.edu/')}>
      Department of Computer Science
      </Text>{' '}
       have contributed to the project.

    </Text>
  </View>
);

const styles = StyleSheet.create({
  link: {
    color: '#3333ff',
    fontWeight: 'bold'
  }
});

export default About;