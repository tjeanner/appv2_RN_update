import React from 'react';
import {View, Image, YellowBox } from 'react-native';
import {
  //createBottomTabNavigator,
  //createStackNavigator,
  createSwitchNavigator,
//  createAppContainer,
//  createMaterialTopTabNavigator
} from 'react-navigation';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import {Icon} from 'react-native-elements';
import { Provider } from 'react-redux';
import Store from './Store/configureStore';
import Orientation from 'react-native-orientation';
import StyleSheet from './styles/AppStyles';
import CommonStyleSheet from './styles/CommonStyles';

import HomeScreen from './screens/HomeScreen';
//import StoresScreenDetail from './screens/StoresScreenDetail';
import StoresScreen from './screens/StoresScreen';
import CardScreen from './screens/CardScreen';
import FirstConnectionScreen from './screens/FirstConnectionScreen';
import SearchScreen from './screens/SearchScreen';
import ResearchScreen from './screens/ResearchScreen';
import PinConnectScreen from './screens/PinConnectScreen';
import PinForgotScreen from './screens/PinForgotScreen';
import PinTmpConfirmScreen from './screens/PinTmpConfirmScreen';
import PinResetScreen from './screens/PinResetScreen';
import UnderCategoriesScreen from './screens/UnderCategoriesScreen';
import ItemsListScreen from './screens/ItemsListScreen';
import ShowItemsScreen from './screens/ShowItemsScreen';
import AccountScreen from './screens/AccountScreen';
import ItemDataSheetScreen from './screens/ItemDataSheetScreen';
import ItemAvailabilityInStores from './screens/ItemAvailabilityInStores';
import EditeurNoteScreen from './screens/EditeurNoteScreen';
import BasketScreen from './screens/BasketScreen';
import StoreScreenDetail from './screens/StoreScreenDetail';
import WebViewer from './screens/WebViewer'
import ScannerModal from './components/ScannerModal'
import TestLocalFilesScreen from './screens/TestLocalFilesScreen';

Orientation.lockToPortrait();

class LogoTitle extends React.PureComponent {
  render() {
    return (
      <View style={StyleSheet.logoTitleView}>
        <Image
          source={require('./assets/newLogo.jpg')}
          style={StyleSheet.logoTitleImage}
        />
      </View>
    );
  }
}

//YellowBox.ignoreWarnings(['ViewPagerAndroid']);


const HomeStack = createStackNavigator();
function MyHomeStack() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={UnderCategoriesScreen} />
      <HomeStack.Screen name="ItemsList" component={ItemsListScreen} />
      <HomeStack.Screen name="ItemScreen" component={ShowItemsScreen} />
      <HomeStack.Screen name="Caract" component={ItemDataSheetScreen} />
      <HomeStack.Screen name="Availability" component={ItemAvailabilityInStores} />
      <HomeStack.Screen name="EditeurNote" component={EditeurNoteScreen} />
    </HomeStack.Navigator>
  );
}
/*  {
    Home: HomeScreen,
    Details: UnderCategoriesScreen,
    ItemsList: ItemsListScreen,
    ItemScreen: ShowItemsScreen,
    Caract: ItemDataSheetScreen,
    Availability: ItemAvailabilityInStores,
    EditeurNote: EditeurNoteScreen
  },
  {
    defaultNavigationOptions:{
      headerTitle: <LogoTitle />,
      headerStyle: StyleSheet.headerStyle,
      headerForceInset: StyleSheet.headerForceInset
    }
  }
);*/

const SearchStack = createStackNavigator();
function MySearchStack() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Home" component={HomeScreen} />
      <SearchStack.Screen name="Research" component={ResearchScreen} />
      <SearchStack.Screen name="Details" component={UnderCategoriesScreen} />
      <SearchStack.Screen name="ItemsList" component={ItemsListScreen} />
      <SearchStack.Screen name="ItemScreen" component={ShowItemsScreen} />
      <SearchStack.Screen name="Caract" component={ItemDataSheetScreen} />
      <SearchStack.Screen name="Availability" component={ItemAvailabilityInStores} />
      <SearchStack.Screen name="EditeurNote" component={EditeurNoteScreen} />
    </SearchStack.Navigator>
  );
}
/*const SearchStack = createStackNavigator(
  {
    Home: SearchScreen,
    Research: ResearchScreen,
    Details: UnderCategoriesScreen,
    ItemsList: ItemsListScreen,
    ItemScreen: ShowItemsScreen,
    Caract: ItemDataSheetScreen,
    Availability: ItemAvailabilityInStores,
    EditeurNote: EditeurNoteScreen
  },
  {
    defaultNavigationOptions: {
      headerTitle: <LogoTitle />,
      headerStyle: StyleSheet.headerStyle,
      headerForceInset: StyleSheet.headerForceInset

    }
  }
);*/

const StoreStack = createStackNavigator();
function MyStoreStack() {
  return (
    <StoreStack.Navigator>
      <StoreStack.Screen name="Home" component={StoresScreen} />
      <StoreStack.Screen name="Details" component={StoreScreenDetail} />
    </StoreStack.Navigator>
  );
}

/*const StoresStack = createStackNavigator(
  {
    Home: StoresScreen,
    Details: StoreScreenDetail
  },
  {
    defaultNavigationOptions:  {
      headerTitle: <LogoTitle />,
      headerStyle: StyleSheet.headerStyle,
      headerForceInset: StyleSheet.headerForceInset
    }
  }
);*/

const AccountStack = createSwitchNavigator(
  {
    Home: AccountScreen,
    FirstCo: FirstConnectionScreen,
    PinCo: PinConnectScreen,
    Connected: CardScreen,
    PinTmp: PinTmpConfirmScreen,
    PinReset: PinResetScreen
  }
);

const BasketStack = createStackNavigator();
function MyBasketStack() {
  return (
    <BasketStack.Navigator>
      <BasketStack.Screen name="Home" component={BasketScreen} />
      <BasketStack.Screen name="Web" component={WebViewer} />
    </BasketStack.Navigator>
  );
}
/*const BasketStack = createStackNavigator(
  {
    Home: BasketScreen,
    Web: WebViewer
  },
  {
    defaultNavigationOptions: {
      headerTitle: <LogoTitle />,
      headerStyle: StyleSheet.headerStyle,
      headerForceInset: StyleSheet.headerForceInset
    }
  }
);*/

/*
const Test = createMaterialTopTabNavigator(
  {
    ' Home ': {
      screen: HomeStack,

      navigationOptions:{
        tabBarIcon: ({tintColor}) => (
          <Icon name="home" size={20} color={tintColor} type="font-awesome"/>
        )
      },
    },
    
    Recherche: {
      screen: SearchStack,

      navigationOptions:{
        tabBarIcon: ({tintColor}) => (
          <Icon name="search" size={20} color={tintColor} type="font-awesome"/>
        )
      },
    },
    Magasins: {
      screen: StoresStack,

      navigationOptions:{
        tabBarIcon: ({tintColor}) => (
          <Icon name="map-marker" size={20} color={tintColor} type="font-awesome"/>
        )
      },
    },
    'Ma Carte':{
      screen: AccountStack,

      navigationOptions:{
        tabBarIcon: ({tintColor}) => (
          <Image
              source={require('./assets/ic_carte_fnac.png')}
              style={StyleSheet.fnacCardIcon}
            />

        )
      },
    },

    'Mon Panier': {
      screen: BasketStack,
      
      navigationOptions:{
        tabBarIcon: ({tintColor}) => (
          <Icon name="shopping-cart" size={20} color={tintColor} type="font-awesome"/>
        )
      },
    },
  },
  
  {
    lazy: true,
    swipeEnabled: false,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: CommonStyleSheet.fnac.color,
      inactiveTintColor: 'gray',
      showIcon: true,
      upperCaseLabel: false,
      //allowFontScaling:false,
      tabStyle: StyleSheet.tabStyle,
      style: StyleSheet.tabBarStyle,
      //indicatorStyle
      labelStyle: StyleSheet.tabBarLabelStyle
    }
  }
);*/

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={MyHomeStack} />
      <Tab.Screen name="Recherche" component={MySearchStack} />
      <Tab.Screen name="Magasin" component={MyStoreStack} />
      <Tab.Screen name="Ma Carte" component={AccountStack} />
      <Tab.Screen name="Mon Panier" component={MyBasketStack} />
    </Tab.Navigator>
  );
}


//const AppContainer = createAppContainer(Test);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
      </Provider>
    );
  }
}

