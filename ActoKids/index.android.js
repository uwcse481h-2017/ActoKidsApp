import React, { Component } from 'react';
import { AppRegistry, Navigator } from 'react-native';

import HomePage from './HomePage';
import SearchPage from './SearchPage';
import EnterEvent from './EnterEvent';
import FilterPage from './FilterPage';

class ActoKids extends Component {
  render() {
  const routes = [
    {title: 'Home Screen', index: 0},
    {title: 'Add Event', index: 1}, 
    {title: 'Search Page', index: 2}, 
    {title: 'Filter Page', index: 3}
  ];
  return (
    <Navigator
      initialRoute={routes[0]}
      initialRouteStack={routes}
      renderScene={(route, navigator) =>
           { if (route.index === 0) {
           return <HomePage navigator={navigator} />
           } else if (route.index == 1) {
            return <EnterEvent navigator={navigator} />         
           } else if(route.index == 2) { 
            return <SearchPage navigator={navigator} />
           } else if (route.index == 3) { 
            return <FilterPage navigator={navigator} />
           } else { 
            return null
           }
          }
      }
    />
  );

  }
}

AppRegistry.registerComponent('ActoKids', () => ActoKids);