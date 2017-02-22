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
  TouchableHighlight,
  Navigator,
  View
} from 'react-native';
//import Filter from './filter';
import events from './events.json';
 //import SearchBar from 'react-native-searchbar'; 

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class HomePage extends Component {
    constructor(props) {
      var dat = props.data == undefined? JSON.stringify({'activity_name': 'none'}) : JSON.stringify(props.data); 
      var obj = JSON.parse(dat);
      super(props);
      this.state = {id: 1, text: '', dataSource: ds.cloneWithRows(obj)};
    }

 /*   componentWillMount() {
      var url = 'http://10.0.2.2:3000/api/activities/getAllActivities'

      fetch(url)
        .then((res) => res.json())
        .then((resJson) => {
          this.setState({dataSource: ds.cloneWithRows(resJson.data)});
        })
        .catch((error) => {
          console.error(error);
        });
    }*/


    _navigate (){
      this.props.navigator.push({title: 'Filter Page', index: 3})
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
         <Button
            onPress={ () => this._navigate() }
            title="Filter"
            accessibilityLabel="Filter"
          />
        <TextInput
          style={{height: 40, width: 200}}
          placeholder="Search by keyword"
          onChangeText={(text) => this.setState({text})}
        />
       <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text style={styles.listItem}>{rowData.activity_name}</Text>}
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
  }, 
  header: { 
    fontSize: 20,
    color: 'purple',
  },
  listItem: { 
    fontSize: 18,
  },

});
