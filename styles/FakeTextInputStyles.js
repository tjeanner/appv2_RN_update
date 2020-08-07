import {StyleSheet} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  icon: {
    marginLeft: 20,
    marginRight: 17,
    transform: [{rotateY: '180deg'}]
  },
  icon2: {
    transform: [{rotateY: '180deg'}]
  },
  text: {
    color: 'white',
    fontSize: 15,
    marginLeft: 10
  },
  mainView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 40,
    borderRadius: 3,
    backgroundColor: '#8a6701',
    marginBottom: 10,
    width: responsiveWidth(85)
  },
  mainView2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8a6701',
    width: 40
  },
  whiteBarView: {
    width: 1.5,
    height: 22,
    backgroundColor: 'white'
  }
});
