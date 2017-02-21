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
  View
} from 'react-native';
import SearchPage from './SearchPage';
import EnterEvent from './EnterEvent';

 //import SearchBar from 'react-native-searchbar'; 

export default class HomePage extends Component {
    constructor(props) {
    super(props);
      this.state = {id: 1, text: '',
        dataSource: null
      }
   
  }

_navigateSearch(info){
  this.props.navigator.push({title: 'Search Page', index: 2, 
    passProps : { data: info }
  })
}

_navigateEvent (){
  this.props.navigator.push({title: 'Add Event', index: 1})
}

get_events() { 
  var url = 'http://10.0.2.2:3000/api/activities/getAllActivities'
     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

      fetch(url)
        .then((res) => res.json())
        .then((resJson) => {
          this._navigateSearch(resJson.data);
        })
        .catch((error) => {
          console.error(error);
        });
}

  render() {
    return (     
    <View>
        <Text>
          Welcome to ActoKids!
        </Text>
         <Button
            onPress={ () => this.get_events() } 
            title="Search For An Activity"
            accessibilityLabel="Search"
          />
        <Button
            onPress={ () => this._navigateEvent() }
            title="Enter An Activity"
            accessibilityLabel="Enter an activity"
          />
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
  }
});


//AppRegistry.registerComponent('ActoKids', () => ActoKids);
