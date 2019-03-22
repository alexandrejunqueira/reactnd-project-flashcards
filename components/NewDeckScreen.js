import React, { Component } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import GlobalStyles from './GlobalStyles';
import { addDeck } from '../actions';
import { createDeck } from '../utils/api';

const localStyles = StyleSheet.create({
  view: {
    padding: 20,
  },
});

const styles = { ...GlobalStyles, ...localStyles };

class NewDeckScreen extends Component {
  state = {
    deckTitle: null,
    isSubmitDisabled: true,
  };

  handleChange = (text) => {
    this.setState({
      deckTitle: text,
      isSubmitDisabled: text === null || text.split(' ').join('') === '',
    });
  };

  handleSubmit = () => {
    const { deckTitle } = this.state;
    const { dispatch, navigation } = this.props;

    const newDeck = {
      title: deckTitle,
      questions: [],
    };

    dispatch(addDeck(newDeck));

    this.setState({
      deckTitle: null,
      isSubmitDisabled: true,
    });

    createDeck(newDeck)
      .then(() => {
        navigation.navigate('Deck', { deckTitle });
      });
  };

  render() {
    const { deckTitle, isSubmitDisabled } = this.state;
    return (
      <View style={styles.view}>
        <Text>What is the title of your new deck?</Text>
        <TextInput
          value={deckTitle}
          placeholder="Deck Title"
          onChangeText={text => this.handleChange(text)}
          style={styles.textInput}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleSubmit}
          disabled={isSubmitDisabled}
        >
          <Text style={styles.textButton}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect()(NewDeckScreen);
