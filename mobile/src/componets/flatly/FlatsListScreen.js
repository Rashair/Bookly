import { StyleSheet, View, Button, ActivityIndicator, FlatList, TouchableOpacity} from 'react-native'
import { Container } from 'native-base'
import { Title, Chip, Paragraph } from 'react-native-paper';
import React from 'react'
import { sendRequest, createQueryParams } from '../../helpers/functions';
import { styles, themeColors} from '../../styles'
import { connect } from "react-redux";
import { se} from "../../redux/actions"

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
            
            sortingDir: null,
            sortingType: this.sortingTypes.dateStart,
            isLoading: false,
            flats: null
            
        }
        this.changeSortingType = this.changeSortingType.bind(this)
        this.goToDetails = this.goToDetails.bind(this)
        this.Item = this.Item.bind(this)
       
    }
    componentDidMount()
    {
        //fetch get flats
        return this.changeSortingType(this.sortingTypes.dateStart, null)
    }
    changeSortingType(type, dir=this.sortingDir)
    {
      
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
