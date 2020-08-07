import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import CommonStyleSheet from './CommonStyles';

export default StyleSheet.create({
  fnacContainer:{
    backgroundColor:CommonStyleSheet.fnac.color,
    height:180,
    padding:20,
    flexDirection:'column',
    justifyContent:'flex-end'
  },
  uneEnvieParticuliereView:{
    height:60,
    flexDirection:'column',
    justifyContent:'flex-end',
    padding:8,
  },
  envieParticuliereText:{
    color:"white",
    fontSize:24,
  },
  textInputView:{
    height:40,
    borderRadius:3,
    backgroundColor:'#8a6701',
    marginBottom:5,
  },
  row:{
    backgroundColor:'pink',
    padding:2,
  },
  textView:{
    backgroundColor:'white',
    padding:2,
  },
  text:{
    textAlign:'center',
    fontSize:12,
  },
  image:{
    width:120,
    height:120,
  },
  imageView:{
    backgroundColor:'white',
  },
  FLcontainer:{
    margin:4,
    flex:1,
    backgroundColor:'#e7e7e7',
  },
  FLrow:{
    paddingLeft:10,
    marginTop:2,
    marginBottom:2,
    marginLeft:0,
    marginRight:0,
    height:60,
    backgroundColor:'#ffffff',
    flex:1,
    flexDirection:'row',
//    justifyContent:'space-between',
    alignItems:'center',
  },
  FLimageView:{
     flex:1,
   width:50,
    backgroundColor:'pink',
  },
  FLrest:{
    flex:10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'white',
  },
  FLitemImage:{
    flex:1,
    height:undefined,
    width:undefined,
    resizeMode:"contain",
  },
  FLtextView:{
    //flex:4,
//    justifyContent:'center',
    backgroundColor:'pink',
  },
  FLtext:{
    fontSize:16,
    color:'black',
  },
  FLarrowImageView:{
    flex:1,
  width:50,
//  flexDirection:'row',
//  justifyContent:'flex-end',
//  alignItems:'center',
//    height:60,
    backgroundColor:'green',
    marginRight:15,
  },
  /*FLarrowImage:{
    //flex:1,
    height:25,
    width:25,
    resizeMode:"contain",
  },*/
});
