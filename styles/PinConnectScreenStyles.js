import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import CommonStyleSheet from './CommonStyles';

export default StyleSheet.create({
  scrollView:{
    backgroundColor:'#e7e7e7',
  },
  fnacContainer:{
    backgroundColor:CommonStyleSheet.fnac.color,
    height:225,
    padding:20,
    flexDirection:'column',
    justifyContent:'flex-end',
  },
  bienvenueView:{
    marginBottom:20,
    height:105,
  },
  bienvenueEachView:{
    height:35,
  },
  bienvenueText:{
    color:"white",
    fontSize:32,
  },
  connectezVousText:{
    color:"white",
    fontSize:16,
  },
  mainContainer:{
    padding:20,
    margin:4,
    backgroundColor:"white",
  },
  VeuillezEntrerText:{
    fontSize:12,
    color:'black',
  },
  textInput:{
    backgroundColor:'white',
    fontSize:24,
    paddingBottom:20,
    marginBottom:20,
  },
  pinOublieView:{
    marginTop:15,
  },
  pinOublieText:{
    fontSize:13,
    textDecorationLine:'underline',
    color:'#c7c7c7',
  }
});
