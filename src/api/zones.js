import { getOfficeID } from "./auth";

const getZones = async (parentID) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Content-Type", "text/plain");
    const officeID = await getOfficeID()
    var body = parentID ?
        `?body={
        "query": "",
        "search": {
            "groupOp": "AND",
            "rules": [
                {
                    "field": "officeID",
                    "op": "eq",
                    "data": "${officeID}"
                },
                {
                    "field": "parentID",
                    "op": "eq",
                    "data": "${parentID}"
                }
            ],
            "groups": []
        },
        "page": 1,
        "limit": 999999,
        "sorts": [
            {
                "field": "zoneID",
                "mode": "ASC"
            }
        ]
    }`:
        `?body={
        "query": "",
        "search": {
            "groupOp": "AND",
            "rules": [
                {
                    "field": "officeID",
                    "op": "eq",
                    "data": "${officeID}"
                },
                {
                    "field": "type",
                    "op": "ni",
                    "data": ["RT", "RW"]
                }
            ],
            "groups": []
        },
        "page": 1,
        "limit": 999999,
        "sorts": [
            {
                "field": "name",
                "mode": "ASC"
            }
        ]
    }`

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const request = await fetch("http://covid19.pantimarhaen.id:8001/zones" + body, requestOptions)
    const response = await request.json()

    return response

}

const getZone = async (zoneID) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Content-Type", "text/plain");
    const officeID = await getOfficeID()
    var body =
        `?body={
        "query": "",
        "search": {
            "groupOp": "AND",
            "rules": [
                {
                    "field": "officeID",
                    "op": "eq",
                    "data": "${officeID}"
                },
                {
                    "field": "zoneID",
                    "op": "eq",
                    "data": "${zoneID}"
                }
            ],
            "groups": []
        },
        "page": 1,
        "limit": 999999,
        "sorts": [
            {
                "field": "zoneID",
                "mode": "ASC"
            }
        ]
    }`
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const request = await fetch("http://covid19.pantimarhaen.id:8001/zones" + body, requestOptions)
    const response = await request.json()
    console.log(response.meta)
    return response.data.rows[0]

}

export {
    getZones,
    getZone
}