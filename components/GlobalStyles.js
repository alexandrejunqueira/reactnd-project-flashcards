import { StyleSheet } from 'react-native';
import {dodgerblue, purple, white} from '../utils/colors';

export default StyleSheet.create({
  textInput: {
    marginTop: 20,
    paddingVertical: 4,
    borderBottomColor: purple,
    borderBottomWidth: 1,
  },
  button: {
    padding: 20,
    marginTop: 20,
    backgroundColor: dodgerblue,
  },
  textButton: {
    color: white,
    textAlign: 'center',
  },
});
