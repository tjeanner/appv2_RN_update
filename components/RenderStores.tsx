import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import Text from './MyText';
import IsStoreOpen from './IsStoreOpen';
import {FullPageActivityIndicator} from './MyActivityIndicator';
import StyleSheet from '../styles/StoresScreenStyles';
import { Store, MyTimeTable } from '../helpers/interfaces';
import { NavigationScreenProp } from 'react-navigation';
import { Timetable } from '../helpers/interfaces'

interface Props {
  item: Store,
	navigation: NavigationScreenProp<any, any>,
}

interface State {

}

export default class RenderStores extends React.PureComponent<Props,State> {
  _schedule:MyTimeTable[];
  constructor(props) {
    super(props);
    this._schedule = null;
    this.manageSchedule();
    this.goDetailScreen = this.goDetailScreen.bind(this);
  }

  goDetailScreen(store:Store){
    this.props.navigation.navigate('Details', {
      store:store,
      schedule:this._schedule
    });
  }

  //Not reaaally sure what's going on in there but it's not broken at least
  manageSchedule() {
    const {item} = this.props;
    var newSched:MyTimeTable[] = [];
    item.Timetables.forEach((timetable, index) => {
      let thisDay = new Date();
      thisDay.setDate(
        thisDay.getDate() -
          ((thisDay.getDay() + 6) % 7) +
          ((timetable.DayOfWeek + 6) % 7)
      );
      thisDay.setHours(0, 0, 0, 0);
      let tmp:MyTimeTable = {
        DayOfWeek: 0,
        OpeningPeriods: [],
        IsOpened: false,
        IsExcept: false
      };
      newSched[index] = tmp;
      newSched[index].DayOfWeek = timetable.DayOfWeek;
      newSched[index].OpeningPeriods = timetable.OpeningPeriods;
      newSched[index].IsOpened =
        timetable.OpeningPeriods.length > 0 ? true : false;
      item.TimetableExceptionnals.forEach((elem,index) => {
        let dateArray = elem.Day.substr(0, 10).split('-');
        let date = new Date(dateArray[1] + '/' + dateArray[2] + '/' + dateArray[0]);
        if (date.getTime() === thisDay.getTime()) {
          newSched[index].OpeningPeriods = elem.OpeningPeriods;
          newSched[index].IsOpened =
            elem.OpeningPeriods.length > 0 ? true : false;
          newSched[index].IsExcept = true;
        }
      });
    });
    this._schedule = newSched;
  }

  render() {
    const {item} = this.props;
    return (
      <TouchableOpacity onPress={() => this.goDetailScreen(item)}>
        <View style={StyleSheet.mainContainer}>
          <View>
            <Text style={StyleSheet.textStoreName}>{item.StoreName.substr(0, 5) == 'Fnac ' ? item.StoreName.substr(5) : item.StoreName}</Text>
          </View>
          <View style={StyleSheet.isOpen}>
            <IsStoreOpen schedule={this._schedule} />
          </View>
          <View>
            <Text style={StyleSheet.textadress}>{item.StoreAddress.Line1}</Text>
            <Text style={StyleSheet.textadress}>
              {item.StoreAddress.ZipCode + ', ' + item.StoreAddress.City}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
