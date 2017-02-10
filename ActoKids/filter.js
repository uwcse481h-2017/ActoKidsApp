import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, Button, TextInput, ListView } from 'react-native';

export default class Filter extends Component {
   constructor(props) {
      super(props)
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {id: 1, text: '', 
        dataSource: ds.cloneWithRows([
        'Arts', 'Sports', 'Football', 'Camp', 'Hiking', 'Baking', 'Other', 'One more'
        ])
      }
  }


  render() {
    if (this.id === 1) {
      return(
      <View>
        <Text>
          Welcome to ActoKids!
        </Text>
         <Button
            onPress={this.props.onForward}
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
      )
    } else if (this.id === 2) {
       return (
      <View>
        <Text>
          Welcome to ActoKids!
        </Text>
        <Text>
          FILTER
        </Text>
       </View>
    )
    }
  }
}

Filter.propTypes = {
  title: PropTypes.string.isRequired,
  onForward: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};
