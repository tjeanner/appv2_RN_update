import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import CommonStyleSheet from './CommonStyles';

export default StyleSheet.create({
  nameView:{
    backgroundColor:CommonStyleSheet.fnac.color,
    height:40,
    padding:5,
  },
  nameText:{
    color:'white',
    textAlign:'center',
    fontSize:22,
  },
  valableJusquView:{
    height:30,
    paddingBottom:10,
  },
  valableJusquText:{
    textAlign:'center',
    color:'black',
  },
  codeBarContainer:{
    backgroundColor: 'white',
    flex:1,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:"center",
  }
});
