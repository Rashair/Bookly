import { StyleSheet, View } from 'react-native'
import { Container, Header, Content, DatePicker, Text, Picker } from 'native-base'
import { Headline, Subheading, Title, Button, Paragraph } from 'react-native-paper';
import React from 'react'
import { sendRequest } from '../../helpers/functions';
import { API_URL } from '../../helpers/constants';
import { ScrollView } from 'react-native-gesture-handler';

export default class FlatDetailsScreen extends React.Component
{
    static navigationOptions = { title: 'Details',};
    constructor(props)
    {
        //flat details will be passed in props
        super(props)
        const { navigation } = this.props;
        this.flat = navigation.getParam('flat')
        // this.flat = 
        // {
        //     country: 'Poland',
        //     city: 'Warsaw',
        //     address: 'Cukrowa 18',
        //     rooms: 3,
        //     beds: 5,
        //     price: 350,
        //     rating: 4.36,
        //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        // }
    }
    render()
    {
        return(
            <Container>
                <ScrollView contentContainerStyle={styles.content}>
                    <Headline>
                        {this.flat.city + ", " + this.flat.address}
                    </Headline>
                    <View style={{flexDirection:"column" }}>
                        <Title>Description</Title>
                        <Paragraph>{this.flat.description}</Paragraph>
                    </View>
                    <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                        <Title>Rooms</Title>
                        <Title>{this.flat.rooms.toString()}</Title>
                    </View>
                    <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                        <Title>Beds</Title>
                        <Title>{this.flat.beds.toString()}</Title>
                    </View>
                    <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                        <Title>Rating</Title>
                        <Title>{this.flat.rating.toString()}</Title>
                    </View>
                    <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                        <Title>Price</Title>
                        <Title>{this.flat.price.toString()} PLN / night</Title>
                    </View>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                                    <Button
                                          style={styles.button}
                                          color='#3579e6'
                                          mode="contained">
                                          Make reservation
                                    </Button>
                              </View>
                </ScrollView>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    content: {
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 20,
          backgroundColor: '#fff',
          alignItems: "stretch",
    },
    button:{
          height: 54,
          justifyContent: "center",
    },
  });