import { StyleSheet, View, Button, ActivityIndicator, FlatList, TouchableOpacity} from 'react-native'
import { Container } from 'native-base'
import { Title, Chip, Paragraph } from 'react-native-paper';
import React from 'react'
import { sendRequest, createQueryParams } from '../../helpers/functions';
import { styles, themeColors} from '../../styles'
import { connect } from "react-redux";

class FlatsListScreen extends React.Component
{
    static navigationOptions = { title: 'Choose accommodation',};
    constructor(props)
    {
        super(props)
        this.sortingTypes = 
        {
            dateStart: 'date-start',
            dateEnd: 'date-end',
            price: 'price',
            rating: 'rating'
        }

        this.city = this.props.navigation.getParam('city')
        this.beds = this.props.navigation.getParam('beds')
        this.url = this.props.navigation.getParam('url')

        this.state = 
        {
            // currentPage: 1,
            // flatsPerPage: 10,
            sortingDir: null,
            sortingType: this.sortingTypes.dateStart,
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
        return this.changeSortingType(this.sortingTypes.dateStart, null)
    }
    changeSortingType(type, dir=this.sortingDir)
    {
        //For real server
        // const paramsObj = 
        // {
        //     city: this.city,
        //     start_date: this.props.dates.from,
        //     end_date: this.props.dates.to,
        //     beds: this.beds,
        //     sort: type,
        //     dir: dir
        // }
        // const params = createQueryParams(paramsObj)
        // const url = `${this.url}/${params.toString()}`

        //For mockserver
        const url = this.url
        console.log(url)

        this.setState({isLoading: true})
        sendRequest(url, 'GET')
            .then(response => {
                if(response.ok)
                {
                    response.json()
                        .then(json => this.setState({ sortingType: type, sortingDir: dir, flats: json, isLoading: false }));
                }
                else
                {
                    throw new Error(`Error fetching, status code: ${response.statusCode}`);
                }
            })
            .catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            });
    }
    goToDetails = (flat) =>
    {
        this.props.navigation.navigate('FlatDetails', {flat: flat})
    }
    Item({item})
    {
        return(
            <TouchableOpacity style={styles.marginBottomSmall}onPress={() => this.goToDetails(item)}>
                <Title>{item.title}</Title>
                <View style={styles.contentRow}>
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
            <Container>
                <View style={[styles.marginTopSmall,styles.contentRow]}>
                    <Chip 
                        mode="outlined" 
                        selected={this.state.sortingType === this.sortingTypes.dateStart ? true : false}
                        onPress={() => this.changeSortingType(this.sortingTypes.dateStart)}>
                        Start date
                    </Chip>
                    <Chip 
                        mode="outlined" 
                        selected={this.state.sortingType === this.sortingTypes.dateEnd ? true : false}
                        onPress={() => this.changeSortingType(this.sortingTypes.dateEnd)}>
                        End date
                    </Chip>
                    <Chip 
                        mode="outlined" 
                        selected={this.state.sortingType === this.sortingTypes.rating ? true : false}
                        onPress={() => this.changeSortingType(this.sortingTypes.rating)}>
                        Rating
                    </Chip>
                    <Chip 
                        mode="outlined" 
                        selected={this.state.sortingType === this.sortingTypes.price ? true : false}
                        onPress={() => this.changeSortingType(this.sortingTypes.price)}>
                        Price
                    </Chip>
                </View>

                <View style={styles.container}>
                    {this.state.isLoading ? <ActivityIndicator size="large" color={themeColors.primary}/> :
                    <FlatList
                        data={this.state.flats}
                        renderItem={this.Item}
                        keyExtractor={(item) => item.id.toString()}
                        />}
                </View>
                    
            </Container>
        )
    }
}

const mapStateToProps = (state /* , ownProps */) => {
    return {
        date: state.date
    };
};

const mapDispatchToProps = dispatch => ({
    anyError: data => dispatch(anyError(data)),
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(FlatsListScreen);