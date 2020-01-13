import { StyleSheet, View, Button, ActivityIndicator } from 'react-native'
import { Container, Header, Content, DatePicker, Text, Picker, Row } from 'native-base'
import { TextInput, Subheading, List, Card, HelperText, Title, Chip, Paragraph } from 'react-native-paper';
import React from 'react'
import { API_URL } from '../../helpers/constants';
import { sendRequest } from '../../helpers/functions';

export default class FlatsListScreen extends React.Component
{
    static navigationOptions = { title: 'Choose accommodation',};
    constructor(props)
    {
        super(props)
        this.sortingTypes = 
        {
            highestPrice: 'Highest price',
            lowestPrice: 'Lowest price',
            highestRating: 'Highest rating'
        }

        this.state = 
        {
            currentPage: 1,
            flatsPerPage: 10,
            sortingType: this.sortingTypes.lowestPrice,
            isLoading: false,
            flats:
            [
                {
                    id: 1,
                    price: 300,
                    address: 'Cukrowa 18',
                    city: 'Warszawa',
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    rating: 4.3,
                    rooms: 1,
                    beds: 3
                },
                {
                    id: 2,
                    price: 450,
                    address: 'Czajnikowa 11',
                    city: 'Warszawa',
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    rating: 4.7,
                    rooms: 3,
                    beds: 2
                }
            ]

        }
        this.changeSortingType = this.changeSortingType.bind(this)
        //flat {id, type, cost/night, address, rating}
    }
    componentDidMount()
    {
        //fetch get flats
        //return this.changeSortingType(this.sortingTypes.lowestPrice)
    }
    changeSortingType(type)
    {
        // DOROBIĆ RÓŻNE DZIAŁANIA DO RÓŻNYCH STATUSÓW ODPOWIEDZI
        // + PAGINACJA
        // const URL = API_URL + '/flats'
        // this.setState({isLoading: true})
        // sendRequest(URL, 'GET', /*headers*/)
        //     .then(response => Promise.all([response.status, response.json()]))
        //     .then(([res,data]) => {
        //         switch(res)
        //         {
        //             case 200:
        //                 this.setState({sortingType: type, flats: data, isLoading: false});
        //             break;
        //         }
        //     })
        //     .catch(function(error) {
        //         console.log('There has been a problem with your fetch operation: ' + error.message);
        //         throw error
        //     });
    }
    goToDetails(flat)
    {
        console.log(flat)
        this.props.navigation.navigate('FlatDetails', {flat: flat})
    }
    createCardsList()
    {
        return(
            <View>
                {this.state.flats && this.state.flats.map((flat) =>{
                    return(
                        <Card key={flat.id} elevation={2} style={{marginBottom:10}} onPress={() => this.goToDetails(flat)}>
                            <Card.Content style={{flex:1, flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                                <Paragraph>{flat.rating.toString()}</Paragraph>
                                <Paragraph>{flat.city + ", " + flat.address}</Paragraph>
                                <Paragraph>{flat.price.toString()} PLN</Paragraph>
                            </Card.Content>
                        </Card>
                    )
                })}
            </View>
        )
    }
    render()
    {
        return(
            //przyciski do sortowania
            <Container>
                <Content style={{paddingVertical: 20}}>
                <View style={{display: 'flex', flexDirection:'row', justifyContent:'space-around', marginBottom:20}}>
                    <Chip 
                        mode="outlined" 
                        selected={this.state.sortingType === this.sortingTypes.lowestPrice ? true : false}
                        onPress={() => this.changeSortingType(this.sortingTypes.lowestPrice)}>
                        Lowest price
                    </Chip>
                    <Chip 
                        mode="outlined" 
                        selected={this.state.sortingType === this.sortingTypes.highestPrice ? true : false}
                        onPress={() => this.changeSortingType(this.sortingTypes.highestPrice)}>
                        Highest price
                    </Chip>
                    <Chip 
                        mode="outlined" 
                        selected={this.state.sortingType === this.sortingTypes.highestRating ? true : false}
                        onPress={() => this.changeSortingType(this.sortingTypes.highestRating)}>
                        Highest rating
                    </Chip>
                </View>
                    {this.state.isLoading && <ActivityIndicator size="large" color='#3579e6'/>}
                    {!this.state.isLoading && this.createCardsList()}
                </Content>
            </Container>
        )
    }
}