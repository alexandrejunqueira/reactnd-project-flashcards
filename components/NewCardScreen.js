import React, { Component } from 'react';
import {
  View, TextInput, StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import { connect } from 'react-redux';
import GlobalStyles from './GlobalStyles';
import { addCard } from '../actions';
import { addCardToDeck } from '../utils/api';

const localStyles = StyleSheet.create({
  view: {
    padding: 20,
  },
});

const styles = { ...GlobalStyles, ...localStyles };

class NewCardScreen extends Component {
  state = {
    question: null,
    answer: null,
    isSubmitDisabled: true,
  };

  isValidForm = () => {
    const { question, answer } = this.state;
    const isQuestionEmpty = question === null || question.split(' ').join('') === '';
    const isAnswerEmpty = answer === null || answer.split(' ').join('') === '';
    return !isQuestionEmpty && !isAnswerEmpty;
  };

  handleQuestionChange = (text) => {
    this.setState({
      question: text,
      isSubmitDisabled: !this.isValidForm(),
    });
  };

  handleAnswerChange = (text) => {
    this.setState({
      answer: text,
      isSubmitDisabled: !this.isValidForm(),
    });
  };

  handleSubmit = () => {
    if (!this.isValidForm()) {
      this.setState({
        isSubmitDisabled: true,
      });
      return;
    }

    const { deckTitle, onNavigateBack } = this.props.navigation.state.params;
    const { dispatch, navigation } = this.props;
    const { question, answer } = this.state;

    dispatch(addCard(deckTitle, { question, answer }));

    this.setState({
      question: null,
      answer: null,
      isSubmitDisabled: true,
    });

    addCardToDeck(deckTitle, { question, answer })
      .then(() => {
        onNavigateBack();
        navigation.goBack();
      });
  };

  render() {
    const { question, answer, isSubmitDisabled } = this.state;
    return (
      <View style={styles.view}>
        <TextInput
          value={question}
          placeholder="Question"
          onChangeText={text => this.handleQuestionChange(text)}
          style={styles.textInput}
        />
        <TextInput
          value={answer}
          placeholder="Answer"
          onChangeText={text => this.handleAnswerChange(text)}
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

export default connect()(NewCardScreen);
