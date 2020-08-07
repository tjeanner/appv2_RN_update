import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import {fontMaker} from '../components/fontMaker';

export default StyleSheet.create({
  view:{
    flex:1,
    flexDirection:'row',
  },
  open:{
    color:'green',
	...fontMaker({weight:'Bold'}),
  },
  close:{
    color:'red',
	...fontMaker({weight:'Bold'}),
  },
});
