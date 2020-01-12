import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, FlatList } from 'react-native';

export default class MyReservationList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
       <Text>Here will be reservation list !</Text>
       <ScrollView >
         <FlatList />
       </ScrollView>
        <Button title="Go back to Home"
        onPress={()=> this.props.navigation.goBack()} />
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