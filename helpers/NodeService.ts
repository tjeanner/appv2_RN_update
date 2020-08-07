import {Node, PageOf, ItemRepresentation, ItemRepresentation_medium, ItemRepresentation_large} from '../helpers/interfaces'


export const getChildNodes = async (pid: string, depth:number = 1, nameConfiguration: string = 'small') => {
    var url =
        'https://www.fnac.ch/api/commerce/rest/v2/nodes/' +
        pid +
        '/child' +
        '/' + depth +
        '/false' +
        '/' + nameConfiguration;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: '897c210702214f0698f486811'
            }
        })

        if(response.status == 200 || response.status == 201 ){
            const jsonResponse: Node[] = await response.json();
            //console.log("[NodeService: getChildNodes] Childnodes received : ", jsonResponse)
            return jsonResponse;
        }
        else{
            throw new Error("[NodeService: getChildNodes]: HTTP Error");
        }
    } catch (e) {
        console.error(e);
    }
}

export const getItemsFromNode = async (nodePid: number, pageIndex: number, pageSize: number = 20, nameConfiguration:string = 'small') => {
    const url =
        'https://www.fnac.ch/api/commerce/rest/v2/nodes/' +
        nodePid +
        '/items' +
        '/' + pageIndex +
        '/' + pageSize +
        '/' + nameConfiguration;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: '897c210702214f0698f486811'
            }
        })

        if(response.status == 200 || response.status == 201){
            const data:PageOf<ItemRepresentation> = await response.json();
            return data;
        }
        else{
            throw new Error("[NodeService: getItemsFromNode] HTTP error : " + response.statusText);
        }
    } catch (e) {
        console.error(e);
    }
}

export const getItemData = async (itemPrid: number,itemCatalog: number, nameConfiguration:string = 'medium'): Promise<ItemRepresentation_medium> => {
    //item.Prid.Catalog + '-' + item.Prid.Id
    const url =
        'https://www.fr.fnac.ch/api/commerce/rest/v2/items/' +
        itemPrid + '-' + itemCatalog +
        '/'+ nameConfiguration
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                authorization: 'Basic 897c210702214f0698f486811'
            }
        });

        if(response.status == 200 || response.status == 201){

            const data:ItemRepresentation_medium = await response.json();
            //console.log("[NodeService: getItemsData] received ItemRepresentation : ", data);
            return data;
        }
        else{
            throw new Error("[NodeService: getItemsFromNode] HTTP error : " + response.statusText);
        }
    } catch (e) {
        console.error(e);
    }
}

export const searchItems = async (keywords: string[], pageIndex: number, pageSize: number = 20, loadConfiguration:string = 'large') => {
    let stringKeyWords = keywords.join(',');
    const url =
        'https://www.fnac.ch/api/commerce/rest/v2/search/items/' + loadConfiguration

    //expected a string with each keyword separated by commas

    console.log("[NodeService] searchItems url :", url)
    try {
        const response = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Authorization': '897c210702214f0698f486811',
                    'Content-type' : 'application/json',
                    'Accept' : 'application/json',

                },
                body: JSON.stringify({
                    keywords: stringKeyWords,
                    pageindex: pageIndex,
                    pagesize: pageSize,
                })
            });

        if(response.status == 200 || response.status == 201){
            const data:PageOf<ItemRepresentation> = await response.json();
            return data;
        }
        else{
            throw new Error("[NodeService: searchItems] HTTP error : " + response.statusText);
        }
    } catch (e) {
        console.error(e);
    }
}
