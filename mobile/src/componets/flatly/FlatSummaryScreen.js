import { StyleSheet, View } from 'react-native'
import { Container, Header, Content, DatePicker, Text, Picker } from 'native-base'
import { Headline, Subheading, Title, Button, Paragraph } from 'react-native-paper';
import React from 'react'
import { sendRequest } from '../../helpers/functions';
import { API_URL } from '../../helpers/constants';
import { ScrollView } from 'react-native-gesture-handler';
import { styles, themeColors} from '../../styles'

export default class FlatSummaryScreen extends React.Component
{
    static navigationOptions = { title: 'Summary',};
    constructor(props)
    {
        super(props)
        const { navigation } = this.props;
        this.booking = navigation.getParam('booking')
        this.flat = this.booking.flat
        this.date = this.booking.date
        // this.date = 
        // {
        //     from: new Date(2020,0,31),
        //     to: new Date(2020,1,1)
        // }
        // this.flat = 
        // {
        //     id : 1,
        //     title: "Zielony apartament",
        //     roomNumber: 2,
        //     beds: 2,
        //     price: 500,
        //     rating: 4.55,
        //     city: "Warsaw",
        //     address: "Marszalkowska 11",
        //     countr: "Poland",
        //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        //     image: "https://pracownia-projekty.dom.pl/images/36/wizualizacje_1_arc_dom_dla_ciebie_1_z_garazem_ce.jpg"
        // }
    }
    render()
    {
        // To calculate the time difference of two dates 
        const Difference_In_Time = this.date.to.getTime() - this.date.from.getTime(); 
        // To calculate the no. of days between two dates 
        const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 

        return(
            <Container style={styles.container}>
                {/*id rezerwacji*/}
                <Headline>
                    {this.flat.title}
                </Headline>
                <Text>
                    {this.flat.city + ", " + this.flat.address}
                </Text>
                <View style={[styles.contentRow,styles.marginTopSmall]}>
                    <Title>Rooms</Title>
                    <Title>{this.flat.roomNumber.toString()}</Title>
                </View>
                <View style={styles.contentRow}>
                    <Title>Beds</Title>
                    <Title>{this.flat.beds.toString()}</Title>
                </View>
                <View style={styles.contentRow}>
                    <Title>From</Title>
                    <Title>{this.date.from.toLocaleDateString()}</Title>
                </View>
                <View style={styles.contentRow}>
                    <Title>To</Title>
                    <Title>{this.date.to.toLocaleDateString()}</Title>
                </View>
                <View style={styles.contentRow}>
                    <Title>Total price</Title>
                    <Title>{(this.flat.price * Difference_In_Days).toString()} PLN</Title>
                </View>
                <View style={styles.contentToEnd}>
                    <Button
                            style={[styles.button,styles.marginTopBig]}
                            color={themeColors.primary}
                            mode="contained">
                            My reservations
                    </Button>
                </View>
            </Container>
        )
    }
}