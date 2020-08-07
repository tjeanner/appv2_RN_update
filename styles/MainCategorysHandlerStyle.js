import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  row: {
    paddingLeft: 10,
    marginTop: 2,
    marginBottom: 2,
    marginLeft: 0,
    marginRight: 0,
    height: 60,
    backgroundColor: '#ffffff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  imageView: {
    width: 35,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  textView: {
    flex: 4,
    justifyContent: 'center'
  },
  text: {
    fontSize: 16
  },
  arrowImageView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 60,
    marginRight: 15,
    width: 35
  }
});
