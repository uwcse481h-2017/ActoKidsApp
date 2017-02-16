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
      id: 1, ActivityName: '', date: '', frequency: '', time: '', cost: '', description: '', street_address: '', city: '', state: '', wheelchair_accessible: false,
      wheelchair_accessible_restroom: false, activity_type: [], disability_types: [], age_range : '', parent_participation: false, assistant: false, equipment_provided: '',
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

   _navigate (){
  this.props.navigator.push({title: 'Home Screen', index: 0})
}
  render() {
    return (
      <ScrollView>
        <Text>
          Welcome to ActoKids!
        </Text>
        <Text>
          * required fields
        </Text>
        <Text>
          *Activity Name:
        </Text>
        <TextInput
          style={{ height: 40, width: 200 }}
          placeholder="Activity name..."
          onChangeText={(ActivityName) => this.setState({ ActivityName })}
          />
        <Text>
          *Activity Date: 
        </Text>
        <TextInput
          style={{ height: 40, width: 200 }}
          placeholder="mm/dd/yyyy"
          onChangeText={(date) => this.setState({ date })}
          />
          <Text>
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
        <Text>
          *Time:
        </Text> 
        <TextInput
          style={{ height: 40, width: 200 }}
          placeholder="hh:mm-hh:mm"
          onChangeText={(time) => this.setState({ time })}
          />
        <Text>
          *Cost:  $
        </Text> 
        <TextInput
          style={{ height: 40, width: 200 }}
          placeholder=""
          onChangeText={(cost) => this.setState({ cost })}
          />
        <Text>
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
        <Text>
          *Description: 
        </Text> 
        <TextInput
          style={{ height: 40, width: 200 }}
          placeholder="description"
          onChangeText={(description) => this.setState({ description })}
          />
        <Text>
          *Wheelchair Accessible: 
        </Text> 
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => this.setState({wheelchair_accessible : !checked}) }
          isChecked={false}
          leftText={''}
        />
        <Text>
          *Wheelchair Accessible Restroom: 
        </Text>
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => this.setState({wheelchair_accessible_restroom : !checked}) }
          isChecked={false}
          leftText={''}       
        />
        <Text>
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
          leftText={'art'}
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
        <Text>
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
        <Text>
          *Age range: 
        </Text> 
        <TextInput
          style={{ height: 40, width: 200 }}
          placeholder="youngest-oldest"
          onChangeText={(age_range) => this.setState({age_range })}
          />
        <Text>
          *Parent participation required: 
        </Text> 
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => this.setState({parent_participation : !checked}) }
          isChecked={false}
          leftText={''}
        />
        <Text>
          *Assistant Provided: 
        </Text>
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => this.setState({assistant : !checked}) }
          isChecked={false}
          leftText={''}
        />
         <Text>
          Equipment provided: 
        </Text> 
        <TextInput
          style={{ height: 40, width: 200 }}
          placeholder="List all equipment provided by your organization"
          onChangeText={(equipment_provided) => this.setState({equipment_provided })}
          />
        <Text>
          Sibling participation allowed: 
        </Text> 
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => this.setState({sibling : !checked}) }
          isChecked={false}
          leftText={''}
        />
        <Text>
          Kids to staff ratio: 
        </Text> 
        <TextInput
          style={{ height: 40, width: 200 }}
          placeholder="kids : staff"
          onChangeText={(kids_to_staff) => this.setState({kids_to_staff })}
          />
         <Text>
          ASL Interpreter available:  
        </Text> 
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => this.setState({asl : !checked}) }
          isChecked={false}
          leftText={''}
        />
        <Text>
          Closed circuit hearing loop:
        </Text>
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => this.setState({closed_circuit : !checked}) }
          isChecked={false}
          leftText={''}
        /> 
        <Text>
          Additional charge for personal care attendant:
        </Text>
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => this.setState({add_charge : !checked}) }
          isChecked={false}
          leftText={''}
        />
         <Text>
          Can accomodate service animals:
        </Text> 
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => this.setState({animals : !checked}) }
          isChecked={false}
          leftText={''}
        />
        <Text>
          Childcare onsite:  
        </Text>
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => this.setState({childcare : !checked}) }
          isChecked={false}
          leftText={''}
        />
        <Button
          onPress={ () => this._navigate() }
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
  }
});


//AppRegistry.registerComponent('ActoKids', () => ActoKids);
