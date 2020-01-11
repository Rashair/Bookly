import { StyleSheet, TextInput, View, Button } from 'react-native'
import { Container, Header, Content, DatePicker, Text, Picker } from 'native-base'
import React from 'react'
import { AuthSession } from 'expo'

export default class SearchFlatScreen extends React.Component
{
      static navigationOptions = { title: 'Search accommodation',};
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
                  cityValid: cityPattern.test(this.state.city) && this.state.city.length >= 3 ? true : false
            })
      }
      setBeds(beds)
      {
            this.setState({
                  beds: beds,
                  bedsValid: this.state.beds ? true : false
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
      errorMessage(field)
      {
            switch(field)
            {
                  case 'City':
                        return <Text>City name incorrect</Text>
                  case 'DateTo':
                        return <Text>Date to must be later than date from</Text>
                  case 'Beds':
                        return <Text>Beds number cannot be null</Text>
            }
      }
      render()
      {
            return(
                  <Container>
                        <Content>
                              <Text>Find place to sleep</Text>
                              <TextInput
                                    placeholder='City'
                                    onChangeText={text => this.setCity(text)}
                                    value={this.state.city}/>
                              {!this.state.cityValid && this.errorMessage('City')}
                              <DatePicker
                                    value={this.state.dateFrom}
                                    minimumDate={new Date()}
                                    onDateChange={(date) => this.setDateFrom(date)}/>
                              <DatePicker
                                    value={this.state.dateTo}
                                    minimumDate={new Date()}
                                    onDateChange={(date) => this.setDateTo(date)}/>
                              {!this.state.dateToValid && this.errorMessage('DateTo')}
                              <Picker
                                    selectedValue={this.state.beds}
                                    mode="dialog"
                                    prompt="Choose beds number"
                                    onValueChange={(beds) => this.setBeds(beds)}>
                                          {this.createNumberList(6)}
                              </Picker>
                              {!this.state.bedsValid && this.errorMessage('Beds')}
                              <Button
                                    title="Search"
                                    disabled={!(this.state.cityValid && this.state.dateTo && this.state.bedsValid)}
                                    onPress={() => Alert.alert('Simple Button pressed')}/>
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