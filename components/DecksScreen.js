import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { fetchDecks } from '../utils/api';
import DecksList from './DecksList';

class DecksScreen extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    fetchDecks()
      .then(decks => dispatch(receiveDecks(decks)));
  }

  render() {
    const { decks, navigation } = this.props;
    return (
      <View>
        <DecksList
          decks={Object.keys(decks).map(key => decks[key])}
          navigation={navigation}
        />
      </View>
    );
  }
}

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(
  mapStateToProps,
)(DecksScreen);
