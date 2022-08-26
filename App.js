
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store'; //Import the store
import HomeScreen from './src/screens/HomeScreen';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <HomeScreen />
            </Provider>
        );
    }
}