import React from 'react';
import {View, Text} from 'react-native';
import { InfosPrice } from '../helpers/interfaces';


interface Props {
	infosPrice: InfosPrice,
	size: number
}

//Todo: Revoir ventes flash, used to be in ComponentDidMount but used undefined object
//Actually i'm not even sure Flash Sales even exist in switzerland
//8.50+1.30=10.20+10=10.30+1.30=12.00
export default class FlashSaleProgression extends React.Component<Props,any> {
	_interval;
	constructor(props) {
		super(props);
		this.state = {valid: false};
	}

	shouldComponentUpdate() {
		if (this.state.seconds === 0) {
			//TODO: this looks like  a memory leak
			this.setState(prevState => ({
				minutes:
					prevState.minutes > 0
						? prevState.minutes - 1
						: prevState.hours > 0 || prevState.days > 0
						? 59
						: 0,
				hours: prevState.minutes === 0 ? prevState.hours > 0 ? prevState.hours - 1 : (prevState.days > 0 ? 23 : 0) : prevState.hours,
				days: prevState.hours === 0 && prevState.days >= 0 ? prevState.days - 1 : prevState.days,
				valid: prevState.days >= 0 ? prevState.valid : false
			}));
		}
		return true;
	}

	componentWillUnmount(){
		clearInterval(this._interval)
	}

	componentDidMount() {
		if (this.props.infosPrice.MainOffer.PromotionType == 'FlashSale') {
			let date = this.props.infosPrice.MainOffer.ArticleOpcInfo.FlashSaleEndDate;
			//TODO: Magic numbers
			date = date.substr(date.length - 11, 11);
			var today = new Date();
			var end = new Date();
			end.setMonth(Number(date.substr(0, 5).split('.')[1]) - 1);
			end.setDate(Number(date.substr(0, 5).split('.')[0]));
			end.setHours(Number(date.substr(6, 5).split('H')[0]), Number(date.substr(6, 5).split('H')[1]), 0, 0);
			let days = (end.getDate() - today.getDate() + 31) % 31;
			let hours = (end.getHours() - today.getHours() + 24) % 24;
			let minutes = (end.getMinutes() - today.getMinutes() + 60 + 59) % 60;
			let seconds = (end.getSeconds() - today.getSeconds() + 60 + 58) % 60;
			this.setState({seconds: seconds, minutes: minutes, hours: hours, days: days, valid: true});
			this._interval = setInterval(() => {
				this.setState(prevState => ({seconds: (prevState.seconds + 59) % 60}));
			}, 1000);
		}
	}

	render() {
		if (this.state.valid) {
			return (
				<View
					style={{
						height: 15,
						marginTop: 0,
						marginLeft: 15,
						marginRight: 15,
						flexDirection: 'column',
						alignItems: 'center'
					}}
				>
					<Text style={{fontSize: 10, color: 'red', fontFamily: 'Courier'}}>
						{'reste ' +
							this.state.days.toString() +
							'j ' +
							this.state.hours.toString() +
							'h ' +
							this.state.minutes.toString() +
							'm ' +
							this.state.seconds.toString() +
							's '}
					</Text>
					<View
						style={{
							backgroundColor: '#e7e7e7',
							width: this.props.size,
							height: 5,
							flexDirection: 'row',
							justifyContent: 'flex-end'
						}}
					>
						<View style={{backgroundColor: 'red', height: 5, width: this.props.size * (1.0 - this.pourcent)}} />
					</View>
				</View>
			);
		}
		return (
			<View style={{height: 15, marginTop: 0, marginLeft: 15, marginRight: 15, flexDirection: 'column'}}>
				<Text style={{fontSize: 10, color: 'red'}}>{''}</Text>
				<View style={{height: 5}} />
			</View>
		);
	}
}
