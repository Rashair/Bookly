
import { StyleSheet, Text, View, Button, ScrollView, Image } from 'react-native';
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';


function MyReservationCarItem ({DateFrom}) {
      return (
        <View>
            <Image source={require('./assets/car.png')} />  {/* here will be custom icon */}
            <Text>{DateFrom}</Text>
        </View>
      );
  }