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
  ScrollView,
  TouchableHighlight,
  Navigator,
  View
} from 'react-native';
//import Filter from './filter';
///import events from './events.json';
 //import SearchBar from 'react-native-searchbar'; 


export default class DetailsPage extends Component {
    constructor(props) {
      var dat = props.data == undefined? JSON.stringify({'activity_name': 'none'}) : JSON.stringify(props.data); 
      var obj = JSON.parse(dat);
      super(props);
      this.state = {id: 1, text: '', dat: dat.replace(/"/g, ' ').replace(/_/g, ' ').replace(/{/g, '').replace(/}/g, '').replace(/,/g, '\n')};
    }

    _navigate (){
      this.props.navigator.push({title: 'Details Page', index: 4})
    }
      _onBack () { 
    this.props.navigator.pop();
  }

  render() {
    return (     
    <View>
     <TouchableHighlight onPress={ () => this._onBack() }>
          <Text> Back </Text>
       </TouchableHighlight>
        <Text style={styles.header}>
          Welcome to ActoKids!
        </Text>
        <ScrollView >
        <Text style={styles.listItem}> 
            {this.state.dat}
        </Text>
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
  },
  listItem: { 
    fontSize: 18,
  },

});
