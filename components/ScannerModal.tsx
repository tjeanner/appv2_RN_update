import React from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    Text,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNFS from 'react-native-fs';
import CommonStyles from '../styles/CommonStyles';
import RNTextDetector from "react-native-text-detector";
import { Icon } from 'react-native-elements';

interface Props{
    setFormFields: Function,
}


const WAITING_TIME=5000;

export default class ScannerModal extends React.Component<Props, any> {
    camera;
    constructor(props) {
        super(props);
        this.takePicture = this.takePicture.bind(this);
        this.goBack = this.goBack.bind(this);
        this.waitAbit = this.waitAbit.bind(this);
    }

    waitAbit(){
        setTimeout(()=>{
            this.takePicture();
        }, WAITING_TIME);
    }


    retrieveFromRegex(visionResp, regex): string {
            let strings: string[] = visionResp.map(element => {
                return element.text
            });
            let match = regex.exec(strings.join());
            return match == null ? undefined : match[0];
    }

    async retrieveInfo(uri:string){
        const visionResp = await RNTextDetector.detectFromUri(uri);
        console.log("visionResponse", visionResp);
        return {
            cardNumber: this.retrieveFromRegex(visionResp, /([ \\n]*[0-9]{19}[ \\n]*)/),
            person: this.retrieveFromRegex(visionResp, /([\\n ]*[A-Z.]+ [A-Z]+ [A-Z]+[\\n ]*)/)
        }
    }

    async takePicture() {
        if (this.camera) {
            let infos = {
                cardNumber: undefined,
                person: undefined,
            }
            const options = {
                quality: 0.8,
                doNotSave: false,
                pauseAfterCapture: false,
            };
            do {
                const data = await this.camera.takePictureAsync(options);
                this.camera.resumePreview();
                infos = await this.retrieveInfo(data.uri);
                RNFS.exists(data.uri).then(exists => {
                    if(exists)
                        RNFS.unlink(data.uri);
                })
                    
            } while (infos.cardNumber == undefined);
            console.log("Got this number : ", infos.cardNumber);
            this.props.setFormFields(infos)
        }
    };

    goBack(){
        this.props.setFormFields({
            cardNumber: undefined,
            person:undefined
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    onCameraReady={this.waitAbit}

                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                >
                    <View style={{flexDirection:"column", alignItems:"center", justifyContent:"flex-end", height:55}}>
                        <TouchableOpacity onPress={this.goBack}>
                            <View style={CommonStyles.greyButtonWithIcon}>
                                <Icon name="times" size={20} color="grey" type="font-awesome" />
                                <Text style={{ color: 'grey' }}>
                                    Annuler saisie automatique
                        </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </RNCamera>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});
