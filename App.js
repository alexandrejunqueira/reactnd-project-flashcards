import React, { Component } from 'react';
import { View } from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import reducer from './reducers';
import DeckScreen from './components/DeckScreen';
import DecksScreen from './components/DecksScreen';
import NewDeckScreen from './components/NewDeckScreen';
import NewCardScreen from './components/NewCardScreen';
import QuizScreen from './components/QuizScreen';
import AppStatusBar from './components/AppStatusBar';
import { purple } from './utils/colors';
import { setLocalNotification } from "./utils/notification";

const DecksStack = createStackNavigator({
  Decks: {
    screen: DecksScreen,
    navigationOptions: () => ({
      title: 'Decks',
    }),
  },
  Deck: {
    screen: DeckScreen,
    navigationOptions: () => ({
      title: 'Deck',
    }),
  },
  NewCard: {
    screen: NewCardScreen,
    navigationOptions: () => ({
      title: 'New Card',
    }),
  },
  Quiz: {
    screen: QuizScreen,
    navigationOptions: () => ({
      title: 'Quiz',
    }),
  },
});

const NewDeckStack = createStackNavigator({
  NewDeck: {
    screen: NewDeckScreen,
    navigationOptions: () => ({
      title: 'New Deck',
    }),
  },
});

const Tabs = createBottomTabNavigator(
  {
    Decks: {
      screen: DecksStack,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({tintColor}) => <Ionicons name="ios-browsers" size={30} color={tintColor} />,
      },
    },
    NewDeck: {
      screen: NewDeckStack,
      navigationOptions: {
        tabBarLabel: 'New Deck',
        tabBarIcon: ({tintColor}) => <Ionicons name="ios-add-circle" size={30} color={tintColor} />,
      },
    },
  },
  {
    tabBarOptions: {
      style: {
        height: 56,
      },
    },
  },
);

const AppContainer = createAppContainer(Tabs);

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  };

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <AppStatusBar backgroundColor={purple} barStyle="light-content" />
          <AppContainer />
        </View>
      </Provider>
    );
  }
}
