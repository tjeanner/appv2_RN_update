import React from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux'

import { ItemRepresentation_large, AvailabilitySimple, Store } from '../helpers/interfaces';
import { NavigationScreenProp } from 'react-navigation';
import { getItemAvailabilityInStores, getStoresList } from '../helpers/StoreService';
import { FullPageActivityIndicator } from '../components/MyActivityIndicator';
import StyleSheet from '../styles/StoresScreenStyles';
import RenderStores from '../components/RenderStores';
import RenderStoreAvailability from '../components/RenderStoreAvailability';
import { Dispatch } from 'redux';



interface Props {
  navigation: NavigationScreenProp<any, any>,
  stores:Store[],
  dispatch: Dispatch,
}

interface State {
  isLoading:boolean,
  data: {
    store: Store,
    availability: AvailabilitySimple,
}[]
  item:ItemRepresentation_large
}

class ItemAvailabilityInStores extends React.PureComponent<Props,State> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data:null,
      item: this.props.navigation.getParam('item'),
    };

    this.loadAvailabilities = this.loadAvailabilities.bind(this);
    this.renderAvailabilities = this.renderAvailabilities.bind(this);
  }

  componentDidMount(){
    this.loadAvailabilities();
  }

  async loadAvailabilities(){

    let availabilities = await getItemAvailabilityInStores(this.state.item.Prid.Id, this.state.item.Prid.Catalog, this.props.stores);

    let data = this.props.stores.map(store =>  {
      return {
        store:store,
        availability: availabilities.find(availability => availability.RefGU.toString() == store.StoreGu)
      }
    })
    this.setState({
      isLoading: false,
      data: data
    });
  }

  renderAvailabilities({item}){
    let infos = item as {
      store: Store;
      availability: AvailabilitySimple;
  }

    return (
      <View style={{backgroundColor:'white', flexDirection: 'row', alignItems: 'center', paddingBottom:20}}>
        <View style={{ flex: 3 }}>
          <RenderStores item={infos.store} navigation={this.props.navigation} />
        </View>
        <RenderStoreAvailability availability={infos.availability} />
      </View>
    );
  }


  render() {
    if(this.state.isLoading){
        return <FullPageActivityIndicator/>
    }

    return (
      <FlatList
      style={StyleSheet.flatlist}
      data={this.state.data}
      renderItem={this.renderAvailabilities}
      keyExtractor={item => item.store.StoreId.toString()}
    />
     
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stores:state.stores
  }
}

export default connect(mapStateToProps)(ItemAvailabilityInStores)
