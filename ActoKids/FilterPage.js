/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  ListView,
  Button,
  Navigator,
  ScrollView,
  TouchableHighlight,
  View,
  DatePickerAndroid
} from 'react-native';
//import Filter from './filter';
import CheckBox from 'react-native-check-box';
import ModalDropdown from 'react-native-modal-dropdown'

export default class FilterPage extends Component {
    constructor(props) {
    super(props);
    this.state= { activity_types: undefined, 
      disability_types: undefined,
      dateDate: undefined,
      dateText: 'Select Date...',
      cost: undefined,
      wheelchair_accessible: undefined
      }
  }

  showDatePicker = async (stateKey, options) => {
    try {
      var newState = {};
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      if (action === DatePickerAndroid.dismissedAction) {
        newState[stateKey + 'Text'] = 'Not selected';
      } else {
        var date = new Date(year, month, day);
        newState[stateKey + 'Text'] = date.toLocaleDateString();
        newState[stateKey + 'Date'] = date;
      }
      this.setState(newState);
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  };

  _navigateSearch(info){
    this.props.navigator.push({title: 'Search Page', index: 2, 
    passProps : { data: info.data }
    })
  }

 get_events() {
    var body_dic = {}
    if (typeof this.state.activity_types !== 'undefined')
        body_dic['activity_type'] = this.state.activity_types
    if (typeof this.state.disability_types !== 'undefined')
        body_dic['disability_type'] = this.state.disability_types
    if (typeof this.state.dateDate !== 'undefined')
        body_dic['date'] = this.state.dateDate.getFullYear() + '-' + this.state.dateDate.getMonth() + '-' + this.state.dateDate.getDate(); 
    if (typeof this.state.cost !== 'undefined')
        body_dic['cost'] = this.state.cost
    if (typeof this.state.wheelchair_accessible !== 'undefined')
        body_dic['wheelchair_accessible'] = this.state.wheelchair_accessible
    var body = JSON.stringify(body_dic);

    fetch('http://10.0.2.2:3000/api/activities/findFilteredActivities', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'},
        body: body
      })
       .then( (res)=> res.json() )
       .then( (resData) => { 
          this._navigateSearch(resData); }) 
      //   console.log("Response Body -> " + JSON.stringify(resData.body) );
      // } )
      .done();
  }

   yesNo(v) { 
    if(v == 'Yes') { 
      return true;
    } else { 
      return false;
    }
  }
  
  _onBack () { 
    this.props.navigator.pop();
  }

  render() {
    return (   
      <View>  
      <ScrollView>
      <TouchableHighlight onPress={ () => this._onBack() }>
          <Text> Back </Text>
       </TouchableHighlight>
        <Text style={styles.header}>
          Welcome to ActoKids!
        </Text>
        <Text style={ styles.header }>
          Activity Types
        </Text>

        <ModalDropdown
          options={['Outdoors', 'Sports', 'Music', 'Zoo', 'Art', 'Camps', 'Museum', 'Other']}
          onSelect={(i,v) =>this.setState({activity_types : v}) }
        />

        <Text style={ styles.header }>
          Disability Types
        </Text>
        <ModalDropdown
          options={['Cognitive', 'Mobility', 'Hearing', 'Vision', 'Sensory']}
          onSelect={(i,v) =>this.setState({disability_types : v}) }
        />
        
        <Text style={ styles.header }>
          Date
        </Text>

        <TouchableHighlight
          onPress={this.showDatePicker.bind(this, 'date', {
              date: this.state.dateDate,
              minDate: new Date(),
          })}>
          <Text>{this.state.dateText}</Text>
        </TouchableHighlight>


        <Text style={ styles.header }>
          Cost: $
        </Text>

        <TextInput
          style={{ height: 40, width: 200 }}
          placeholder="e.g 15.00"
          onChangeText={(cost) => this.setState({ cost })}
        />

        <Text style={ styles.header }>
          Wheelchair_accessible
        </Text>

        <ModalDropdown 
          options={['Yes', 'No']}
          onSelect={(i,v) => this.setState({wheelchair_accessible : this.yesNo(v) }) } 
        />

        <Button
            onPress={ this.get_events.bind(this)}  
            title="Submit"
            accessibilityLabel="Submit"
         />
       </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: { 
    fontSize: 20,
    color: 'purple',
  }
});



//AppRegistry.registerComponent('ActoKids', () => ActoKids);
