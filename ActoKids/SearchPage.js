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
import events from './events.json';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class HomePage extends Component {
    constructor(props) {
      var dat = props.data == undefined? JSON.stringify({'activity_name': 'none'}) : JSON.stringify(props.data); 
      var obj = JSON.parse(dat);
      super(props);
      this.state = {id: 1, text: '', dataSource: ds.cloneWithRows(obj)};
    }

   _onSelect(data) { 
      this.props.navigator.push({title: 'Details Page', index: 4, 
      passProps : { data: data}})  
  }
  _navigate (){
      this.props.navigator.push({title: 'Filter Page', index: 3})
  }
  _onBack () { 
    this.props.navigator.pop();
  }

  render() {
    return (     
     <View style={styles.outerApp}>  
     <View style={styles.headerView} > 
       <TouchableHighlight onPress={ () => this._onBack() }>
          <Text style={styles.backButton}> Back </Text>
       </TouchableHighlight>
        <Text style={styles.titleText}>
           Search for Events
        </Text>
        </View>
        <TouchableHighlight 
          onPress={ () => this._navigate() } >
          <Text style={styles.filterButton}>
            Click here to filter results
          </Text>
        </TouchableHighlight>
        <ListView style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => 
          <TouchableHighlight onPress={() => this._onSelect(rowData)} >
            <Text style={styles.itemText}>{rowData.activity_name}</Text>
          </TouchableHighlight> } 
        />
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
    fontFamily: 'serif',
    fontSize: 32, 
    color:'white',
  },
  headerText: { 
    fontFamily: 'serif',
    fontSize: 27,
    color: 'black',
  },
  itemText: { 
    fontFamily: 'serif',
    color:'black',
    fontSize:22,
  },
  backButton: {
    flex:1,
    width:75,
    fontFamily: 'serif',
    fontSize: 20,
    color:'white'
  },
  filterButton:{
    color:'blue',
    fontFamily: 'serif',
    fontSize:22,
    textAlign: 'center',
    backgroundColor:'white'
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
