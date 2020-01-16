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
        this.flat = navigation.getParam('flat')
    }
    render()
    {
        return(
            <Container>
                <ScrollView contentContainerStyle={styles.container}>
                    {/*id rezerwacji*/}
                    <Headline>
                        {this.flat.city + ", " + this.flat.address}
                    </Headline>
                    <View style={styles.contentRow}>
                        <Title>Rooms</Title>
                        <Title>{this.flat.rooms.toString()}</Title>
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
                    <View style={styles.contentToEnd}>
                        <Button
                                style={styles.button}
                                color={themeColors.primary}
                                mode="contained">
                                My reservations
                        </Button>
                    </View>
                </ScrollView>
            </Container>
        )
    }
}

// const styles = StyleSheet.create({
//     content: {
//           flex: 1,
//           paddingHorizontal: 20,
//           paddingVertical: 20,
//           backgroundColor: '#fff',
//           alignItems: "stretch",
//     },
//     button:{
//           height: 54,
//           justifyContent: "center",
//     },
//   });