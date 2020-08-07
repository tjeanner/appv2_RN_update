import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import {fontMaker} from '../components/fontMaker';

export default StyleSheet.create({
  textStoreName:{
    fontSize:14,
    color:'black',
	...fontMaker({weight:'Bold'})
  },
  textadress:{
    color:'#aaaaaa',
    fontSize:11,
  },
  isOpen:{
    height:20,
  },
  mainContainer:{
    marginTop:2,
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:20,
    paddingRight:0,
    backgroundColor:'white',
    flexDirection:'column',
  },
});
