import { StyleSheet, View } from 'react-native'
import { Container, Header, Content, DatePicker, Text, Picker } from 'native-base'
import { TextInput, Subheading, List, Card, HelperText, Title, Chip, Button } from 'react-native-paper';
import React from 'react'
import { AuthSession } from 'expo'

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
                  bedsValid: true,
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
                  bedsValid: beds ? true : false
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
      errorMessage(field)
      {
            switch(field)
            {
                  case 'City':
                        return "City name incorrect"
                  case 'DateTo':
                        return "Date to must be later than date from"
                  case 'Beds':
                        return "Please, choose beds number"
            }
      }
      render()
      {
            return(
                  <Container>
                        <Content style={{ paddingVertical: 20, paddingHorizontal: 10}}>
                              <Title>City</Title>
                              <TextInput
                                    mode="outlined"
                                    style={{backgroundColor: 'white'}}
                                    onChangeText={text => this.setCity(text)}
                                    value={this.state.city}/>
                              <HelperText
                                    type="error"
                                    visible={!this.state.cityValid} >
                                    {this.errorMessage('City')}
                              </HelperText>
                              <Title>From</Title>
                              <DatePicker
                                    value={this.state.dateFrom}
                                    minimumDate={new Date()}
                                    onDateChange={(date) => this.setDateFrom(date)}/>
                              <Title>To</Title>
                              <DatePicker
                                    style={{border: 'solid 2px black'}}
                                    value={this.state.dateTo}
                                    minimumDate={new Date()}
                                    onDateChange={(date) => this.setDateTo(date)}/>
                              <HelperText
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
                              {/* <Picker
                                    selectedValue={this.state.beds}
                                    mode="dialog"
                                    prompt="Choose beds number"
                                    onValueChange={(beds) => this.setBeds(beds)}>
                                          {this.createNumberList(6)}
                              </Picker> */}
                              <HelperText
                                    type="error"
                                    visible={!this.state.bedsValid} >
                                    {this.errorMessage('Beds')}
                              </HelperText>
                              <Button
                                    mode="contained"
                                    disabled={!(this.state.cityValid && this.state.dateTo && this.state.bedsValid)}
                                    onPress={() => Alert.alert('Simple Button pressed')}>
                                    Search
                              </Button>
                        </Content>
                  </Container>
            );
      }
}


const styles = StyleSheet.create({
      container: {
            flex: 1,
            width: '90%',
            backgroundColor: '#fff',
            marginLeft: 'auto',
            marginRight: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
      },
    });