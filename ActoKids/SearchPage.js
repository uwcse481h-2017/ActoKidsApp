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
//import Filter from './filter';

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

 _navigate (){
  this.props.navigator.push({title: 'Filter Page', index: 3})
}

  render() {
    return (     
    <View>
        <Text>
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
          renderRow={(rowData) => <Text>{rowData}</Text>}
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
