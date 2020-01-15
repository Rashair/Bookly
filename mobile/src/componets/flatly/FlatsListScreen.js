import { StyleSheet, View, Button, ActivityIndicator, FlatList, TouchableOpacity} from 'react-native'
import { Container } from 'native-base'
import { Title, Chip, Paragraph } from 'react-native-paper';
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
            flats: null
            // flats:
            // [
            //     {
            //         id: 1,
            //         title: 'Cukrowa',
            //         price: 300,
            //         address: 'Cukrowa 18',
            //         city: 'Warszawa',
            //         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            //         rating: 4.3,
            //         roomNumber: 1,
            //         beds: 3,
            //         image: 'https://pracownia-projekty.dom.pl/images/36/wizualizacje_1_arc_dom_dla_ciebie_1_z_garazem_ce.jpg'
            //     },
            //     {
            //         id: 2,
            //         title: 'Zielony apartament',
            //         price: 450,
            //         address: 'Czajnikowa 11',
            //         city: 'Warszawa',
            //         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            //         rating: 4.7,
            //         roomNumber: 3,
            //         beds: 2,
            //         image: 'https://projektyzwizja.pl/media/cache/max_size/uploads/wyjatkowy-1/wyjatkowy1-front-1200_1507029951.jpeg'
            //     }
            // ]

        }
        this.changeSortingType = this.changeSortingType.bind(this)
        this.goToDetails = this.goToDetails.bind(this)
        this.Item = this.Item.bind(this)
        //flat {id, type, cost/night, address, rating}
    }
    componentDidMount()
    {
        //fetch get flats
        return this.changeSortingType(this.sortingTypes.lowestPrice)
    }
    changeSortingType(type)
    {
        // DOROBIĆ RÓŻNE DZIAŁANIA DO RÓŻNYCH STATUSÓW ODPOWIEDZI
        // + PAGINACJA
        const URL = API_URL + '/flats'
        this.setState({isLoading: true})
        sendRequest(URL, 'GET', /*headers*/)
            .then(response => Promise.all([response.status, response.json()]))
            .then(([res,data]) => {
                switch(res)
                {
                    case 200:
                        this.setState({sortingType: type, flats: data}, this.setState({isLoading: false}));
                    break;
                }
            })
            .catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                throw error
            });
    }

    // createCardsList()
    // {
    //     return(
    //         <View>
    //             {this.state.flats && this.state.flats.map((flat) =>{
    //                 return(
    //                     <Card key={flat.id} elevation={2} style={{marginBottom:10}} onPress={() => this.goToDetails(flat)}>
    //                         <Card.Content style={{flex:1, flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
    //                             <Paragraph>{flat.rating.toString()}</Paragraph>
    //                             <Paragraph>{flat.city + ", " + flat.address}</Paragraph>
    //                             <Paragraph>{flat.price.toString()} PLN</Paragraph>
    //                         </Card.Content>
    //                     </Card>
    //                 )
    //             })}
    //         </View>
    //     )
    // }
    goToDetails = (flat) =>
    {
        console.log(flat)
        this.props.navigation.navigate('FlatDetails', {flat: flat})
    }
    Item({item})
    {
        return(
            <TouchableOpacity style={{padding: 10}} onPress={() => this.goToDetails(item)}>
                <Title>{item.title}</Title>
                <View style={{flex:1, flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                    <Paragraph>{item.rating.toString()}</Paragraph>
                    <Paragraph>{item.city + ", " + item.address}</Paragraph>
                    <Paragraph>{item.price.toString()} PLN</Paragraph>
                </View>
            </TouchableOpacity>
        )
    }
    render()
    {
        return(
            //przyciski do sortowania
            <Container style={{paddingVertical: 20}}>
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
                    {!this.state.isLoading && 
                    <FlatList
                        data={this.state.flats}
                        renderItem={this.Item}
                        keyExtractor={(item) => item.id.toString()}
                        />}
            </Container>
        )
    }
}