import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import GlobalStyles from './GlobalStyles';
import { gray } from '../utils/colors';
import { fetchDeck } from '../utils/api';

const localStyles = StyleSheet.create({
  view: {
    padding: 20,
  },
  title: {
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cards: {
    color: gray,
    textAlign: 'center',
  },
});

const styles = { ...GlobalStyles, ...localStyles };

class DeckScreen extends Component {
  state = {
    deck: {
      title: '',
      questions: [],
    },
  };

  componentDidMount() {
    this.updateState();
  }

  handleOnNavigateBack() {
    this.updateState();
  }

  updateState() {
    const { navigation } = this.props;
    fetchDeck(navigation.state.params.deckTitle)
      .then((result) => {
        this.setState({ deck: result });
      });
  }

  render() {
    const { navigation } = this.props;
    const { deck } = this.state;

    return (
      <View style={styles.view}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.cards}>{`${deck.questions.length} cards`}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('NewCard', {
            deckTitle: deck.title,
            onNavigateBack: this.handleOnNavigateBack.bind(this),
          })}
        >
          <Text style={styles.textButton}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Quiz', { deckTitle: deck.title })}
          disabled={deck.questions.length < 1}
        >
          <Text style={styles.textButton}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default DeckScreen;
