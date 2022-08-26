import  { AppRegistry } from "react-native";
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import NewQuote from '../screens/NewQuote'
import Data from '../../quotes.json'
import { connect } from 'react-redux';
import { getQuotes } from '../.././src/redux/actions'
import QuoteScreen from './QuoteScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

AppRegistry.registerComponent(appName, () => QuoteScreen);

class Main extends Component {

    componentDidMount() {
        var _this = this;
        //Check if any data exist
        AsyncStorage.getItem('data', (err, data) => {
            //if it doesn't exist, extract from json file
            //save the initial data in Async
            if (data === null) {
                AsyncStorage.setItem('data', JSON.stringify(Data.quotes));
                _this.props.getQuotes();
            }
        });
    }



    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={QuoteScreen} />
                    <Stack.Screen name="New Quote" component={NewQuote} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

//Connect everything
export default connect(null, { getQuotes })(Main);