import React from 'react';
import {View} from 'react-native';
import {FullPageActivityIndicator} from './MyActivityIndicator';

import Text from './MyText';
import StyleSheet from '../styles/IsStoreOpenStyles';
import {weekDays, toggleState} from '../helpers/Tools';
import { MyTimeTable } from '../helpers/interfaces';

interface State{
  date: Date,
  dateUpdate:boolean,
}

interface Props{
  schedule:MyTimeTable[]
}

export default class IsStoreOpen extends React.Component<Props,State> {
  _interval;
  toggleState;
  constructor(props) {
    super(props);
    this.state = {date: new Date(), dateUpdate: false};
    this.toggleState = toggleState.bind(this);
  }

  componentDidMount(){
    this._interval = setInterval(() => {
      	this.toggleState('dateUpdate');
    }, 1000);
  }

  componentWillUnmount(){
    clearInterval(this._interval)
  }

  shouldComponentUpdate() {
    let date = new Date();
    if (date.getMinutes() !== this.state.date.getMinutes()) {
	    this.setState({date: date});
  	    return true;
    }
    return false;
  }

  render() {
    if (!this.props.schedule) {
      return <FullPageActivityIndicator />;
    }
    let date = this.state.date;
    let openTime = new Date();
    let closeTime = new Date();
    let day = date.getDay();
    var todaySchedule;
    var tomorrowIncr;
    todaySchedule = this.props.schedule.find(sched => sched.DayOfWeek === day);
    tomorrowIncr = (day + 1) % 7;

    let currTime = date;
    if (todaySchedule.OpeningPeriods.length > 0) {
      let hourexplode = todaySchedule.OpeningPeriods[0].Opening.split(':');
      openTime.setHours(hourexplode[0], hourexplode[1], 0, 0);
      hourexplode = todaySchedule.OpeningPeriods[0].Closing.split(':');
      closeTime.setHours(hourexplode[0], hourexplode[1], 0, 0);
    }
    var bullet = '\u25CF';

    let StatusText = <Text style={StyleSheet.close}>{bullet} Fermé</Text>;
    let ComplementText = null;
    if (
      todaySchedule.OpeningPeriods.length > 0 &&
      openTime <= currTime &&
      currTime < closeTime
    ) {
      StatusText = <Text style={StyleSheet.open}>{bullet} Ouvert</Text>;
      ComplementText =
        " - Aujourd'hui jusqu'à " +
        todaySchedule.OpeningPeriods[0].Closing.substring(0, 5);
    } else if (todaySchedule.OpeningPeriods.length > 0 && openTime > currTime) {
      ComplementText =
        " - Ouvert aujourd'hui à " +
        todaySchedule.OpeningPeriods[0].Opening.substring(0, 5);
    } else {
      while (
        !this.props.schedule.find(sched => sched.DayOfWeek === tomorrowIncr)
          .IsOpened
      )
        tomorrowIncr = (tomorrowIncr + 1) % 7;
      ComplementText =
        ' - Ouvert ' +
          (tomorrowIncr === (day + 1) % 7 ? 'demain' : weekDays[tomorrowIncr]) +
        ' à ' +
        this.props.schedule
          .find(sched => sched.DayOfWeek === tomorrowIncr)
          .OpeningPeriods[0].Opening.substring(0, 5);
    }
    return (
      <View style={StyleSheet.view}>
        <View>{StatusText}</View>
        <View>
          <Text>{ComplementText}</Text>
        </View>
      </View>
    );
  }
}
