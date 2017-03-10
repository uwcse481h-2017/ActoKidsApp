/**
 * Displays the available filters and allows the user to submit filters to filter 
 * events displayed
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

//brings user back to the search page with only events that match the filters applied
  _navigateSearch(info){
    this.props.navigator.push({title: 'Search Page', index: 2, 
    passProps : { data: info.data }
    })
  }

//finds the events that match the filters
 get_events() {
    var body_dic = {}
    if (typeof this.state.activity_types !== 'undefined')
        body_dic['activity_type'] = this.state.activity_types
    if (typeof this.state.disability_types !== 'undefined')
        body_dic['disability_type'] = this.state.disability_types
    if (typeof this.state.dateDate !== 'undefined')
        body_dic['date'] = this.state.dateDate.getFullYear() + '-' + (this.state.dateDate.getMonth()+1) + '-' + this.state.dateDate.getDate(); 
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
//converts 'yes'/'no' text to boolean values
   yesNo(v) { 
    if(v == 'Yes') { 
      return true;
    } else { 
      return false;
    }
  }
  //brings user back to search page
  _onBack () { 
    this.props.navigator.pop();
  }
//displays the page
  render() {
    return (   
    <View style={styles.outerApp}>  
      <View style={{ justifyContent: 'flex-start', flexDirection: 'row',}}>
         <Button 
           onPress={() => this._onBack()}
           title="Back"
           color="darkgray"
           accessibilityLabel="Back"
        />
        </View>
      <View style={styles.headerView} > 
        <Text style={styles.titleText}>
          Filter Events
        </Text>
      </View>
      <ScrollView style={styles.container}>
        <Text style ={{fontSize: 18, textAlign:'center', fontFamily: 'serif'}}>
            Fill in the following options and click 'submit' to find activities that match your needs
        </Text>
        <Text style={ styles.headerText }>
          Activity Type
        </Text>
        <ModalDropdown
          textStyle ={styles.itemText}
          renderRow = {(text)=><Text style={styles.itemText}> {text} </Text> }
          options={['Outdoors&Nature', 'Sports', 'Music', 'Zoo', 'Art', 'Camps', 'Museum', 'Others']}
          onSelect={(i,v) =>this.setState({activity_types : v}) }
        />
        <Text style={ styles.headerText }>
          Disability Type
        </Text>
        <ModalDropdown
          textStyle ={styles.itemText}
          renderRow = {(text)=><Text style={styles.itemText}> {text} </Text> }
          options={['Cognitive', 'Mobility', 'Hearing', 'Vision', 'Sensory']}
          onSelect={(i,v) =>this.setState({disability_types : v}) }
        />
        <Text style={ styles.headerText }>
          Date
        </Text>
        <TouchableHighlight
          onPress={this.showDatePicker.bind(this, 'date', {
              date: this.state.dateDate,
              minDate: new Date(),
          })}>
          <Text style={styles.itemText}>{this.state.dateText}</Text>
        </TouchableHighlight>
        <Text style={ styles.headerText }>
          Cost: $
        </Text>
        <TextInput
          keyboardType = 'numeric'
          style={styles.inputText}
          placeholder="e.g 15.00"
          onChangeText={(cost) => this.setState({ cost })}
        />
        <Text style={ styles.headerText }>
          Wheelchair Accessible
        </Text>
        <ModalDropdown 
          textStyle ={styles.itemText}
          renderRow = {(text)=><Text style={styles.itemText}> {text} </Text> }
          options={['Yes', 'No']}
          onSelect={(i,v) => this.setState({wheelchair_accessible : this.yesNo(v) }) } 
        />
        <Button
            onPress={ this.get_events.bind(this)} 
            color="purple" 
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
    backgroundColor: 'lightgray',
  },
   outerApp: {
    flex: 1,
    backgroundColor: 'green',
  },
  titleText:{
    flex: 2,
    fontSize: 32, 
    color:'white',
    fontFamily: 'serif',
    textAlign: 'center'

  },
  headerText: { 
    fontSize: 27,
    color: 'black',    
    fontFamily: 'serif',
  },
  itemText: { 
    color:'black',    
    fontFamily: 'serif',
    fontSize:22,
  },
  backButton: {
    flex:1,
    width:75,
    fontSize: 20,
    fontFamily: 'serif',
    color:'white'
  },
  inputText: { 
    height: 40, 
    width: 200, 
    fontFamily: 'serif',
    fontSize: 18,
  }, 
  headerView: {         
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: "center",
}, 

});

