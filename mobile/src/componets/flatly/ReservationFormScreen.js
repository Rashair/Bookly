import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Container, Header, Content, Text, Picker, Right } from 'native-base'
import { Title, Button, Chip, Paragraph, TextInput, HelperText } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import React from 'react'
import { sendRequest } from '../../helpers/functions';
import { API_URL } from '../../helpers/constants';
import DateTimePicker from "@react-native-community/datetimepicker";
import { LocalDate, DateTimeFormatter, nativeJs } from "@js-joda/core";
import { styles, themeColors} from '../../styles'

export default class ReservationFormScreen extends React.Component
{
    static navigationOptions = { title: 'Make reservation',};
    constructor(props)
    {
        super(props)
        const { navigation } = this.props;
        this.flat = navigation.getParam('flat')
        const tomorrowDate = new Date()
        tomorrowDate.setDate(tomorrowDate.getDate() + 1)
        this.state = 
        {
            firstName: "",
            lastName: "",
            email: "",
            dateFrom: new Date(),
            dateTo: tomorrowDate,
            people: 1,
            firstNameValid: true,
            lastNameValid: true,
            emailValid: true,
            dateToValid: true,
            showDateFromPicker: false,
            showDateToPicker: false
        }
    }
    setFirstName(name)
    {
        const namePattern = /^[A-ZĆŁÓŚŹŻa-ząćęłńóśźż]+$/
        this.setState({
            firstName: name,
            firstNameValid: namePattern.test(name)
        })
    }
    setLastName(lastName)
    {
        const lastNamePattern = /^[A-ZĆŁÓŚŹŻa-ząćęłńóśźż]+$/
        this.setState({
            lastName: lastName,
            lastNameValid: lastNamePattern.test(lastName)
        })
    }
    setEmail(email)
    {
        const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        this.setState({
            email: email,
            emailValid: emailPattern.test(email)
        })
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
    setPeople(people)
    {
        this.setState({
            people: people
        })
    }
    countTotalPrice()
    {
        if(this.state.dateFrom && this.state.dateTo && this.state.dateToValid)
        {
            return ((this.state.dateTo.getDate() - this.state.dateFrom.getDate()) * this.flat.price).toString() + " PLN"
        }
        return "--- PLN"
    }
    createChip(i)
    {
        return(
                <Chip 
                    mode="outlined" 
                    selected={this.state.people === i ? true : false}
                    onPress={() => this.setPeople(i)}>
                    {i.toString()}
                </Chip>
        )
    }
    errorMessage(field)
    {
        switch(field)
        {
            case 'FirstName':
                return "First name cannot be empty and may contain only letters"
            case 'LastName':
                return "Last name cannot be empty and may contain only letters"
            case 'Email':
                return "Email address is incorrect"
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
            <Container>
                <ScrollView contentContainerStyle={styles.container}>
                    <Text>First name</Text>
                    <TextInput
                        mode="flat"
                        theme={{ colors: { primary: this.state.firstNameValid ? themeColors.primary : themeColors.danger, underlineColor:'transparent',}}}
                        style={styles.input}
                        onChangeText={text => this.setFirstName(text)}
                        value={this.state.firstName}/>
                    {!this.state.firstNameValid &&
                        <HelperText
                            style={styles.helper}
                            type="error">
                            {this.errorMessage('FirstName')}
                        </HelperText>}

                    <Text>Last name</Text>
                    <TextInput
                        mode="flat"
                        theme={{ colors: { primary: this.state.lastNameValid ? themeColors.primary : themeColors.danger, underlineColor:'transparent',}}}
                        style={styles.input}
                        onChangeText={text => this.setLastName(text)}
                        value={this.state.lastName}/>
                    {!this.state.lastNameValid &&
                        <HelperText
                            style={styles.helper}
                            type="error">
                            {this.errorMessage('LastName')}
                        </HelperText>}
                    
                    <Text>E-mail</Text>
                    <TextInput
                        mode="flat"
                        theme={{ colors: { primary: this.state.emailValid ? themeColors.primary : themeColors.danger, underlineColor:'transparent',}}}
                        style={styles.input}
                        onChangeText={text => this.setEmail(text)}
                        value={this.state.email}/>
                    {!this.state.emailValid &&
                        <HelperText
                            style={styles.helper}
                            type="error">
                            {this.errorMessage('Email')}
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
                                theme={{ colors: { primary: this.state.dateToValid ? themeColors.primary : themeColors.danger,underlineColor:'transparent',}}}/>
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
                    
                    {!this.state.dateToValid && <HelperText
                        style={styles.helper}
                        type="error">
                        {this.errorMessage('DateTo')}
                    </HelperText>}

                    <Text style={styles.marginBottomSmall}>People</Text>
                    <View style={[styles.contentRow, styles.marginBottomSmall]}>
                        {this.createChip(1)}
                        {this.createChip(2)}
                        {this.createChip(3)}
                        {this.createChip(4)}
                        {this.createChip(5)}
                        {this.createChip(6)}
                    </View>

                    <View style={[styles.contentToEnd, styles.marginTopBig]}>
                        <View style={[{alignSelf: 'flex-end'}, styles.marginBottomSmall]}>
                            <Text style={styles.textToRight}>Total price</Text>
                            <Title style={styles.textToRight}>{this.countTotalPrice()}</Title>
                        </View>
                        <Button
                                style={styles.button}
                                color={themeColors.primary}
                                mode="contained"
                                disabled={
                                    this.state.firstName & this.state.lastName & this.state.email & this.state.dateTo &
                                    this.state.firstNameValid & this.state.lastNameValid & this.state.emailValid & this.state.dateToValid}>
                                Make reservation
                        </Button>
                    </View>
                </ScrollView>
            </Container>
        )
    }
}

// const styles = StyleSheet.create({
//     container: {
//           flex: 1,
//           backgroundColor: '#fff',
//     },
//     textInput: {
//         backgroundColor: '#fff',
//         padding: 0
//     },
//     inner: {
//         padding: 10,
//         flex: 1
//     },
//     button:{
//         height: 54,
//         justifyContent: "center",
//     },
//     helper:{
//             color: 'red'
//     }
//   });