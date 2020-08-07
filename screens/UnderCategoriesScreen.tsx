import React from 'react';
import {
  View,
  FlatList,
} from 'react-native';

import Text from '../components/MyText';
import RenderUnderCats from '../components/RenderUnderCats';
import {fontMaker} from '../components/fontMaker';
import {FullPageActivityIndicator} from '../components/MyActivityIndicator';
import {getChildNodes} from '../helpers/NodeService'
import {Node, MainCategory} from '../helpers/interfaces'
import { NavigationScreenProp } from 'react-navigation';

interface State {
  isLoading: boolean,
  childs: Node[],
  list:string
}

interface Props {
	navigation: NavigationScreenProp<any,any>
}

//TODO: Render sub-categories again, maybe bring old clunky code back
export default class UnderCategoriesScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {isLoading: true, childs: null, list: null};
    this.renderItem = this.renderItem.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('category').Name,
      headerTitleStyle: {
        ...fontMaker({weight: 'Bold'})
      }
    };
  };

  componentDidMount() {
    this.loadCategories();
  }

  async loadCategories(){
    const elem:MainCategory = this.props.navigation.getParam('category');
    let childNodes = await getChildNodes(elem.Id);
    this.setState({
      isLoading: false,
      childs: childNodes
    })

  }

  renderItem({item}) {
    return (
      <RenderUnderCats
        depth={1}
        navigation={this.props.navigation}
        item={item as Node}
      />
    );
  }

  renderSectionHeader({section: {title}}) {
    return (
      <View
        style={{
          height: 50,
          paddingLeft: 10,
          backgroundColor: '#e7e7e7',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}
      >
        <Text style={{color: 'black'}}>{title}</Text>
      </View>
    );
  }

 
  render() {
    const {elem} = this.props.navigation.state.params;
    if (this.state.isLoading) {
      return <FullPageActivityIndicator />;
    }
    else {
      return (
        <FlatList
          ref="flatList"
          data={this.state.childs}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => item.Id.toString()}
        />
      );
    }
  }
}
