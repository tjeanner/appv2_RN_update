import React from 'react';
import {
    View,
} from 'react-native';


import Text from '../components/MyText';
import { fontMaker } from '../components/fontMaker';

import { Media, ItemRepresentation, ItemRepresentation_large } from '../helpers/interfaces';
import { NavigationScreenProp } from 'react-navigation';



interface Props {
    item: ItemRepresentation_large
}


export default class ItemLabel extends React.PureComponent<Props, any> {
    render() {
        let Elem = null;
        if (this.props.item.IsTechnical) {
            Elem = (
                <View style={{flex:1, flexDirection:"column", justifyContent:'flex-start'}} >
                    <Text style={{ ...fontMaker({ weight: 'Bold' }) }}>{this.props.item.Title}</Text>
                    <Text
                        style={{
                            color: 'grey',
                            ...fontMaker({ weight: 'Semibold' })
                        }}
                    >
                        {this.props.item.ItemType}
                    </Text>
                    <Text
                        style={{
                            color: 'grey',
                            ...fontMaker({ weight: 'Semibold' })
                        }}
                    >
                        {this.props.item.Brand &&
                            this.props.item.Brand.BrandName}
                    </Text>
                </View>
            );
        } else if  (this.props.item.Participants){
            //Here some code wanted to make a string out of all ItemRepresentation.Participants
            let ParticipantsName = this.props.item.Participants.map(participant => {
                return participant.ParticipantName;
            });
            let participantsString = ParticipantsName.join(', ')

            Elem = (
                <View style={{flex:1, flexDirection:"column", justifyContent:'flex-start'}} >
                    <Text style={{ ...fontMaker({ weight: 'Bold' }) }}>{this.props.item.DisplayName}</Text>
                    <Text
                        style={{
                            color: 'grey',
                            ...fontMaker({ weight: 'Semibold' })
                        }}
                    >
                        {participantsString}
                    </Text>
                </View>
            );
        }
        return Elem;
    }
}