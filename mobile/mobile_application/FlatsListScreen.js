import { StyleSheet, View, Button, ActivityIndicator } from 'react-native'
import { Container, Header, Content, DatePicker, Text, Picker } from 'native-base'
import { TextInput, Subheading, List, Card, HelperText, Title, Chip } from 'react-native-paper';
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
        return this.changeSortingType(this.sortingTypes.lowestPrice)
    }
    changeSortingType(type)
    {
        const URL = 'http://localhost:3004/flats'
        this.setState({isLoading: true})
        //DOROBIĆ RÓŻNE DZIAŁANIA DO RÓŻNYCH STATUSÓW ODPOWIEDZI
        //+ PAGINACJA
        return fetch(URL)
            .then(response => Promise.all([response.status, response.json()]))
            .then(([res,data]) => {
                switch(res)
                {
                    case 200:
                        this.setState({sortingType: type, flats: data, isLoading: false});
                    break;
                }
            })
            .catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                throw error
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
                    {this.state.isLoading && <ActivityIndicator size="large" color="#00aaff" />}
                    {!this.state.isLoading && this.createCardsList()}
                </Content>
            </Container>
        )
    }
}