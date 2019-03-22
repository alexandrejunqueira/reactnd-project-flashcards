import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, FlatList, TouchableHighlight, StyleSheet,
} from 'react-native';
import { bluishWhite, gray } from '../utils/colors';

const styles = StyleSheet.create({
  list: {
  },
  listItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: bluishWhite,
  },
  title: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  cards: {
    color: gray,
  },
});

const DecksList = ({ decks, navigation }) => (
  <FlatList
    data={decks}
    renderItem={({ item }) => (
      <TouchableHighlight
        onPress={() => {
          navigation.navigate('Deck', { deckTitle: item.title });
        }}
        underlayColor={bluishWhite}
      >
        <View style={styles.listItem}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.cards}>{`${item.questions.length} cards`}</Text>
        </View>
      </TouchableHighlight>
    )}
    keyExtractor={item => item.title}
    contentContainerStyle={styles.list}
  />
);

DecksList.propTypes = {
  decks: PropTypes.array.isRequired,
};

export default DecksList;
