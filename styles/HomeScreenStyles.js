import {StyleSheet} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import CommonStyleSheet from './CommonStyles';

export default StyleSheet.create({
  scrollView: {
    backgroundColor: '#e7e7e7',
    flex: 1
  },
  fnacContainer: {
    backgroundColor: CommonStyleSheet.fnac.color,
    height: 180,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  uneEnvieParticuliereText: {
    color: 'white',
    fontSize: responsiveFontSize(4.5)
  },
  uneEnvieParticuliereView: {
    paddingBottom: 15
  },
  flatList: {
    margin: 4,
    marginBottom: 0,
    flex: 1,
    backgroundColor: '#e7e7e7'
  },
  buttonView: {
    padding: 4
  }
});
