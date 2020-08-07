import React from 'react';
import {View} from 'react-native';
import Star from './Star';
import { UserReviews } from '../helpers/interfaces';
import StyleSheet from '../styles/RenderItemInListStyles'

interface Props {
	userReviewSummary: UserReviews,
}

export default class Review extends React.PureComponent<Props,any> {
	render() {
		if (!this.props.userReviewSummary) {
			return <View style={StyleSheet.reviewMainView} />;
		}
		let note = this.props.userReviewSummary.AverageRating;
		return (
			<View style={StyleSheet.reviewMainView}>
				<View style={StyleSheet.reviewStarView}>
					{[0, 1, 2, 3, 4].map((number) => <Star value={note - number} />)}
				</View>
			</View>
		);
	}
}