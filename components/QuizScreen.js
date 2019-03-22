import React, { Component } from 'react';
import {
  View, ScrollView, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import GlobalStyles from './GlobalStyles';
import { green, red } from '../utils/colors';
import { clearLocalNotification, setLocalNotification } from '../utils/notification';


const localStyles = StyleSheet.create({
  view: {
    padding: 20,
  },
  scrollView: {
    padding: 20,
  },
  questionText: {
    fontSize: 30,
    textAlign: 'center',
  },
  answerTextButton: {
    color: red,
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  greenButton: { ...GlobalStyles.button, ...{ backgroundColor: green } },
  redButton: { ...GlobalStyles.button, ...{ backgroundColor: red, marginBottom: 60 } },
});

const styles = { ...GlobalStyles, ...localStyles };

class QuizScreen extends Component {
  componentDidMount() {
    clearLocalNotification()
      .then(setLocalNotification);
  }

  state = {
    correct: 0,
    incorrect: 0,
    currentQuestion: 0,
    showAnswer: false,
  };

  handleCorrectPress = () => {
    const { correct, currentQuestion } = this.state;
    this.setState({
      correct: correct + 1,
      currentQuestion: currentQuestion + 1,
      showAnswer: false,
    });
  };

  handleIncorrectPress = () => {
    const { incorrect, currentQuestion } = this.state;
    this.setState({
      incorrect: incorrect + 1,
      currentQuestion: currentQuestion + 1,
      showAnswer: false,
    });
  };

  handleRestartQuiz = () => {
    this.setState({
      correct: 0,
      incorrect: 0,
      currentQuestion: 0,
      showAnswer: false,
    });
  };

  toggleAnswer = () => {
    const { showAnswer } = this.state;
    this.setState({ showAnswer: !showAnswer });
  };

  render() {
    const { decks, navigation } = this.props;
    const { deckTitle } = navigation.state.params;
    const { currentQuestion, correct, incorrect, showAnswer } = this.state;
    const { questions } = decks[deckTitle];
    return (
      <ScrollView style={styles.scrollView}>
        { currentQuestion < questions.length
          ? (
            <View>
              <Text>{`${currentQuestion + 1}/${questions.length}`}</Text>
              <View style={styles.view}>
                { !showAnswer
                  ? (
                    <View>
                      <Text style={styles.questionText}>{questions[currentQuestion].question}</Text>
                      <TouchableOpacity
                        onPress={this.toggleAnswer}
                      >
                        <Text style={styles.answerTextButton}>Answer</Text>
                      </TouchableOpacity>
                    </View>
                  )
                  : (
                    <View>
                      <Text style={styles.questionText}>{questions[currentQuestion].answer}</Text>
                      <TouchableOpacity
                        onPress={this.toggleAnswer}
                      >
                        <Text style={styles.answerTextButton}>Question</Text>
                      </TouchableOpacity>
                    </View>
                  )
                }
              </View>
              <TouchableOpacity
                style={styles.greenButton}
                onPress={this.handleCorrectPress}
              >
                <Text style={styles.textButton}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.redButton}
                onPress={this.handleIncorrectPress}
              >
                <Text style={styles.textButton}>Incorrect</Text>
              </TouchableOpacity>
            </View>
          )
          : (
            <View>
              <Text>{ `Acerto: ${Math.round((correct * 100) / (correct + incorrect))}%` }</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={this.handleRestartQuiz}
              >
                <Text style={styles.textButton}>Restart Quiz</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Deck', { deckTitle })}
              >
                <Text style={styles.textButton}>Back to Deck</Text>
              </TouchableOpacity>
            </View>
          )
        }
      </ScrollView>
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
)(QuizScreen);
