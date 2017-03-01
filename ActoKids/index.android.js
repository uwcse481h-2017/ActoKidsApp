import React, { Component } from 'react';
import { AppRegistry, Navigator } from 'react-native';

import HomePage from './HomePage';
import SearchPage from './SearchPage';
import EnterEvent from './EnterEvent';
import FilterPage from './FilterPage';
import DetailsPage from './DetailsPage';

class ActoKids extends Component {
  render() {
  const routes = [
    {title: 'Home Screen', index: 0},
    {title: 'Add Event', index: 1}, 
    {title: 'Search Page', index: 2}, 
    {title: 'Filter Page', index: 3}, 
    {title: 'Details Page', index: 4}
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
            return <SearchPage navigator={navigator} {...route.passProps} />
           } else if (route.index == 3) { 
            return <FilterPage navigator={navigator} />
           } else if (route.index == 4 ) { 
             return <DetailsPage navigator={navigator} {...route.passProps} />
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