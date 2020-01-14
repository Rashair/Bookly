import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { Container, Header, Content, DatePicker, Text, Picker } from 'native-base'
import { Headline, Subheading, Title, Button, Paragraph, TextInput, HelperText } from 'react-native-paper';
import React from 'react'
import { sendRequest } from '../../helpers/functions';
import { API_URL } from '../../helpers/constants';
import { ScrollView } from 'react-native-gesture-handler';

export default class ReservationFormScreen extends React.Component
{
    static navigationOptions = { title: 'Make reservation',};
    constructor(props)
    {
        super(props)
        const { navigation } = this.props;
        this.flat = navigation.getParam('flat')
        this.state = 
        {
            firstName: "",
            lastName: "",
            email: "",
            dateFrom: null,
            dateTo: null,
            firstNameValid: true,
            lastNameValid: true,
            emailValid: true,
            dateToValid: true
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
                return "Ending date must be later or equal to beginning date"
        }
    }
    render()
    {
        return(
                <KeyboardAvoidingView 
                    behavior="padding"
                    style={styles.container}>
                    <ScrollView contentContainerStyle={styles.inner}>
                        <Title>First name</Title>
                        <TextInput
                            mode="outlined"
                            theme={{ colors: { primary: this.state.firstNameValid ? '#3579e6' : 'red',underlineColor:'transparent',}}}
                            style={{backgroundColor: 'white'}}
                            onChangeText={text => this.setFirstName(text)}
                            value={this.state.firstName}/>
                        <HelperText
                            style={styles.helper}
                            type="error"
                            visible={!this.state.firstNameValid} >
                            {this.errorMessage('FirstName')}
                        </HelperText>

                        <Title>Last name</Title>
                        <TextInput
                            mode="outlined"
                            theme={{ colors: { primary: this.state.lastNameValid ? '#3579e6' : 'red',underlineColor:'transparent',}}}
                            style={{backgroundColor: 'white'}}
                            onChangeText={text => this.setLastName(text)}
                            value={this.state.lastName}/>
                        <HelperText
                            style={styles.helper}
                            type="error"
                            visible={!this.state.lastNameValid} >
                            {this.errorMessage('LastName')}
                        </HelperText>

                        <Title>Email</Title>
                        <TextInput
                            mode="outlined"
                            theme={{ colors: { primary: this.state.emailValid ? '#3579e6' : 'red',underlineColor:'transparent',}}}
                            style={{backgroundColor: 'white'}}
                            onChangeText={text => this.setEmail(text)}
                            value={this.state.email}/>
                        <HelperText
                            style={styles.helper}
                            type="error"
                            visible={!this.state.emailValid} >
                            {this.errorMessage('Email')}
                        </HelperText>

                        <View style={{flex: 1, justifyContent: 'flex-end'}}>
                            <Button
                                    style={styles.button}
                                    color='#3579e6'
                                    mode="contained"
                                    disabled={
                                        this.state.firstName & this.state.lastName & this.state.email & this.state.dateTo &
                                        this.state.firstNameValid & this.state.lastNameValid & this.state.emailValid & this.state.dateToValid}>
                                    Make reservation
                            </Button>
                        </View>
                    </ScrollView>

                    
                </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
          flex: 1,
          backgroundColor: '#fff',
    },
    inner: {
        padding: 20,
        flex: 1,
        justifyContent: "flex-end",
    },
    button:{
        height: 54,
        justifyContent: "center",
    },
    helper:{
            color: 'red'
    }
  });