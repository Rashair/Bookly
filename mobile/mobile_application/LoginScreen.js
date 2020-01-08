import React from 'react';
import { render } from 'react-dom'
import { StyleSheet, Text, View, Button } from 'react-native';


export default class LoginScreen extends React.Component {
   
    render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={styles.container}>
        <Text>Please log in!</Text>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });