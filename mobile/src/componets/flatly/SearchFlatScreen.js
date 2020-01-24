import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Container, Header, Content, Text, Picker } from 'native-base'
import { TextInput, HelperText, Title, Chip, Button } from 'react-native-paper';
import React from 'react'
import { sendRequest } from '../../helpers/functions';
import { API_URL } from '../../helpers/constants';
import DateTimePicker from "@react-native-community/datetimepicker";
import { LocalDate, DateTimeFormatter, nativeJs } from "@js-joda/core";
import { styles, themeColors} from '../../styles'

export default class SearchFlatScreen extends React.Component
{
      static navigationOptions = { title: 'Find accommodation',};
      constructor(props)
      {
            super(props)
            
            this.setDateFrom = this.setDateFrom.bind(this)
            this.setDateTo = this.setDateTo.bind(this)
            this.setCity = this.setCity.bind(this)
            this.setBeds = this.setBeds.bind(this)

            const tomorrowDate = new Date()
            tomorrowDate.setDate(tomorrowDate.getDate() + 1)

            this.state = 
            {
                  city: "",
                  dateFrom: new Date(),
                  dateTo: tomorrowDate,
                  beds: 1,
                  cityValid: true,
                  dateToValid: true,
                  showDateFromPicker: false,
                  showDateToPicker: false
            }
      }
      setDateFrom(date)
      {
            this.setState(oldState => ({
                  showDateFromPicker: false,
                  dateFrom: date ? date : oldState.dateFrom,
                  dateToValid: date ? (oldState.dateTo && date < oldState.dateTo ? true : false) : oldState.dateToValid
            }))
      }
      setDateTo(date)
      {
            this.setState(oldState => ({
                  showDateToPicker: false,
                  dateTo: date ? date : oldState.dateTo,
                  dateToValid: date ? (oldState.dateFrom && oldState.dateFrom < date ? true : false) : oldState.dateToValid
            }))
      }
      setCity(city)
      {
            const cityPattern = /^[A-ZĆŁÓŚŹŻa-ząćęłńóśźż]*$/
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
                        return "Ending date must be later than beginning date"
            }
      }
      render()
      {
            const { showDateFromPicker, dateFrom, showDateToPicker, dateTo } = this.state;
            const dateFromFormatted = LocalDate.from(nativeJs(dateFrom)).format(DateTimeFormatter.ofPattern("d/MM/yyyy"));
            const dateToFormatted = LocalDate.from(nativeJs(dateTo)).format(DateTimeFormatter.ofPattern("d/MM/yyyy"));
            return(
                  <Container style={styles.container}>
                              <Text>City</Text>
                              <TextInput
                                    mode="flat"
                                    theme={{ colors: { primary: this.state.cityValid ? '#3579e6' : 'red',underlineColor:'transparent',}}}
                                    style={styles.input}
                                    onChangeText={text => this.setCity(text)}
                                    value={this.state.city}/>
                              {!this.state.cityValid &&
                                    <HelperText
                                    style={styles.helper}
                                    type="error" >
                                    {this.errorMessage('City')}
                              </HelperText>}
                              <View>
                                    <Text>From</Text>
                                    <TouchableOpacity onPress={() => this.setState({ showDateFromPicker: true })}>
                                    <TextInput 
                                          editable={false}
                                          mode="flat" 
                                          value={dateFromFormatted}
                                          style={styles.input} />
                                    {showDateFromPicker && (
                                          <DateTimePicker
                                          minimumDate={new Date()}
                                          value={dateFrom}
                                          mode="date"
                                          display="calendar"
                                          onChange={(event,date) => this.setDateFrom(date)}
                                          />
                                    )}
                                    </TouchableOpacity>
                              </View>
                              <View>
                                    <Text>To</Text>
                                    <TouchableOpacity onPress={() => this.setState({ showDateToPicker: true })}>
                                    <TextInput 
                                          editable={false}
                                          mode="flat" 
                                          value={dateToFormatted} 
                                          style={styles.input}
                                          theme={{ colors: { primary: this.state.dateToValid ? '#3579e6' : 'red',underlineColor:'transparent',}}}/>
                                    {showDateToPicker && (
                                          <DateTimePicker
                                          minimumDate={new Date()}
                                          value={dateTo}
                                          mode="date"
                                          display="calendar"
                                          onChange={(event,date) => this.setDateTo(date)}
                                          />
                                    )}
                                    </TouchableOpacity>
                              </View>
                              <HelperText
                                    style={styles.helper}
                                    type="error"
                                    visible={!this.state.dateToValid} >
                                    {this.errorMessage('DateTo')}
                              </HelperText>
                              <Text style={styles.marginBottomSmall}>People</Text>
                              <View style={styles.contentRow}>
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
                                          color={themeColors.primary}
                                          mode="contained"
                                          disabled={!(this.state.city && this.state.dateTo && this.state.cityValid && this.state.dateToValid)}
                                          onPress={() => this.search()}>
                                          Search
                                    </Button>
                              </View>
                  </Container>
            );
      }
}