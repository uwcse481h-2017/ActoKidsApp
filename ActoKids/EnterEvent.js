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
  View
} from 'react-native';
//import Filter from './filter';
import CheckBox from 'react-native-check-box';

//import SearchBar from 'react-native-searchbar'; 

export default class EnterEvent extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      id: 1, ActivityName: '', date: '', frequency: '', time: '', cost: '', description: '', street_address: '', city: '', state: '', country:'', zip_code:'', wheelchair_accessible: false,
      wheelchair_accessible_restroom: false, activity_type: [], disability_type: [], age_range : '', parent_participation: false, assistant: false, equipment_provided: '',
      sibling: false, kids_to_staff: '', asl: false, closed_circuit: false, add_charge: false, childcare: false, animals: false
    }

  }

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
        activity_name: this.state.ActivityName,
        dates: this.state.date,
        time_of_day: this.state.time,
        cost: this.state.cost,
        street_name: this.state.street_address,
        city: this.state.city,
        state: this.state.state,
        country: this.state.country, 
        zip_code: this.state.zip_code,
        descriptions: this.state.description,
        wheelchair_accessible: this.state.wheelchair_accessible,
        activity_type: this.state.activity_type,
        disability_type: this.state.disability_type,
        age_range: this.state.age_range,
        parent_participation_required: this.state.parent_participation,
        assistant_provided: this.state.assistant,
        disability_restrooms_available: this.state.wheelchair_accessible_restroom,
        equipment_provided: this.state.equipment_provided,
        sibling_participation: this.state.sibling,
        kids_to_staff_ratio: this.state.kids_to_staff,
        asl_interpreter_available: this.state.asl,
        closed_circuit_heering_loop_available: this.state.closed_circuit,
        additional_charge: this.state.add_charge,
        accomodate_service_animals: this.state.animals,
        onsite_childcare: this.state.chldcare})
    fetch('http://10.0.2.2:3000/api/activities/createNewActivity', {
        method: "POST",
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

  render() {
    return (
      <ScrollView>
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
          *Frequency: 
        </Text>
         <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => this.setState({frequency : 'one-time'})}
          isChecked={false}
          leftText={'One-time'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => this.setState({frequency : 'recurring'})}
          isChecked={false}
          leftText={'Recurring'}
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
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => this.setState({wheelchair_accessible : !checked}) }
          isChecked={false}
          leftText={''}
        />
        <Text style={styles.text}>
          *Wheelchair Accessible Restroom: 
        </Text>
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => this.setState({wheelchair_accessible_restroom : !checked}) }
          isChecked={false}
          leftText={''}       
        />
        <Text style={styles.text}>
          *Activity Type: 
        </Text> 
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.toggleActivity('outdoors', this.state.activity_type.indexOf('outdoors'), checked));  }}
          isChecked={false}
          leftText={'Outdoors & Nature'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.toggleActivity('sports', this.state.activity_type.indexOf('sports'), checked));  }}
          isChecked={false}
          leftText={'Sports'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.toggleActivity('music', this.state.activity_type.indexOf('music'), checked));  }}
          isChecked={false}
          leftText={'Music'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.toggleActivity('zoo', this.state.activity_type.indexOf('zoo'), checked));  }}
          isChecked={false}
          leftText={'Zoo'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.toggleActivity('art', this.state.activity_type.indexOf('art'), checked));  }}
          isChecked={false}
          leftText={'Art'}
        />
         <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.toggleActivity('camps', this.state.activity_type.indexOf('camps'), checked));  }}
          isChecked={false}
          leftText={'Camps'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.toggleActivity('museum', this.state.activity_type.indexOf('museum'), checked));  }}
          isChecked={false}
          leftText={'Museum'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.toggleActivity('other', this.state.activity_type.indexOf('other'), checked));  }}
          isChecked={false}
          leftText={'Other'}
        />
        <Text style={styles.text}>
          *Disability Type: 
        </Text> 
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.toggleDisability('cognitive', this.state.disability_type.indexOf('cognitive'), checked));  }}
          isChecked={false}
          leftText={'Cognitive'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.toggleDisability('mobility', this.state.disability_type.indexOf('mobility'), checked));  }}
          isChecked={false}
          leftText={'Mobility'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.toggleDisability('hearing', this.state.disability_type.indexOf('hearing'), checked));  }}
          isChecked={false}
          leftText={'Hearing'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.toggleDisability('vision', this.state.disability_type.indexOf('vision'), checked));  }}
          isChecked={false}
          leftText={'Vision'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.toggleDisability('sensory', this.state.disability_type.indexOf('sensory'), checked));  }}
          isChecked={false}
          leftText={'Sensory'}
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
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => this.setState({parent_participation : !checked}) }
          isChecked={false}
          leftText={''}
        />
        <Text style={styles.text}>
          *Assistant Provided: 
        </Text>
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => this.setState({assistant : !checked}) }
          isChecked={false}
          leftText={''}
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
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => this.setState({sibling : !checked}) }
          isChecked={false}
          leftText={''}
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
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => this.setState({asl : !checked}) }
          isChecked={false}
          leftText={''}
        />
        <Text style={styles.text}>
          Closed circuit hearing loop:
        </Text>
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => this.setState({closed_circuit : !checked}) }
          isChecked={false}
          leftText={''}
        /> 
        <Text style={styles.text}>
          Additional charge for personal care attendant:
        </Text>
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => this.setState({add_charge : !checked}) }
          isChecked={false}
          leftText={''}
        />
        <Text style={styles.text}>
          Can accomodate service animals:
        </Text> 
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => this.setState({animals : !checked}) }
          isChecked={false}
          leftText={''}
        />
        <Text style={styles.text}>
          Childcare onsite:  
        </Text>
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => this.setState({childcare : !checked}) }
          isChecked={false}
          leftText={''}
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
