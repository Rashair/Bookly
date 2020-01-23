import { StyleSheet, View, Image } from 'react-native'
import { Container, Header, Content, DatePicker, Text, Picker } from 'native-base'
import { Headline, Subheading, Title, Button, Paragraph } from 'react-native-paper';
import React from 'react'
import { sendRequest } from '../../helpers/functions';
import { API_URL } from '../../helpers/constants';
import { ScrollView } from 'react-native-gesture-handler';
import { styles, themeColors} from '../../styles'

export default class FlatDetailsScreen extends React.Component
{
    static navigationOptions = { title: 'Details',};
    constructor(props)
    {
        super(props)
        //const { navigation } = this.props;
        this.flat = this.props.navigation.getParam('flat')
    }
    makeReservation()
    {
        this.props.navigation.navigate('ReservationForm', {flat: this.flat})
    }
    render()
    {
        return(
            <Container>
                <ScrollView contentContainerStyle={styles.container}>
                    <Headline>
                        {this.flat.title}
                    </Headline>
                    <Text style={styles.marginBottomSmall}>
                        {this.flat.city + ", " + this.flat.address}
                    </Text>
                    <Image style={styles.image} resizeMode='cover' source={{ uri: this.flat.image}}></Image>
                    <View style={[styles.contentColumn, styles.marginBottomSmall]}>
                        <Title>Description</Title>
                        <Paragraph>{this.flat.description}</Paragraph>
                    </View>
                    <View style={styles.contentRow}>
                        <Title>Rooms</Title>
                        <Title>{this.flat.roomNumber.toString()}</Title>
                    </View>
                    <View style={styles.contentRow}>
                        <Title>Beds</Title>
                        <Title>{this.flat.beds.toString()}</Title>
                    </View>
                    <View style={styles.contentRow}>
                        <Title>Rating</Title>
                        <Title>{this.flat.rating.toString()}</Title>
                    </View>
                    <View style={styles.contentRow}>
                        <Title>Price</Title>
                        <Title>{this.flat.price.toString()} PLN / night</Title>
                    </View>
                    <View style={[styles.contentToEnd, styles.marginTopBig]}>
                        <Button
                                style={styles.button}
                                color={themeColors.primary}
                                mode="contained"
                                onPress={() => this.makeReservation()}>
                                Make reservation
                        </Button>
                    </View>
                </ScrollView>
            </Container>
        )
    }
}

// const styles = StyleSheet.create({
//     content: {
//         padding: 20,
//         backgroundColor: '#fff',
//         alignItems: "stretch",
//     },
//     button:{
//         marginTop: 10,
//         height: 54,
//         justifyContent: "center",
//     },
//   });