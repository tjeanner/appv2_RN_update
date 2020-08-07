import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import RNFS, { ReadDirItem } from 'react-native-fs'
import Button from '../components/MyButton';


interface State{
    isLoading: boolean,
    files: string[],
}

export default class TestLocalFilesScreen extends React.Component<any,State> {
    constructor(props){
        super(props)

        this.state = {
            isLoading: true,
            files:null
        }
    }

    async componentDidMount(){
        let files = await RNFS.readDir(RNFS.CachesDirectoryPath);
        let paths = files.map(file => file.path);
        this.setState({
            isLoading:false,
            files:paths,
        });
    }


    render(){
        if(this.state.isLoading)
            return <ActivityIndicator />
        return (
            <View style={{flexDirection:'column'}}>
            <FlatList
                data={this.state.files}
                renderItem={({item}) => <Text>{item}</Text>}
            />
            <Button onPress={this.componentDidMount.bind(this)} title="Refresh" />
            </View>
        )
    }
}
