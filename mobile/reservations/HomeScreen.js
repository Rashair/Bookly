import React from 'react';
import { render } from 'react-dom'
import { StyleSheet, Text, View, Button } from 'react-native';


export default class HomeScreen extends React.Component {
   
    render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={styles.container}>
        <Button
          title="My reservations"
          onPress={() => navigate('ReservationList')}
        />
        <Button title="Szukaj noclegu" />
        <Button title="Szukaj samochodu" />
        <Button title="Szukaj parkingu" />
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