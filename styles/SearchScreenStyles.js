import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import CommonStyleSheet from './CommonStyles';

export default StyleSheet.create({
  fnacContainer:{
    backgroundColor:CommonStyleSheet.fnac.color,
    height:180,
    padding:20,
    flexDirection:'column',
    justifyContent: 'flex-start'
  },
  uneEnvieParticuliereView:{
    paddingBottom:15,
  },
  uneEnvieParticuliereText:{
    color:"white",
    fontSize: responsiveFontSize(4.5),
  },
  flatList:{
    margin:4,
    flex:1,
    backgroundColor:'#e7e7e7',
  },
});
