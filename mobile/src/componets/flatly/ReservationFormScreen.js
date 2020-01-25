import { StyleSheet, View, TouchableOpacity } from 'react-native'
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
import { Types } from "../../helpers/constants";

class ReservationFormScreen extends React.Component
{
    static navigationOptions = { title: 'Make reservation'};
    constructor(props)
    {
        super(props)
        const { navigation } = this.props
        //const { dates } = navigation.getParam('dates')
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
            // dateFrom: dates.from,
            // dateTo: dates.to,
            people: 1,
            firstNameValid: true,
            lastNameValid: true,
            emailValid: true,
            dateToValid: true,
            showDateFromPicker: false,
            showDateToPicker: false,
            isFetching: false
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
            return ((this.state.dateTo.getTime() - this.state.dateFrom.getTime()) / (1000 * 3600 * 24) * this.flat.price)
        }
    }
    // makeReservation()
    // {
    //     const data =
    //     {
    //         startDate: this.state.dateFrom,
    //         endDate: this.state.endTo,
    //         offerId: this.flat.id,
    //         type: Types.FLATLY
    //     };
    //     const booking = 
    //     {
    //         flat: this.flat,
    //         date:
    //         {
    //             from: this.state.dateFrom,
    //             to: this.state.dateTo
    //         }
    //     }
    //     //TODO FlatlyReservation instead of BooklyReservation
    //     this.props.makeBooklyReservation(data, this.props.auth)
    //         .then(this.props.navigation.navigate('FlatSummary', {booking: booking}))
    // }
    makeReservation()
    {
        const { firstName, lastName, email, dateFrom, dateTo } = this.state;
        const flat = this.flat;

        this.setState({ isFetching: true });
        const url = `${FLATLY_API_URL}/flat/${flat.id}`; // reservations/`;
        const ownerId = this.props.auth.id;
        const totalCost = this.countTotalPrice();
        const data = {
            name: firstName,
            lastName: lastName,
            email: email,
            dateFrom: dateFrom.toISOString(),
            dateTo: dateTo.toISOString(),
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
                const summaryData = { flat, totalCost: data.totalCost, dateFrom, dateTo, firstName, lastName, email };
                this.props.navigation.navigate("FlatSummary", { summaryData });
            } 
            else {
                throw new Error(`Error sending data to bookly, status code: ${booklyResponse.status}`);
            }
            this.setState({ isFetching: false });
        })
        .catch(error => {
            this.props.anyError(error);
        });
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
                            <Title style={styles.textToRight}>{this.countTotalPrice().toString() + " PLN"}</Title>
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
    };
};

const mapDispatchToProps = dispatch => ({
    anyError: data => dispatch(anyError(data)),
    makeFlatlyReservation: data => dispatch(makeFlatlyReservation(data,auth)),
    makeBooklyReservation: data => dispatch(makeBooklyReservation(data,auth))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReservationFormScreen);