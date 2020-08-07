import React from 'react';
import {
	Dimensions
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';


import { Node,  LoadPageOfItemRepresentation } from '../helpers/interfaces';
import { getItemsFromNode } from '../helpers/NodeService';
import ItemsList from '../components/ItemsList';
import { fontMaker } from '../components/fontMaker';


export const Width = Dimensions.get('window').width;
const size = (Width - 12) / 2;


interface Props {
    navigation: NavigationScreenProp<any,any>,
	}


export default class ItemsListScreen extends React.PureComponent<Props, any> {
    static navigationOptions = ({ navigation }) => {
        return {
          headerTitle: navigation.getParam('node').NodeName,
          headerTitleStyle: {
            ...fontMaker({weight: 'Bold'})
          }
        };
      };

    get dataRetriever() {
        let dataRetriever: LoadPageOfItemRepresentation = (pageIndex: number, pageSize: number = 20, nameConfiguration: string = 'large') => {
            let node:Node = this.props.navigation.getParam('node')
            return getItemsFromNode(node.Id, pageIndex, pageSize, nameConfiguration);
        }
        return dataRetriever;
    }


    render() {
        return <ItemsList 
            dataRetriever={this.dataRetriever}
            navigation={this.props.navigation}
            displayName={this.props.navigation.getParam('node').NodeName}
            />;
    }
}


