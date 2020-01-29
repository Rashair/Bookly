import { StyleSheet, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Container, Header, Content, Text, Picker, Right } from 'native-base'
import { Title, Button, Chip, Paragraph, TextInput, HelperText } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import React from 'react'
import { connect } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LocalDate, DateTimeFormatter, nativeJs } from "@js-joda/core";
import { styles, themeColors} from '../../styles';
import { anyError } from "../../redux/actions";
import { makeBooklyReservation, makeFlatlyReservation} from "../../redux/thunk-functions";
import { FLATLY_API_URL, API_URL, TOKEN_HEADER_KEY } from "../../helpers/constants"
import { sendRequest } from "../../helpers/functions"


class ReservationFormScreen extends React.Component
{
    static navigationOptions = { title: 'Make reservation'};
    constructor(props)
    {
        super(props)
        const { navigation } = this.props
        //const { dates } = navigation.getParam('dates')
        this.flat = navigation.getParam('flat')
        // const tomorrowDate = new Date()
        // tomorrowDate.setDate(tomorrowDate.getDate() + 1)
        this.state = 
        {
            firstName: this.props.auth.firstName,
            lastName: this.props.auth.lastName,
            email: this.props.auth.email,
            dateFrom: this.props.dates.from,
            dateTo: this.props.dates.to,
            // dateFrom: dates.from,
            // dateTo: dates.to,
            people: this.props.people,
            // firstName: this.props.firstName,
            // lastName: this.props.lastName,
            // email: this.props.email,
            // people: this.props.people,
            firstNameValid: true,
            lastNameValid: true,
            emailValid: true,
            dateToValid: true,
            showDateFromPicker: false,
            showDateToPicker: false,
            isFetching: false
        }

        this.setFirstName = this.setFirstName.bind(this)
        this.setLastName = this.setLastName.bind(this)
        this.setPeople = this.setPeople.bind(this)
        this.setEmail = this.setEmail.bind(this)
        this.setDateFrom = this.setDateFrom.bind(this)
        this.setDateTo = this.setDateTo.bind(this)
        this.countTotalPrice = this.countTotalPrice.bind(this)
        this.makeReservation = this.makeReservation.bind(this)
    }
    setFirstName(firstName)
    {
        const namePattern = /^[A-ZĆŁÓŚŹŻa-ząćęłńóśźż]+$/
        this.setState({
            firstName: firstName,
            firstNameValid: namePattern.test(firstName)
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
                dateToValid: date ? (oldState.dateTo && this.datesDifferenceInDays(date, oldState.dateTo) > 0 ? true : false) : oldState.dateToValid
        }))
    }
    setDateTo(date)
    {
        this.setState(oldState => ({
                showDateToPicker: false,
                dateTo: date ? date : oldState.dateTo,
                dateToValid: date ? (oldState.dateFrom && this.datesDifferenceInDays(oldState.dateFrom, date) > 0 ? true : false) : oldState.dateToValid
        }))
    }
    setPeople(people)
    {
        this.setState({
            people: people
        })
    }
    datesDifferenceInDays(dateA, dateB)
    {
        const day = 1000 * 3600 * 24;
        return Math.ceil(dateB/day) - Math.ceil(dateA/day)
    }
    countTotalPrice()
    {
        const { dateFrom, dateTo, dateToValid } = this.state;
        if(dateFrom && dateTo && dateToValid)
        {
            return this.datesDifferenceInDays(dateFrom, dateTo) * this.flat.price
        }
        return null
    }
    printTotalCost()
    {
        const totalCost = this.countTotalPrice()
        if(totalCost)
        {
            return totalCost.toString() + " PLN"
        }
        return "--- PLN"
    }

    makeReservation()
    {
        const { firstName, lastName, email, dateFrom, dateTo, people } = this.state;
        const flat = this.flat;

        this.setState({ isFetching: true });
        const url = `${FLATLY_API_URL}/flats`; // reservations/`;
        const ownerId = this.props.auth.id;
        //const ownerId = 2;
        const totalCost = this.countTotalPrice();
        const data = {
            name: firstName,
            lastName: lastName,
            email: email,
            dateFrom: dateFrom.toISOString(),
            dateTo: dateTo.toISOString(),
            people: people
        };
        const headers = {}; // Auth headers here
        sendRequest(url, "POST", headers, data)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(`Error sending data to flatly, status code: ${response.status}`);
        })
        .then(responseJson => {
            const externalBookingId = responseJson.id;
            const bookingData = {
                owner: {
                    id: ownerId,
                },
                start_date_time: dateFrom.toISOString(),
                end_date_time: dateTo.toISOString(),
                type: "FLAT",
                external_id: externalBookingId,
            };
            const bookingUrl = `${API_URL}/booking/`;
            return sendRequest(bookingUrl, "POST", { [TOKEN_HEADER_KEY]: this.props.auth.securityToken }, bookingData);
        })
        .then(booklyResponse => {
            if (booklyResponse.ok) {
                const summaryData = { flat, totalCost, dateFrom, dateTo, firstName, lastName, email };
                this.props.navigation.navigate("FlatSummary", { summaryData });
            } 
            else {
                throw new Error(`Error sending data to bookly, status code: ${booklyResponse.status}`);
            }
            this.setState({ isFetching: false });
        })
        .catch(error => {
            this.setState({ isFetching: false });
            this.props.anyError(error);
        });

        //only for booking
        // const externalBookingId = 1;
        // const bookingData = {
        //     owner: {
        //         id: ownerId
        //     },
        //     start_date_time: dateFrom.toISOString(),
        //     end_date_time: dateTo.toISOString(),
        //     type: "FLAT",
        //     external_id: externalBookingId
        // };
        // console.log(JSON.stringify(bookingData))
        // const bookingUrl = `${API_URL}/booking/`;
        // //const securityToken = this.props.auth.securityToken;
        // const securityToken = "d4c1efaa-e137-4255-95ae-513d9fb931ea";
        // sendRequest(bookingUrl, "POST", { [TOKEN_HEADER_KEY]: securityToken }, bookingData)
        // .then(booklyResponse => {
        //     console.log("Response: " + booklyResponse.status.toString())
        //     if (booklyResponse.ok) {
        //         const summaryData = { flat, totalCost, dateFrom, dateTo, firstName, lastName, email };
        //         this.props.navigation.navigate("FlatSummary", { summaryData });
        //     } 
        //     else {
        //         throw new Error(`Error sending data to bookly, status code: ${booklyResponse.status}`);
        //     }
        //     this.setState({ isFetching: false });
        // })
        // .catch(error => {
        //     console.log(error)
        //     this.props.anyError(error);
        // });

        //only for mockserver
        // const summaryData = { flat, totalCost, dateFrom, dateTo, firstName, lastName, email };
        // this.props.navigation.navigate("FlatSummary", { summaryData });
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
                            <Title style={styles.textToRight}>{ this.printTotalCost()}</Title>
                        </View>
                        {this.state.isFetching ? <ActivityIndicator size="large" color={themeColors.primary}/> :
                        <Button
                                style={styles.button}
                                color={themeColors.primary}
                                mode="contained"
                                onPress={this.makeReservation}
                                disabled={
                                    !(this.state.firstName && this.state.lastName && this.state.email &&
                                    this.state.firstNameValid && this.state.lastNameValid && this.state.emailValid && this.state.dateToValid)}>
                                Make reservation
                        </Button>}
                    </View>
                </ScrollView>
            </Container>
        )
    }
}

const mapStateToProps = (state /* , ownProps */) => {
    return {
        auth: state.auth,
        dates: state.dates,
        people: state.people
    };
};

const mapDispatchToProps = dispatch => ({
    anyError: data => dispatch(anyError(data)),
    makeFlatlyReservation: data => dispatch(makeFlatlyReservation(data,auth)),
    makeBooklyReservation: data => dispatch(makeBooklyReservation(data,auth))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReservationFormScreen);