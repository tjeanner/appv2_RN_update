import { FormInfo} from '../helpers/interfaces';
import AsyncStorage from '@react-native-community/async-storage';

export const  retrieveFnacId = async (user: FormInfo)  => {
    const url = 'http://app.suisse.fnac.ch/customers';
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(convertUserToUsableByPHP(user))
        });
        //If not found with cardNumber and birthDate
        if (response.ok !== true) {
            console.log(response)
            return null;
        } else {
            let responseJson = await response.json();
            console.log(responseJson); 
            return responseJson;
        }
    } catch (error) {
        console.error(error);
    }
}


export const  getUserFromId = async (id: string)  => {
    const url = 'http://app.suisse.fnac.ch/customers/'+id;
    try {
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
        });
        //If not found with cardNumber and birthDate
        if (response.ok !== true) {
            console.log(response)
            return null;
        } else {
            let responseJson = await response.json();
            console.log(responseJson); 
            return responseJson;
        }
    } catch (error) {
        console.error(error);
    }
}


const convertUserToUsableByPHP = (user:FormInfo) => {
    let birthDatePhpFormatted = user.dtBirth.split('-').reverse().join('-');
    return {
        first_name:user.firstName,
        surname:user.surname,
        ch_civility:user.chCivility,
        e_mail:user.eMail,
        cd_favourite_ug:user.cdFavouriteUg,
        card:user.card,
        dt_birth:birthDatePhpFormatted,
    }
}