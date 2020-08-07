import React from 'react';
import {
	View,
	FlatList,
	ScrollView,
	TouchableOpacity,
	Platform,
	Linking,
	LayoutAnimation,
	Image,
	Dimensions
} from 'react-native';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Mapbox from '@react-native-mapbox-gl/maps';

import Text from '../components/MyText';
import IsStoreOpen from '../components/IsStoreOpen';
import StyleSheet from '../styles/StoresScreenDetailStyles';
import { months, weekDays } from '../helpers/Tools';
import { fontMaker } from '../components/fontMaker';
import { setAndroidAnimation } from '../helpers/Tools';
import { FullPageActivityIndicator } from '../components/MyActivityIndicator';
import CommonStyleSheet from '../styles/CommonStyles';
import { Store, MyTimeTable, Timetable, StoreEvent } from '../helpers/interfaces';
import { getStoreEvents } from '../helpers/StoreService';
const Height_Layout = Dimensions.get('window').height;



interface State {
	isLoading: boolean,
	longitude: number,
	latitude: number,
	store: Store,
	schedule: MyTimeTable[]
	entries: StoreEvent[],
}

//TODO : Ios mapbox linkage : https://github.com/react-native-mapbox-gl/maps/blob/master/ios/install.md
export default class StoresScreenDetail extends React.PureComponent<any, State> {
	_mapBox;
	constructor(props) {
		super(props);
		this.state = {
			entries: null,
			isLoading: true,
			longitude: 0,
			latitude: 0,
			store: this.props.navigation.getParam('store'),
			schedule: this.props.navigation.getParam('schedule'),
		};
		this.renderEvents = this.renderEvents.bind(this);
		this.phoneCall = this.phoneCall.bind(this);
		this.parseLocalisation = this.parseLocalisation.bind(this);
		this.getDirections = this.getDirections.bind(this);
		this.renderSchedule = this.renderSchedule.bind(this);
		this.getEvents = this.getEvents.bind(this);
		this.goEventPage = this.goEventPage.bind(this);
		this.renderOpeningPeriods = this.renderOpeningPeriods.bind(this);
		this.renderExceptionalClosure = this.renderExceptionalClosure.bind(this);
		this.dateFormatConverter = this.dateFormatConverter.bind(this);
		setAndroidAnimation();
	}
	static navigationOptions = ({ navigation }) => {
		return {
			headerTitle: 'FNAC ' + navigation.getParam('store').StoreName,
			headerTitleStyle: {
				...fontMaker({weight: 'Bold'})
			  },
		};
	};

	componentDidMount() {
		Mapbox.setAccessToken(
			'pk.eyJ1IjoidGplYW5uZXIiLCJhIjoiY2puYnJlbDF1MGM0MjNra2ducTJobGwxNSJ9.6YJZZZdZGPgYYrNQluqCmQ'
		);
		this.parseLocalisation();
		this.getEvents();
	}

	async getEvents() {
		let data = await getStoreEvents(this.state.store.StoreId);

		this.setState({
			entries: data,
			isLoading: false
		});
	}

	phoneCall(num) {
		Communications.phonecall(num.toString(), false);
	}

	parseLocalisation() {
		let tmp = this.state.store.GeoLocalizationAddress.toString();
		tmp = tmp.substring(1, tmp.length - 1);
		tmp = tmp.replace(' ', '');
		let latitude = tmp.substring(0, tmp.indexOf(','));
		let longitude = tmp.substring(tmp.indexOf(',') + 1, tmp.length);
		this.setState({
			latitude: Number(latitude),
			longitude: Number(longitude)
		});
	}

	getDirections(fullName) {
		const scheme = Platform.select({
			ios: 'maps:0,0?q=',
			android: 'geo:0,0?q='
		});
		const latLng = `${this.state.latitude},${this.state.longitude}`;
		const label = fullName;

		const url = Platform.select({
			ios: `${scheme}${label}@${latLng}`,
			android: `${scheme}${latLng}(${label})`
		});
		Linking.canOpenURL(url).then(supported => {
			if (supported) {
				Linking.openURL(url);
			} else {
				console.log("Don't know how to open URI: " + url);
			}
		});
	}

	renderSchedule({ item }) {
		let timeTable = item as Timetable;
		let thisDay = new Date();
		let day = thisDay.getDay();
		thisDay.setDate(thisDay.getDate() - day + ((timeTable.DayOfWeek + 6) % 7) + 1);
		thisDay = new Date(thisDay);
		thisDay.setHours(0, 0, 0, 0);
		let exceptionalClosure = this.state.store.TimetableExceptionnals as MyTimeTable[];
		let normal = true;
		let closure = null;
		exceptionalClosure.forEach(elem => {
			let dateArray = elem.Day.substr(0, 10).split('-');
			let date = new Date(dateArray[1] + '/' + dateArray[2] + '/' + dateArray[0]);
			if (date.getTime() == thisDay.getTime()) {
				normal = false;
				closure = elem;
			}
		});
		let display = null;
		if (!normal) {
			display = closure.IsOpened
				? Number(closure.OpeningPeriods[0].Opening.substring(0, 2)) +
				closure.OpeningPeriods[0].Opening.substring(2, 5) +
				' - ' +
				closure.OpeningPeriods[0].Closing.substring(0, 5)
				: 'FERMÉ';
		} else if (item.OpeningPeriods.length > 0) {
			display =
				Number(item.OpeningPeriods[0].Opening.substring(0, 2)) +
				item.OpeningPeriods[0].Opening.substring(2, 5) +
				' - ' +
				item.OpeningPeriods[0].Closing.substring(0, 5);
		} else {
			display = 'Fermé';
		}
		let mainContainer =
			item.DayOfWeek === day
				? StyleSheet.mainContainer2
				: StyleSheet.mainContainer;
		let textSchedule =
			item.DayOfWeek === day
				? StyleSheet.textSchedule2
				: StyleSheet.textSchedule;
		return (
			<View style={mainContainer}>
				<View>
					<Text style={textSchedule}>
						{weekDays[item.DayOfWeek].charAt(0).toUpperCase() +
							weekDays[item.DayOfWeek].slice(1)}
					</Text>
				</View>
				<View>
					<Text
						style={[
							textSchedule,
							normal ? {} : { color: 'red', ...fontMaker({ weight: 'Bold' }) }
						]}
					>
						{display}
					</Text>
				</View>
			</View>
		);
	}

	renderAnnotations() {
		return (
			<Mapbox.PointAnnotation
				key="pointAnnotation"
				id="pointAnnotation"
				coordinate={[this.state.longitude, this.state.latitude]}
			>
				<View
					style={{
						width: 40,
						height: 54,
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'flex-start',
						backgroundColor: 'transparent'
					}}
				>
					{/*<View style={{width: 30,height: 30,borderRadius: 15,backgroundColor: 'black',transform: [{ scale: 0.6 }],}} />*/}
					<View style={{ backgroundColor: 'transparent', height: 32 }}>
						<Icon name="map-marker-alt" size={30} color="black" />
					</View>
				</View>
				<Mapbox.Callout title="Fnac" />
			</Mapbox.PointAnnotation>
		);
	}

	goEventPage(item) {
		const url = 'http://suisse.fnac.ch/rdv/event/' + item.event_id.toString();
		Linking.canOpenURL(url).then(supported => {
			if (supported) {
				Linking.openURL(url);
			} else {
				console.log("Don't know how to open URI: " + url);
			}
		});
	}

	renderEvents({ item }) {
		let event = item as StoreEvent;
		return (
			<TouchableOpacity onPress={() => this.goEventPage(event)}>
				<View
					style={{
						height: 120,
						flexDirection: 'row',
						backgroundColor: 'grey',
						margin: 4,
						marginBottom: 0
					}}
				>
					<View style={{ backgroundColor: 'white' }}>
						<Image
							source={{
								uri:
									'https://suisse.fnac.ch/files/rdv/events/' +
									event.id +
									'/images/' +
									event.path
							}}
							style={{ height: 120, width: 120 }}
						/>
					</View>
					<View
						style={{
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'flex-start',
							paddingLeft: 10
						}}
					>
						<Text
							style={{
								fontSize: 16,
								color: CommonStyleSheet.fnac.color,
								...fontMaker({ weight: 'SemiBold' })
							}}
						>
							{event.type_name}
						</Text>
						<Text
							style={{
								fontSize: 17,
								color: 'white',
								...fontMaker({ weight: 'SemiBold' })
							}}
						>
							{event.title_event}
						</Text>
						<Text style={{ fontSize: 11, color: '#e7e7e7' }}>{this.dateFormatConverter(event)}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}

	dateFormatConverter(elem){
		var dateExploded = elem.debut.split('-');
		var month = months[parseInt(dateExploded[1]) - 1];
		var newDate = new Date(parseInt(dateExploded[0]), parseInt(dateExploded[1]) - 1, parseInt(dateExploded[2]));
		var day = weekDays[newDate.getDay()];
		var hours = elem.time_start;
		var final = day.substr(0, 1).toUpperCase() + day.substr(1, 100) + ' ' + parseInt(dateExploded[2]) + ' ' + month + ' ' + parseInt(dateExploded[0]) + ' à ' + hours.split(':')[0] + ' H';
		return final
	}

	renderOpeningPeriods(item) {
		item = item.item;
		let open = item.Opening.split(':');
		let close = item.Closing.split(':');
		return (
			<View>
				<Text
					style={{
						marginRight: 20,
						color: 'red',
						...fontMaker({ weight: 'SemiBold' })
					}}
				>
					{Number(open[0]) +
						':' +
						open[1] +
						' - ' +
						Number(close[0]) +
						':' +
						close[1]}
				</Text>
			</View>
		);
	}

	renderExceptionalClosure(item) {
		item = item.item;
		let dateArray = item.Day.substr(0, 10).split('-');
		let date = new Date(dateArray[1] + '/' + dateArray[2] + '/' + dateArray[0]);
		let Elem = null;
		if (item.IsOpened) {
			Elem = (
				<FlatList
					data={item.OpeningPeriods}
					renderItem={this.renderOpeningPeriods}
					keyExtractor={index => index.toString()}
				/>
			);
		} else {
			Elem = (
				<Text
					style={{
						color: 'red',
						marginRight: 20,
						...fontMaker({ weight: 'SemiBold' })
					}}
				>
					{'FERMÉ'}
				</Text>
			);
		}
		return (
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<Text
					style={{
						color: 'red',
						marginLeft: 20,
						...fontMaker({ weight: 'SemiBold' })
					}}
				>
					{'Le ' +
						weekDays[date.getDay()] +
						' ' +
						Number(dateArray[2]) +
						' ' +
						months[dateArray[1] - 1] +
						' ' +
						dateArray[0] +
						' :'}
				</Text>
				{Elem}
			</View>
		);
	}

	render() {
		if(this.state.isLoading){
			return <FullPageActivityIndicator />
		}
		let Elem = (
			<Mapbox.MapView
				ref={component => this._mapBox = component}
				styleURL={Mapbox.StyleURL.Street}
				style={{ flex: 1 }}
			>
				<Mapbox.Camera
					zoomLevel={14}
					centerCoordinate={[this.state.longitude, this.state.latitude]}
				/>
				{this.renderAnnotations()}
			</Mapbox.MapView>
		);
		let eventsElem = null;
		if (this.state.entries && this.state.entries.length > 0) {
			eventsElem = (
				<View>
					<Text style={{ color: 'black', fontSize: 18, margin: 20 }}>
						ÇA SE PASSE DANS VOTRE FNAC
					</Text>
					<FlatList
						style={StyleSheet.flatList}
						data={this.state.entries}
						renderItem={this.renderEvents}
						keyExtractor={item => item.id.toString()}
					/>
				</View>
			);
		} else {
			eventsElem = null;
		}
		let closureDaysElem = null;
		if (this.state.store.TimetableExceptionnals.length > 0) {
			closureDaysElem = (
				<View>
					<Text
						style={{
							marginLeft: 20,
							marginTop: 10,
							...fontMaker({ weight: 'SemiBold' })
						}}
					>
						Horaires exceptionnels :
					</Text>
				</View>
			);
		} else {
			closureDaysElem = null;
		}

		return (
			<View style={{ flex: 1 }}>
				<ScrollView style={StyleSheet.ScrollView}>
					<View style={{ height: 194, overflow: 'hidden', marginTop: this.state.isLoading ? -194 : 0 }}>
						<View style={{ height: 194 }}>{Elem}</View>
					</View>
					<View style={{ marginTop: this.state.isLoading ? Height_Layout : 0 }}>
						<View style={StyleSheet.scheduleAddressContainer}>
							<View style={StyleSheet.isStoreOpen}>
								<IsStoreOpen schedule={this.props.navigation.state.params.schedule} />
							</View>
							<View style={StyleSheet.scheduleFlatList}>
								<FlatList
									data={this.state.store.Timetables}
									renderItem={this.renderSchedule}
									keyExtractor={item => item.DayOfWeek.toString()}
								/>
							</View>
							{closureDaysElem}
							<FlatList
								data={this.state.store.TimetableExceptionnals}
								renderItem={this.renderExceptionalClosure}
								keyExtractor={item => item.Day}
							/>
							<View style={StyleSheet.address}>
								<Text>{this.state.store.StoreAddress.Line1}</Text>
								<Text>
									{this.state.store.StoreAddress.ZipCode + ', ' + this.state.store.StoreAddress.City}
								</Text>
							</View>
						</View>
						<View style={StyleSheet.buttonsAndEventsView}>
							<View style={StyleSheet.buttonsView}>
								<TouchableOpacity
									style={StyleSheet.phoneButton}
									onPress={() => this.phoneCall(this.state.store.StoreTel)}
								>
									<View style={StyleSheet.phoneButtonView}>
										<Icon
											style={{ transform: [{ rotateY: '180deg' }] }}
											name="phone"
											size={25}
											color="black"
										/>
										<Text style={StyleSheet.phoneButtonText}>Téléphone</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity
									style={StyleSheet.mapButton}
									onPress={() =>
										this.getDirections(
											this.state.store.FullName
										)
									}
								>
									<View style={StyleSheet.mapButtonView}>
										<Icon
											style={{ transform: [{ rotateY: '180deg' }] }}
											name="route"
											size={30}
											color="black"
										/>
										<Text style={StyleSheet.mapButtonText}>Y aller</Text>
									</View>
								</TouchableOpacity>
							</View>
						</View>
						{eventsElem}
					</View>
				</ScrollView>
			</View>
		);
	}
}
