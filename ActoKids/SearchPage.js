/**Displays a list of events
 * If filters have been applied, it only displays events that match the filter
 * If filters have not been applied, it displays all events.
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
import events from './events.json';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class HomePage extends Component {
    constructor(props) {
      var dat = props.data == undefined? JSON.stringify({'activity_name': 'none'}) : JSON.stringify(props.data); 
      var obj = JSON.parse(dat);
      super(props);
      this.state = {id: 1, text: '', dataSource: ds.cloneWithRows(obj)};
    }
//opens details page about the activity selected
   _onSelect(data) { 
      this.props.navigator.push({title: 'Details Page', index: 4, 
      passProps : { data: data}})  
  }
  //opens filter page so user can filter out activities
  _navigate (){
      this.props.navigator.push({title: 'Filter Page', index: 3})
  }
  //brings user back to previous page (either home page or filter page)
  _onBack () { 
    this.props.navigator.pop();
  }
//displays page
  render() {
    return (     
     <View style={styles.outerApp}>  
       <View style={{ justifyContent: 'flex-start', flexDirection: 'row',}}>
         <Button 
           onPress={() => this._onBack()}
           title="Back"
           color="darkgray"
           accessibilityLabel="Back"
        />
        </View>
       <View style={styles.headerView} > 
        <Text style={styles.titleText}>
           Search for Events
        </Text>
        </View>
        <View style = {{height:50, justifyContent: 'center', backgroundColor: 'lightgray',}}>
          <Button
            onPress={ () => this._navigate() } 
            color="purple" 
            title="Click here to filter results"
            accessibilityLabel="Click here to filter results"
          />
        </View>
        <Text style ={{fontSize: 18, textAlign:'center', fontFamily: 'serif', backgroundColor:'lightgray'}}>
          Search our database for an event. Click the filter button get more specific results. 
        </Text>
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
    flex: 1,
    fontFamily: 'serif',
    fontSize: 32, 
    color:'white',
    textAlign: 'center'
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
    justifyContent: 'center',
}, 
});
