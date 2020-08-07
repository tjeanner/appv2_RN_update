import React from 'react';
import {
  StyleSheet,
} from 'react-native';

export default StyleSheet.create({

    cartRecapContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding:20,
    },
    cartRecapPricesContainer:{
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    cartEmpty:{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems:'center',
    },
    cartItemContainer:{
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: 'center',
        height: 160,
    },
    itemImgContainer:{
        width: 40,
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    

});