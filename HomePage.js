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
     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {id: 1, text: '', 
        dataSource: ds.cloneWithRows([
        'Arts', 'Sports', 'Football', 'Camp', 'Hiking', 'Baking', 'Other', 'One more'
        ])
      }
   
  }

_navigateSearch (){
  this.props.navigator.push({title: 'Search Page', index: 2})
}

_navigateEvent (){
  this.props.navigator.push({title: 'Add Event', index: 1})
}

  render() {
    return (     
    <View>
        <Text>
          Welcome to ActoKids!
        </Text>
         <Button
            onPress={ () => this._navigateSearch() }
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
