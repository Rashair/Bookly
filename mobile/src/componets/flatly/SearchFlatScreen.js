import { StyleSheet, View } from 'react-native'
import { Container, Header, Content, DatePicker, Text, Picker } from 'native-base'
import { TextInput, Subheading, List, Card, HelperText, Title, Chip, Button } from 'react-native-paper';
import React from 'react'
import { sendRequest } from '../../helpers/functions';
import { API_URL } from '../../helpers/constants';

export default class SearchFlatScreen extends React.Component
{
      static navigationOptions = { title: 'Find accommodation',};
      constructor(props)
      {
            super(props)

            this.showBedsPicker = false
            this.showDateFromPicker = false
            this.showDateToPicker = false
            
            this.setDateFrom = this.setDateFrom.bind(this)
            this.setDateTo = this.setDateTo.bind(this)
            this.setCity = this.setCity.bind(this)
            this.setBeds = this.setBeds.bind(this)

            this.state = 
            {
                  city: "",
                  dateFrom: null,
                  dateTo: null,
                  beds: 1,
                  cityValid: true,
                  dateToValid: true,
                  formValid: false
            }
      }
      setDateFrom(date)
      {
            this.setState({
                  dateFrom: date,
                  dateToValid: this.state.dateTo && date <= this.state.dateTo ? true : false
            })
      }
      setDateTo(date)
      {
            this.setState({
                  dateTo: date,
                  dateToValid: this.state.dateFrom && this.state.dateFrom <= date ? true : false
            })
      }
      setCity(city)
      {
            const cityPattern = /^[a-zA-z][a-zA-z][a-zA-z ]*$/
            this.setState({
                  city: city,
                  cityValid: cityPattern.test(city) && city.length >= 3 ? true : false
            })
      }
      setBeds(beds)
      {
            this.setState({
                  beds: beds,
            })
      }
      createNumberList(n)
      {
            let table = []
            for(let i=1; i<=n; i++)
            {
                  table.push(
                        <Picker.Item label={i.toString()} value={i} key={i}/>
                  )
            }
            return table
      }
      createChip(i)
      {
            return(
                  <Chip 
                        mode="outlined" 
                        selected={this.state.beds === i ? true : false}
                        onPress={() => this.setBeds(i)}>
                        {i.toString()}
                  </Chip>
            )
      }
      search()
      {
            const body = 
            {
                  city: this.state.city,
                  dateFrom: this.state.dateFrom,
                  dateTo: this.state.dateTo,
                  beds: this.state.beds
            }
            sendRequest(API_URL + '/flats', 'GET', /*headers from redux*/ body)
      }
      errorMessage(field)
      {
            switch(field)
            {
                  case 'City':
                        return "City name incorrect"
                  case 'DateTo':
                        return "Ending date must be later or equal to beginning date"
            }
      }
      render()
      {
            return(
                  <Container>
                        <Content contentContainerStyle={styles.content}>
                              <Title>City</Title>
                              <TextInput
                                    mode="outlined"
                                    theme={{ colors: { primary: this.state.cityValid ? '#3579e6' : 'red',underlineColor:'transparent',}}}
                                    style={{backgroundColor: 'white'}}
                                    onChangeText={text => this.setCity(text)}
                                    value={this.state.city}/>
                              <HelperText
                                    style={styles.helper}
                                    type="error"
                                    visible={!this.state.cityValid} >
                                    {this.errorMessage('City')}
                              </HelperText>
                              <Title>From</Title>
                              <DatePicker
                                    style={styles.datepicker}
                                    value={this.state.dateFrom}
                                    minimumDate={new Date()}
                                    onDateChange={(date) => this.setDateFrom(date)}/>
                              <Title>To</Title>
                              <DatePicker
                                    value={this.state.dateTo}
                                    minimumDate={new Date()}
                                    onDateChange={(date) => this.setDateTo(date)}/>
                              <HelperText
                                    style={styles.helper}
                                    type="error"
                                    visible={!this.state.dateToValid} >
                                    {this.errorMessage('DateTo')}
                              </HelperText>
                              <Title>People</Title>
                              <View style={{display: 'flex', flexDirection:'row', justifyContent:'space-around'}}>
                                    {this.createChip(1)}
                                    {this.createChip(2)}
                                    {this.createChip(3)}
                                    {this.createChip(4)}
                                    {this.createChip(5)}
                                    {this.createChip(6)}
                              </View>
                              <HelperText
                                    style={styles.helper}
                                    type="error"
                                    visible={!this.state.bedsValid} >
                                    {this.errorMessage('Beds')}
                              </HelperText>
                              <View style={{flex: 1, justifyContent: 'flex-end'}}>
                                    <Button
                                          style={styles.button}
                                          color='#3579e6'
                                          mode="contained"
                                          disabled={!(this.state.city && this.state.dateTo && this.state.cityValid && this.state.dateToValid)}
                                          onPress={() => this.search()}>
                                          Search
                                    </Button>
                              </View>
                        </Content>
                  </Container>
            );
      }
}

const styles = StyleSheet.create({
      content: {
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 20,
            backgroundColor: '#fff',
            alignItems: "stretch",
            alignSelf: "center"
      },
      datepicker:{
            width: 50,
            height: 20,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'black'
      },
      button:{
            height: 54,
            justifyContent: "center",
      },
      helper:{
            color: 'red'
      }
    });