/**Home page for our app */
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
import SearchPage from './SearchPage';
import EnterEvent from './EnterEvent';

export default class HomePage extends Component {
    constructor(props) {
    super(props);
      this.state = {id: 1, text: '',
        dataSource: null
      } 
  }
//brings user to search page
_navigateSearch(info){
  this.props.navigator.push({title: 'Search Page', index: 2, 
    passProps : { data: info.data }
  })
}
//brings user to enter an event 
_navigateEvent (){
  this.props.navigator.push({title: 'Add Event', index: 1})
}
//retrieves all event to pass into search page display
get_events() { 
  var url = 'http://10.0.2.2:3000/api/activities/getAllActivities'
     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

      fetch(url)
        .then((res) => res.json())
        .then((resJson) => {
          this._navigateSearch(resJson);
        })
        .catch((error) => {
          console.error(error);
        });
}
//displays search page
  render() {
    return (     
    <View style={styles.container}>
      <View style={styles.outerApp}>
        <Text style={styles.titleText}>
          Welcome to ActoKids!
        </Text>
        </View>
        <Text style={styles.inputText} >
          This app was created to help connect children with disabilites to community events that are suitable for them.
        </Text>
        <View style = {{height: 100, justifyContent: 'center'}}>
          <Button
            onPress={ () => this.get_events() }  
            color="purple"
            title="If you would like to search for an activity, click here"
            accessibilityLabel="If you would like to search for an activity, click here"
          />     
        </View>  
        <Button
          onPress={ () => this._navigateEvent()}  
          color="purple"
          title="If you are an organizer who would like to add an activity to our database, click here "
          accessibilityLabel="If you are an organizer who would like to add an activity to our database, click here "
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  titleText:{
    fontFamily: 'serif',
    fontSize: 32, 
    color:'white',
  },
  headerText: { 
    fontSize: 27,
    fontFamily: 'serif',
    color: 'black',
  },
  itemText: { 
    color:'blue',
    fontFamily: 'serif',
    fontSize:22,
    textAlign: 'center',
  },
  backButton: {
    flex:1,
    width:75,
    fontFamily: 'serif',
    fontSize: 20,
    color:'white'
  },
  inputText: {  
    fontFamily: 'serif',
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
  }, 
  headerView: {         
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: "center",
}, 

});
