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
  View,
  TouchableHighlight,
  TimePickerAndroid,
  DatePickerAndroid,
  TouchableOpacity,
  Alert
} from 'react-native';
import CheckBox from 'react-native-check-box';
import ModalDropdown from 'react-native-modal-dropdown';

export default class EnterEvent extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      id: 1, isDateTimePickerVisible: false, ActivityName: '', date: new Date(), time: '', cost: '', description: '', street_address: '', city: '', state: '', country:'', zip_code:'', wheelchair_accessible: '',
      wheelchair_accessible_restroom: '', activity_type: '', disability_type: '', age_range : '', parent_participation: '', assistant: '', equipment_provided: '',
      sibling: '', kids_to_staff: '', asl: '', closed_circuit: '', add_charge: '', childcare: '', animals: '', phone: '', startText: 'Click to select start time', endText: 'Click to select end time', 
      dateText: 'Click to select date', dateDate : new Date(), start_age: -1, end_age: -1, selected: ''
    }

  }
showDatePicker = async (stateKey, options) => {
    try {
      var newState = {};
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      if (action === DatePickerAndroid.dismissedAction) {
        newState[stateKey + 'Text'] = 'dismissed';
      } else {
        var date = new Date(year, month, day);
        newState[stateKey + 'Text'] = date.toLocaleDateString();
        newState[stateKey + 'Date'] = date;
      }
      this.setState(newState);
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  };

showTimePicker = async (stateKey, options) => {
    try {
      const {action, minute, hour} = await TimePickerAndroid.open(options);
      var newState = {};
      if (action === TimePickerAndroid.timeSetAction) {
        newState[stateKey + 'Text'] = "" + hour + ":" + minute;
        newState[stateKey + 'Hour'] = hour;
        newState[stateKey + 'Minute'] = minute;
      } else if (action === TimePickerAndroid.dismissedAction) {
        newState[stateKey + 'Text'] = 'dismissed';
      }
      this.setState(newState);
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  };

  onSubmitButtonPressed() {
    if(this.check_submission) { 
    var startmin = this.state.startHour + this.state.startMinute / 60.0;
    var endmin = this.state.endHour + this.state.endMinute/60.0;
    var time = "(" + startmin + "," + endmin +")"; 
    var date = this.state.dateDate.getFullYear() + '-' + (this.state.dateDate.getMonth()+1) + '-' + this.state.dateDate.getDate(); 
    var age_range = "["+this.state.start_age+","+this.state.end_age+"]";
    var body = JSON.stringify({
        a: this.state.ActivityName,
        b: date,
        c: time,
        d: this.state.cost,
        e: this.state.street_address,
        f: this.state.city,
        g: this.state.state,
        h: this.state.country, 
        i: this.state.zip_code,
        j: this.state.description,
        k: this.state.wheelchair_accessible,
        l: this.state.activity_type,
        m: this.state.disability_type,
        n: age_range,
        o: this.state.parent_participation,
        p: this.state.assistant,
        q: this.state.wheelchair_accessible_restroom,
        r: this.state.equipment_provided,
        s: this.state.sibling,
        t: this.state.kids_to_staff,
        u: this.state.asl,
        v: this.state.closed_circuit,
        w: this.state.add_charge,
        x: this.state.animals,
        y: this.state.childcare,
        z: this.state.phone});
     // console.warn(body);
    fetch('http://10.0.2.2:3000/api/activities/createNewActivity', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'},
        body: body
      })
      // .then( (res)=> res.json() )
      // .then( (resData) => {
      //   console.log("Response Body -> " + JSON.stringify(resData.body) );
      // } )
      .done();

      this._navigate()
    }  
}

   yesNo(v) { 
     if(v == 'Yes') { 
       return true;
     } else { 
       return false;
     }
   }

   _navigate (){
    this.props.navigator.push({title: 'Home Screen', index: 0})
  }

  _onBack () { 
    this.props.navigator.pop();
  }

  check_submission() { 
    if(this.state.ActivityName.length < 1) { 
      Alert.alert("Must enter activity name");
      return false;
    } else if(this.state.dateDate== new Date()) { 
      Alert.alert("Must enter a date after today");
      return false;
    } else if (this.state.startText == 'Click to select start time' || this.state.startText == 'dismissed') {
      Alert.alert("Must enter start time");
      return false;
    } else if (this.state.endText == 'Click to select end time' || this.state.endText == 'dismissed') {
      Alert.alert("Must enter end time");
      return false;
    } else if (this.state.cost.length < 1) { 
      Alert.alert("Must enter cost");
      return false;
    } else if (this.state.street_address.length < 1) { 
      Alert.alert("Must enter street address");
      return false;
    } else if (this.state.city.length < 1) { 
      Alert.alert("Must enter city");
      return false;
    } else if (this.state.state.length < 1) { 
      Alert.alert("Must enter state");
      return false;
    } else if (this.state.country.length < 1) { 
      Alert.alert("Must enter country");
      return false;
    } else if (this.state.zip_code.length < 1) { 
      Alert.alert("Must enter zip code");
      return false;
    } else if (this.state.wheelchair_accessible.length < 1) { 
      Alert.alert("Must enter wheelchair accessible");
      return false;
    } else if (this.state.wheelchair_accessible_restroom.length < 1) { 
      Alert.alert("Must enter wheelchair accessible restroom");
      return false;
    } else if (this.state.activity_type.length < 1) { 
      Alert.alert("Must enter activity type");
      return false;
    } else if (this.state.disability_type.length < 1) { 
      Alert.alert("Must enter disability type");
      return false;
    } else if (this.state.parent_participation.length < 1) { 
      Alert.alert("Must enter parent participation required");
      return false;
    } else if (this.state.assistant.length < 1) { 
      Alert.alert("Must enter assistant provided");
      return false;
    } else if (this.state.phone.length < 1) { 
      Alert.alert("Must enter phone number to call for accessibility questions");
      return false;
    } else if (this.start_age < 0) { 
      Alert.alert("Must enter youngest age");
      return false;
    } else if (this.end_age < 0) { 
      Alert.alert("Must enter oldest age");
      return false;
    } else if (this.end_age < this.start_age) { 
      Alert.alert("Oldest age must be older than youngest age");
      return false;
    } else { 
      return true;
    }
    
  }

  render() {
    return (
      <View style={styles.outerApp}>
        <View style={styles.headerView} > 
          <TouchableHighlight onPress={ () => this._onBack() }>
            <Text style={styles.backButton}> Back </Text>
          </TouchableHighlight>
          <Text style={styles.titleText}>
            Enter an Activity
          </Text>
        </View>
        <ScrollView style={styles.container}>
          <Text style ={styles.itemText}>
            Note: fields marked with (*) are required
          </Text>
          <Text style={styles.headerText}>
            *Activity Name:
          </Text>
          <TextInput
            style={styles.inputText}
            placeholder="Activity name..."
            onChangeText={(ActivityName) => this.setState({ ActivityName })}
          />
          <Text style={styles.headerText}>
            *Activity Date:
          </Text>
          <TouchableHighlight
            onPress={this.showDatePicker.bind(this, 'date', {
            date: this.state.dateDate,
            minDate: new Date(),
           })}>
            <Text style={styles.itemText}>{this.state.dateText}</Text>
          </TouchableHighlight>
          <Text style={styles.headerText}>
            *Start Time:
          </Text>
          <TouchableHighlight
            onPress={this.showTimePicker.bind(this, 'start', {})}>
            <Text style={styles.itemText}> {this.state.startText} </Text>
          </TouchableHighlight>
          <Text style={styles.headerText}>
            *End Time:
          </Text>
          <TouchableHighlight
            onPress={this.showTimePicker.bind(this, 'end', {})}>
            <Text style={styles.itemText}> {this.state.endText} </Text>
          </TouchableHighlight>
          <Text style={styles.headerText}>
            *Cost:  $
          </Text> 
          <TextInput
            keyboardType = 'numeric'
            style={styles.inputText}
            placeholder="15.00"
            onChangeText={(cost) => this.setState({ cost : cost })}
          />
          <Text style={styles.headerText}>
            *Location: 
          </Text> 
          <TextInput
            style={styles.inputText}
            placeholder="Street address"
            onChangeText={(street_address) => this.setState({street_address })}
          />
          <TextInput
            style={styles.inputText}
            placeholder="City"
            onChangeText={(city) => this.setState({ city })}
          />
          <TextInput
            style={styles.inputText}
            placeholder="State"
            onChangeText={(state) => this.setState({ state })}
          />
          <TextInput
            style={styles.inputText}
            placeholder="Country"
            onChangeText={(country) => this.setState({ country })}
          />
          <TextInput
            keyboardType = 'numeric'
            style={styles.inputText}
            placeholder="Zip code"
            onChangeText={(zip) => this.setState({ zip_code : zip })}
          />
          <Text style={styles.headerText}>
           *Description: 
          </Text> 
          <TextInput
            style={{height: 100, width: 300, fontSize: 18,fontFamily: 'serif',}}
            multiline={true}
            placeholder="Describe your event"
            onChangeText={(description) => this.setState({ description })}
          />
          <Text style={styles.headerText}>
            *Wheelchair Accessible: 
          </Text> 
          <ModalDropdown 
            textStyle ={styles.itemText}
            renderRow = {(text)=><Text style={styles.itemText}> {text} </Text> }
            options={['Yes', 'No']}
            onSelect={(i,v) => this.setState({wheelchair_accessible : this.yesNo(v) }) } 
          />
          <Text style={styles.headerText}>
            *Wheelchair Accessible Restroom: 
          </Text>
          <ModalDropdown 
            renderRow = {(text)=><Text style={styles.itemText}> {text} </Text> }
            textStyle ={styles.itemText}
            options={['Yes', 'No']}
            onSelect={(i,v) =>this.setState({wheelchair_accessible_restroom :  this.yesNo(v)}) }
          />
          <Text style={styles.headerText}>
            *Activity Type: 
          </Text> 
          <ModalDropdown 
            renderRow = {(text)=><Text style={styles.itemText}> {text} </Text> }
            textStyle ={styles.itemText}
            options={['Outdoors', 'Sports', 'Music', 'Zoo', 'Art', 'Camps', 'Museum', 'Others']}
            onSelect={(i,v) =>this.setState({activity_type : v}) }
          />
          <Text style={styles.headerText}>
            *Disability Type: 
          </Text> 
          <ModalDropdown 
            textStyle ={styles.itemText}
            renderRow = {(text)=><Text style={styles.itemText}> {text} </Text> }
            options={['Cognitive', 'Mobility', 'Hearing', 'Vision', 'Sensory', 'Others']}
            onSelect={(i,v) =>this.setState({disability_type : v}) }
          />
          <Text style={styles.headerText}>
            *Age range: 
          </Text> 
          <TextInput
            keyboardType = 'numeric'
            style={styles.inputText}
            placeholder="Youngest"
            onChangeText={(age) => this.setState({ start_age : age })}
          />
          <TextInput
            keyboardType = 'numeric'
            style={styles.inputText}
            placeholder="Oldest"
            onChangeText={(age) => this.setState({ end_age : age})}
          />
          <Text style={styles.headerText}>
            *Parent participation required: 
          </Text> 
          <ModalDropdown 
            renderRow = {(text)=><Text style={styles.itemText}> {text} </Text> }
            textStyle ={styles.itemText}
            options={['Yes', 'No']}
            onSelect={(i,v) =>this.setState({parent_participation : this.yesNo(v)}) }
          />
          <Text style={styles.headerText}>
            *Assistant Provided: 
          </Text>
          <ModalDropdown 
            renderRow = {(text)=><Text style={styles.itemText}> {text} </Text> }
            textStyle ={styles.itemText}
            options={['Yes', 'No']}
            onSelect={(i,v) =>this.setState({assistant : this.yesNo(v)}) }
          />
          <Text style={styles.headerText}>
            *Phone number to call for accessibility questions:
          </Text>
          <TextInput
            style={styles.inputText}
            placeholder="(xxx)xxx-xxxx"
            onChangeText={(phone) => this.setState({ phone })}
          />
          <Text style={styles.headerText}>
            Equipment provided: 
          </Text> 
          <TextInput
            style={{height: 100, width: 300, fontSize: 18,fontFamily: 'serif',}}
            multiline={true}
            placeholder="List all equipment provided by your organization"
            onChangeText={(equipment_provided) => this.setState({equipment_provided })}
         />
         <Text style={styles.headerText}>
           Sibling participation allowed: 
        </Text> 
        <ModalDropdown 
          renderRow = {(text)=><Text style={styles.itemText}> {text} </Text> }
          textStyle ={styles.itemText}
          options={['Yes', 'No']}
          onSelect={(i,v) =>this.setState({sibling : this.yesNo(v)}) }
        />
        <Text style={styles.headerText}>
          Kids to staff ratio: 
        </Text> 
          <TextInput
            keyboardType = 'numeric'
            style={styles.inputText}
            placeholder="e.g. 1.5"
            onChangeText={(ratio) => this.setState({ kids_to_staff : ratio })}
          />
        <Text style={styles.headerText}>
          ASL Interpreter available:  
        </Text> 
        <ModalDropdown 
           renderRow = {(text)=><Text style={styles.itemText}> {text} </Text> }
           textStyle ={styles.itemText}
           options={['Yes', 'No']}
           onSelect={(i,v) =>this.setState({asl : this.yesNo(v)}) }
        />
        <Text style={styles.headerText}>
          Closed circuit hearing loop:
        </Text>
        <ModalDropdown 
          renderRow = {(text)=><Text style={styles.itemText}> {text} </Text> }
          textStyle ={styles.itemText}
          options={['Yes', 'No']}
          onSelect={(i,v) =>this.setState({closed_circuit : this.yesNo(v)}) }
        />
        <Text style={styles.headerText}>
          Additional charge for personal care attendant:
        </Text>
        <ModalDropdown 
          renderRow = {(text)=><Text style={styles.itemText}> {text} </Text> }
          textStyle ={styles.itemText}
          options={['Yes', 'No']}
          onSelect={(i,v) =>this.setState({add_charge : this.yesNo(v)}) }
        />
        <Text style={styles.headerText}>
          Can accomodate service animals:
        </Text> 
        <ModalDropdown 
          renderRow = {(text)=><Text style={styles.itemText}> {text} </Text> }
          textStyle ={styles.itemText}
          options={['Yes', 'No']}
          onSelect={(i,v) =>this.setState({animals : this.yesNo(v)}) }
        />
        <Text style={styles.headerText}>
          Childcare onsite:  
        </Text>
        <ModalDropdown 
          renderRow = {(text)=><Text style={styles.itemText}> {text} </Text> }
          textStyle ={styles.itemText}
          options={['Yes', 'No']}
          onSelect={(i,v) =>this.setState({childcare : this.yesNo(v)}) }
        />
        <Button
          onPress={this.onSubmitButtonPressed.bind(this)}
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
    backgroundColor: 'lightgray',
  },
   outerApp: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  titleText:{
    flex: 2,
    fontSize: 32, 
    color:'white',
    fontFamily: 'serif',
  },
  headerText: { 
    fontSize: 27,
    color: 'black',
    fontFamily: 'serif',
  },
  itemText: { 
    color:'black',
    fontSize:22,
     fontFamily: 'serif',
  },
  backButton: {
    flex:1,
    width:75,
    fontFamily: 'serif',
    fontSize: 20,
    color:'white'
  },
  inputText: { 
    height: 40, 
    width: 200, 
    fontSize: 18,
    fontFamily: 'serif',
  }, 
  headerView: {         
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: "center",
}, 

});

