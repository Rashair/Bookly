
import { StyleSheet, Text, View, Button, ScrollView, Image, TouchableHighlight, Modal } from 'react-native';

export default class MyReservationCarDetails extends React.Component {
   
    constructor(props){
        super(props);
        this.cancelReservation = bind(this.cancelReservation);
        this.setModalVisible = bind(this.setModalVisible);

        this.state ={
          modalVisible : false
        }
    }
    setModalVisible(value){
      this.setState({modalVisible : value});
    }

    cancelReservation(){
      this.setState({modalVisible : false});
    }

    render() {
      return (
        <View>
           <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={{marginTop: 22}}>
              <View>
                <Text>Do you want to cancel that reservation?</Text>

                <TouchableHighlight
                  onPress={() => {
                    this.cancelReservation();
                  }}>
                  <Text>Yes</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(false);
                  }}>
                  <Text>No</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>


            <Text>{this.props.getParam('Car', 'No car selected').Model}</Text> {/*just to test passing params */}
            <TouchableHighlight onPress={() => {this.setModalVisible(true)}} >
              <Text>Cancel reservation</Text>
            </TouchableHighlight>
            <Button title="Go back" onPress={() => this.props.navigation.goBack()} />
        </View>
      );
    }
  }