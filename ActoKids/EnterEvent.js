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
  ScrollView,
  Button,
  Navigator,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Alert
} from 'react-native';
//import Filter from './filter';
import CheckBox from 'react-native-check-box';
import ModalDropdown from 'react-native-modal-dropdown';
//import DateTimePicker from 'react-native-modal-datetime-picker';

//import SearchBar from 'react-native-searchbar'; 

export default class EnterEvent extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      id: 1, isDateTimePickerVisible: false, ActivityName: '', date: new Date(), time: '', cost: '', description: '', street_address: '', city: '', state: '', country:'', zip_code:'', wheelchair_accessible: false,
      wheelchair_accessible_restroom: false, activity_type: '', disability_type: '', age_range : '', parent_participation: false, assistant: false, equipment_provided: '',
      sibling: false, kids_to_staff: '', asl: false, closed_circuit: false, add_charge: false, childcare: false, animals: false, phone: '', start_date: ''
    }

  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
  };

  toggleActivity(activity, index, checked) {
    if(checked) { 
       this.state.activity_type.append(activity)
    } else{
     this.setState({
       data: this.state.activity_type.filter((_, i) => i !== index)
     });
    }
  }

  toggleDisability(disability, index, checked) {
    if(checked) { 
       this.state.disability_type.append(disability)
    } else{
      this.setState({
        data: this.state.disability_type.filter((_, i) => i !== index)
      });
    }
  }

  onSubmitButtonPressed() {
    var body = JSON.stringify({
        a: this.state.ActivityName,
        b: this.state.date,
        c: this.state.time,
        d: this.state.cost,
        e: this.state.street_address,
        f: this.state.city,
        g: this.state.state,
        h: this.state.country, 
        i: this.state.zip_code,
        j: this.state.description,
        k: this.state.wheelchair_accessible,
        l: this.state.activity_type,
        m: this.state.disability_type,
        n: this.state.age_range,
        o: this.state.parent_participation,
        p: this.state.assistant,
        q: this.state.wheelchair_accessible_restroom,
        r: this.state.equipment_provided,
        s: this.state.sibling,
        t: this.state.kids_to_staff,
        u: this.state.asl,
        v: this.state.closed_circuit,
        w: this.state.add_charge,
        x: this.state.animals,
        y: this.state.childcare,
        z: this.state.phone});
    // Alert.alert(body);
    fetch('http://10.0.2.2:3000/api/activities/createNewActivity', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'},
        body: body
      })
      // .then( (res)=> res.json() )
      // .then( (resData) => {
      //   console.log("Response Body -> " + JSON.stringify(resData.body) );
      // } )
      .done();

      this._navigate()
  }

   _navigate (){
    this.props.navigator.push({title: 'Home Screen', index: 0})
  }
  _onBack () { 
    this.props.navigator.pop();
  }
  render() {
    return (
      <ScrollView>
       <TouchableHighlight onPress={ () => this._onBack() }>
          <Text> Back </Text>
       </TouchableHighlight>
        <Text style={styles.text}>
          Welcome to ActoKids!
        </Text>
        <Text>
          * required fields
        </Text>
        <Text style={styles.text}>
          *Activity Name:
        </Text>
        <TextInput
          style={{ height: 40, width: 200 }}
          placeholder="Activity name..."
          onChangeText={(ActivityName) => this.setState({ ActivityName })}
          />
        <Text style={styles.text}>
          *Activity Date: 
        </Text>
        <TextInput
          style={{ height: 40, width: 200 }}
          placeholder="yyyy-mm-dd"
          onChangeText={(date) => this.setState({ date })}
          />
        <Text style={styles.text}>
          *Time:
        </Text> 
        <TextInput
          style={{ height: 40, width: 200 }}
          placeholder="(hh.mm,hh.mm)"
          onChangeText={(time) => this.setState({ time })}
          />
        
        <Text style={styles.text}>
          *Cost:  $
        </Text> 
        <TextInput
          style={{ height: 40, width: 200 }}
          placeholder=""
          onChangeText={(cost) => this.setState({ cost })}
          />
        <Text style={styles.text}>
          *Location: 
        </Text> 
        <TextInput
          style={{ height: 40, width: 200 }}
          placeholder="Street address"
          onChangeText={(street_address) => this.setState({street_address })}
          />
          <TextInput
          style={{ height: 40, width: 200 }}
          placeholder="city"
          onChangeText={(city) => this.setState({ city })}
          />
          <TextInput
          style={{ height: 40, width: 200 }}
          placeholder="state"
          onChangeText={(state) => this.setState({ state })}
          />
          <TextInput
          style={{ height: 40, width: 200 }}
          placeholder="country"
          onChangeText={(country) => this.setState({ country })}
          />
          <TextInput
          style={{ height: 40, width: 200 }}
          placeholder="zip code"
          onChangeText={(zip_code) => this.setState({ zip_code })}
          />
        <Text style={styles.text}>
          *Description: 
        </Text> 
        <TextInput
          style={{ height: 40, width: 200 }}
          placeholder="description"
          onChangeText={(description) => this.setState({ description })}
          />
        <Text style={styles.text}>
          *Wheelchair Accessible: 
        </Text> 
        <ModalDropdown 
        textStyle ={styles.text}
          options={['Yes', 'No']}
          onSelect={(i,v) =>this.setState({wheelchair_accessible : v}) }
        />
        <Text style={styles.text}>
          *Wheelchair Accessible Restroom: 
        </Text>
        <ModalDropdown 
                textStyle ={styles.text}
          options={['Yes', 'No']}
          onSelect={(i,v) =>this.setState({wheelchair_accessible_restroom : v}) }
        />
        <Text style={styles.text}>
          *Activity Type: 
        </Text> 
       <ModalDropdown 
               textStyle ={styles.text}

          options={['Outdoors', 'Sports', 'Music', 'Zoo', 'Art', 'Camps', 'Museum', 'Other']}
          onSelect={(i,v) =>this.setState({activity_type : v}) }
        />
        <Text style={styles.text}>
          *Disability Type: 
        </Text> 
        <ModalDropdown 
                textStyle ={styles.text}

          options={['Cognitive', 'Mobility', 'Hearing', 'Vision', 'Sensory']}
          onSelect={(i,v) =>this.setState({activity_type : v}) }
        />
        <Text style={styles.text}>
          *Age range: 
        </Text> 
        <TextInput
          style={{ height: 40, width: 200 }}
          placeholder="[youngest,oldest]"
          onChangeText={(age_range) => this.setState({age_range })}
          />
        <Text style={styles.text}>
          *Parent participation required: 
        </Text> 
 <ModalDropdown 
         textStyle ={styles.text}
          options={['Yes', 'No']}
          onSelect={(i,v) =>this.setState({parent_participation : v}) }
        />
        <Text style={styles.text}>
          *Assistant Provided: 
        </Text>
 <ModalDropdown 
         textStyle ={styles.text}
          options={['Yes', 'No']}
          onSelect={(i,v) =>this.setState({assistant : v}) }
        />
        <Text style={styles.text}>
          *Phone number to call for accessibility questions:
        </Text>
        <TextInput
          style={{ height: 40, width: 200 }}
          placeholder="(xxx)xxx-xxxx"
          onChangeText={(phone) => this.setState({ phone })}
          />
        <Text style={styles.text}>
          Equipment provided: 
        </Text> 
        <TextInput
          style={{ height: 40, width: 200 }}
          placeholder="List all equipment provided by your organization"
          onChangeText={(equipment_provided) => this.setState({equipment_provided })}
          />
        <Text style={styles.text}>
          Sibling participation allowed: 
        </Text> 
 <ModalDropdown 
         textStyle ={styles.text}
          options={['Yes', 'No']}
          onSelect={(i,v) =>this.setState({sibling : v}) }
        />
        <Text style={styles.text}>
          Kids to staff ratio: 
        </Text> 
        <TextInput
          style={{ height: 40, width: 200 }}
          placeholder="e.g 1.5"
          onChangeText={(kids_to_staff) => this.setState({kids_to_staff })}
          />
        <Text style={styles.text}>
          ASL Interpreter available:  
        </Text> 
 <ModalDropdown 
                textStyle ={styles.text}
          options={['Yes', 'No']}
          onSelect={(i,v) =>this.setState({asl : v}) }
        />
        <Text style={styles.text}>
          Closed circuit hearing loop:
        </Text>
 <ModalDropdown 
         textStyle ={styles.text}
          options={['Yes', 'No']}
          onSelect={(i,v) =>this.setState({closed_circuit : v}) }
        />
        <Text style={styles.text}>
          Additional charge for personal care attendant:
        </Text>
 <ModalDropdown 
         textStyle ={styles.text}
          options={['Yes', 'No']}
          onSelect={(i,v) =>this.setState({add_charge : v}) }
        />
        <Text style={styles.text}>
          Can accomodate service animals:
        </Text> 
 <ModalDropdown 
         textStyle ={styles.text}
          options={['Yes', 'No']}
          onSelect={(i,v) =>this.setState({animals : v}) }
        />
        <Text style={styles.text}>
          Childcare onsite:  
        </Text>
 <ModalDropdown 
         textStyle ={styles.text}
          options={['Yes', 'No']}
          onSelect={(i,v) =>this.setState({childcare : v}) }
        />
        <Button
          onPress={ this.onSubmitButtonPressed.bind(this) }
          title="Submit"
          accessibilityLabel="Submit"
        />
      </ScrollView>

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
  text: { 
    fontSize: 20,
    color: 'purple',

  }
});


//AppRegistry.registerComponent('ActoKids', () => ActoKids);


/**<TouchableOpacity onPress={this._showDateTimePicker}>
          <Text>Select Start Time and Date</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={(date)=>{this.setState({start_date}); this._handleDatePicked}}
          onCancel={this._hideDateTimePicker}
          mode={'datetime'}
        /> */