# react-native-searchbar

A pretty awesome search bar for React Native. It has a built in simple search capability which can be utilised by handing the component `data` and providing a `handleResults` function which will receive the filtered copy of the `data` array.

The search function uses a depth-first algorithm to traverse the data and simply looks for an `indexOf` the user input within all strings, numbers, and boolean values in the data.

Works on both iOS and Android.

![react-native-searchbar](http://i.imgur.com/i21YwnW.gif)

(Rendered with the example in these docs and repository)

## Installation

- `npm install react-native-searchbar --save`
- Install [`react-native-vector-icons`](https://github.com/oblador/react-native-vector-icons) if the project doesn't have them already. The search bar accesses MaterialIcons.
- Now you can require the search bar with  `import SearchBar from 'react-native-searchbar'` or `var SearchBar = require('react-native-searchbar')`

## Available Props

	Property	|	Type		|	Default		|	Description
  :--------------------------------|:--------------|:--------------|:-----------------------------
	data	|	array	|	`[]`	|	The array of data to be searched (if not using a custom search algorithm)
	placeholder	|	string	|	`Search`	|	The placeholder for the search bar.
	handleChangeText(input) | function | `null` | Fires when the input text changes.
	handleSearch(input) | function | `null` | Fires after `handleChangeText`, and can be used to implement a custom search. If not present, the internal search logic will be used.
	handleResults(results) | function | `null` | Fires after each internal search with the results array.
	onSubmitEditing | function | `null` | Fired after pressing 'search' on the device keyboard
	onHide(input) | function | `null` | Fires when the search bar is hidden with the current user input.
	onBack | function | Hides the search bar | Fires when the back icon is pressed.
	heightAdjust | number | `0` | Adjust the height of the search bar.
	backgroundColor | string | `white` | The background colour of the search bar.
	iconColor | string | `gray` | The color of the back and X icons.
	textColor | string | `gray` | The color of the search bar text.
	placeholderTextColor | string | `lightgray` | The color of the placeholder text.
	animate | boolean | `true` | Animate the search bar when it is shown and hidden.
	animationDuration | number | `200` | The duration of the above animation in milliseconds.
	showOnLoad | boolean | `false` | Show the search bar when it is first rendered.
	hideBack | boolean | `false` | Hide the back button.
	hideX | boolean | `false` | Hide the X icon which clears the input.
	iOSPadding | boolean | `true` | Pad the size of the iOS status bar
	clearOnShow | boolean | `false` | Clear input when the search bar is shown.
	clearOnHide | boolean | `true` | Clear input when the search bar is hidden.
	focusOnLayout | boolean | `true` | Focus the text input box whenever it is shown.
	autoCorrect | boolean | `true` | AutoCorrect the search bar text.
	autoCapitalize | string | `sentences` | Auto capitialize behaviour of the text input - enum('none', 'sentences', 'words', 'characters')
	fontFamily | string | `System` | The font family to be used
	allDataOnEmptySearch | boolean | `false` | Search results behave as a `.filter`, returning all data when the input is an empty string.



## Usage

- Use a ref to show and hide the search bar `ref={(ref) => this.searchBar = ref}`
	- `this.searchBar.show()`
	- `this.searchBar.hide()`

- Write your own search logic with `handleSearch` or provide some `data` and use the results handed back from `handleResults`.
- Use your powers for good!


##### Notes for Android

- Render the search bar component after the component it is supposed to display over. iOS handles this nicely with a `zIndex` of `10`. Android elevation is set to 2.
- The bottom of the search bar will have a thin border instead of a shadow.



## Example

Full example at `example/`

```javascript
import SearchBar from 'react-native-searchbar';

const items = [
  1337,
  'janeway',
  {
    lots: 'of',
    different: {
      types: 0,
      data: false,
      that: {
        can: {
          be: {
            quite: {
              complex: {
                hidden: [ 'gold!' ],
              },
            },
          },
        },
      },
    },
  },
  [ 4, 2, 'tree' ],
];

...
_handleResults(results) {
  this.setState({ results });
}
...

...
<SearchBar
  ref={(ref) => this.searchBar = ref}
  data={items}
  handleResults={this._handleResults}
  showOnLoad
/>
...
```
