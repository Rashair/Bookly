import { StyleSheet, TextInput, View, Button, ActivityIndicator } from 'react-native'
import { Container, Header, Content, DatePicker, Text, Picker, CardItem } from 'native-base'
import React from 'react'

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
            isLoading: true,
            flats: null
        }
        this.changeSortingType = this.changeSortingType.bind(this)
        //flat {id, type, cost/night, address, rating}
    }
    componentDidMount()
    {
        //fetch get flats
        this.setState({sortingType: this.sortingTypes.lowestPrice})
    }
    changeSortingType(type)
    {
        const URL = 'http://localhost:3004/flats'
        this.setState({isLoading: true})
        fetch(URL)
            .then(response => response.json())
            .then(data => this.setState({flats: data, sortingType: type, isLoading: false}))
            .catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                throw error;
            });
    }
    createCardsList()
    {
        return this.state.flats && this.state.flats.map(flat =>{
            <Card>
                <CardItem>
                    <Text>{flat.type}</Text>
                    <Text>{flat.price.toString()} PLN</Text>
                    <Text>{flat.address}</Text>
                    <Text>{flat.rating}</Text>
                </CardItem>
            </Card>
        })
    }
    render()
    {
        return(
            //przyciski do sortowania
            <Container>
                <Content>
                <Picker
                    selectedValue={this.state.sortingType}
                    mode="dialog"
                    prompt="Sort by"
                    onValueChange={(sortingType) => this.changeSortingType(sortingType)}>
                        <Picker.Item label="Highest price" value="Highest price"/>
                        <Picker.Item label="Lowest price" value="Lowest price"/>
                        <Picker.Item label="Highest rating" value="Highest rating"/>
                </Picker>
                    {this.state.isLoading && <ActivityIndicator size="large" color="#00aaff" />}
                    {!this.state.isLoading && this.createCardsList()}
                </Content>
            </Container>
        )
    }
}