import { Store, StoreEvent, AvailabilitySimple } from '../helpers/interfaces'


export const getStoresList = async () => {

    let url = 'https://www.fnac.ch/api/commerce/rest/v2/stores';
    try {
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: '897c210702214f0698f486811'
            }
        })
        if (response.status == 200 || response.status == 201) {
            const storeList: Store[] = await response.json();

            //console.log("[StoreService: getStoreList] received this :", storeList);
            return storeList;
        }
        else {
            throw new Error("[StoreService: getStoreList] HTTP error : " + response.statusText);
        }
    } catch (e) {
        console.error(e);
    }
}

export const getStoreEvents = async (storeId: number) => {

    const url = 'http://app.suisse.fnac.ch/events/' + storeId;
    try {
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            }
        })
        if (response.status == 200 || response.status == 201) {
            const responseJson = await response.json();

            let newEvents = responseJson as StoreEvent[]
            return newEvents;
        } else {
            throw new Error("[StoreService: getStoreEvents] HTTP error : " + response.statusText);
        }
    } catch (e) {
        console.error(e);
    }
}

//api/commerce/rest/v2/items/PRID/availability/{shopIds}/{nameConfiguration}
export const getItemAvailabilityInStores = async (itemPrid:number,itemCatalog:number, storeList:Store[] = null) => {
    if(storeList == null)
        storeList = await getStoresList();
    let shopIds:string = storeList.map(store =>{
        return store.StoreGu;
    }).join(',');
    const url = 'https://www.fnac.ch/api/commerce/rest/v2/items' +
        '/' + itemPrid + '-' + itemCatalog +
        '/availability' +
        '/' + shopIds +
        '/large'
        console.log(url);
        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: '897c210702214f0698f486811',
                    Accept: 'application/json',
                    'Content-type': 'application/json'
                },
                credentials: 'include'
            })
            if (response.status == 200 || response.status == 201) {
                const responseJson = await response.json();
    
                let availabilities = responseJson as AvailabilitySimple[];
                console.log('[StoreService: getItemAvailabilityInStores] got this : ', responseJson);
                return availabilities;
            } else {
                throw new Error("[StoreService: getItemAvailabilityInStores] HTTP error : " + response.statusText);
            }
        } catch (e) {
            console.error(e);
        }
}