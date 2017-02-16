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
  View
} from 'react-native';
import Filter from './filter';
import CheckBox from 'react-native-check-box';

export default class FilterPage extends Component {
    constructor(props) {
    super(props);
    this.state= { activity_types: ['outdoors', 'sports', 'music', 'zoo', 'art', 'camps', 'museum', 'other'], 
      disability_types: ['cognitive', 'mobility', 'hearing', 'vision', 'sensory'],
      frequency: ['once', 'recurring'],
      day_of_week:['sun', 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat'],
      time_of_day:['morning', 'noon', 'evening'],
      }
  }
_navigate(){
  this.props.navigator.push({title: 'Search Page', index: 2})
}

removeFrequency(frequency, index, checked) {
  if(checked) { 
     this.state.frequency.append(frequency)
  } else{
   this.setState({
     data: this.state.frequency.filter((_, i) => i !== index)
   });
  }
}

removeDay(day, index, checked) {
  if(checked) { 
     this.state.day_of_week.append(day)
  } else{
   this.setState({
     data: this.state.day_of_week.filter((_, i) => i !== index)
   });
  }
}

removeTime(time, index, checked) {
  if(checked) { 
     this.state.time_of_day.append(time)
  } else{
   this.setState({
     data: this.state.time_of_day.filter((_, i) => i !== index)
   });
  }
}

removeActivity(activity, index, checked) {
  if(checked) { 
     this.state.activity_types.append(activity)
  } else{
   this.setState({
     data: this.state.activity_types.filter((_, i) => i !== index)
   });
  }
}

removeDisability(disability, index, checked) {
  if(checked) { 
     this.state.disability_types.append(disability)
  } else{
    this.setState({
      data: this.state.disability_types.filter((_, i) => i !== index)
    });
  }
}

  render() {
    return (   
      <View>  
      <ScrollView>
        <Text>
          Welcome to ActoKids!
        </Text>
        <Text style={ styles.header }>
          Activity Types
        </Text>
        <CheckBox
          style={{flex: 1, padding: 10}}
          isChecked={true}
          onClick={(checked) => { (this.removeActivity('outdoors', this.state.activity_types.indexOf('outdoors'), checked));  }}
          leftText={'Outdoors & Nature'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.removeActivity('sports', this.state.activity_types.indexOf('sports'), checked));  }}
          isChecked={true}
          leftText={'Sports'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.removeActivity('music', this.state.activity_types.indexOf('music'), checked)); }}
          isChecked={true}
          leftText={'Music'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.removeActivity('zoo', this.state.activity_types.indexOf('zoo'), checked));  }}
          isChecked={true}
          leftText={'Zoo'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.removeActivity('art', this.state.activity_types.indexOf('art'), checked));  }}
          isChecked={true}
          leftText={'Art'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.removeActivity('camps', this.state.activity_types.indexOf('camps'), checked));  }}
          isChecked={true}
          leftText={'Camps'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.removeActivity('museum', this.state.activity_types.indexOf('museum'), checked));  }}
          isChecked={true}
          leftText={'Museum'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.removeActivity('other', this.state.activity_types.indexOf('other'), checked));  }}
          isChecked={true}
          leftText={'Other'}
        />
      <Text style={ styles.header }>
          Disability Types
        </Text>
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.removeDisability('cognitive', this.state.disability_types.indexOf('cognitive'), checked));  }}
          isChecked={true}
          leftText={'Cognitive'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.removeDisability('mobility', this.state.disability_types.indexOf('mobility'), checked));  }}
          isChecked={true}
          leftText={'Mobility'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.removeDisability('hearing', this.state.disability_types.indexOf('hearing'), checked));  }}
          isChecked={true}
          leftText={'Hearing'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.removeDisability('vision', this.state.disability_types.indexOf('vision'), checked));  }}
          isChecked={true}
          leftText={'Vision'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.removeDisability('sensory', this.state.disability_types.indexOf('sensory'), checked));  }}
          isChecked={true}
          leftText={'Sensory'}
        />

        <Text style={ styles.header }>
          Frequency
        </Text>
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.removeFrequency('once', this.state.frequency.indexOf('once'), checked));  }}
          isChecked={true}
          leftText={'One-time'}
        />
       <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.removeFrequency('recurring', this.state.frequency.indexOf('recurring'), checked));  }}
          isChecked={true}
          leftText={'Recurring'}
        />
        <Text style={ styles.header }>
          Day of Week
        </Text>
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.removeDay('sunday', this.state.day_of_week.indexOf('sunday'), checked));  }}
          isChecked={true}
          leftText={'Sunday'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.removeDay('monday', this.state.day_of_week.indexOf('mnoday'), checked));  }}
          isChecked={true}
          leftText={'Monday'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.removeDay('tuesday', this.state.day_of_week.indexOf('tuesday'), checked));  }}
          isChecked={true}
          leftText={'Tuesday'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.removeDay('wednesday', this.state.day_of_week.indexOf('wednesday'), checked));  }}
          isChecked={true}
          leftText={'Wednesday'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.removeDay('thursday', this.state.day_of_week.indexOf('thursday'), checked));  }}
          isChecked={true}
          leftText={'Thursday'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.removeDay('friday', this.state.day_of_week.indexOf('friday'), checked));  }}
          isChecked={true}
          leftText={'Friday'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.removeDay('sat', this.state.day_of_week.indexOf('sat'), checked));  }}
          isChecked={true}
          leftText={'Saturday'}
        />
       <Text style={ styles.header }>
          Time of Day
        </Text>
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.removeTime('morning', this.state.time_of_day.indexOf('morning'), checked));  }}
          isChecked={true}
          leftText={'Morning'}
        />
         <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.removeTime('noon', this.state.time_of_day.indexOf('noon'), checked));  }}
          isChecked={true}
          leftText={'Afternoon'}
        />
         <CheckBox
         style={{flex: 1, padding: 10}}
          onClick={(checked) => { (this.removeTime('evening', this.state.time_of_day.indexOf('evening'), checked));  }}
          isChecked={true}
          leftText={'Evening'}
        />
        <Button
            onPress={ () => this._navigate() }
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
    fontSize: 18,
    color: 'purple',
  }
});



//AppRegistry.registerComponent('ActoKids', () => ActoKids);
