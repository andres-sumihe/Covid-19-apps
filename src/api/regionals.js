const getRegional = async (regionalID) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = `?body={
            "search": {
                "groupOp": "AND",
                "rules": [
                    {
                        "field": "regionalID",
                        "op": "eq",
                        "data": "${regionalID}"
                    }
                ],
                "groups": []
            },
            "page": 1,
            "limit": 9999999999,
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

    const request = await fetch("http://covid19.pantimarhaen.id:8001/regionals" + body, requestOptions)
    const response = await request.json()
    return response.data.rows[0]
}

const getRegionals = async (parentID, query) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    console.log(query)
    const body = parentID ? `?body={
            "query": "${query}",
            "search": {
                "groupOp": "AND",
                "rules": [
                    {
                        "field": "parentID",
                        "op": "eq",
                        "data": "${parentID}"
                    }
                ],
                "groups": []
            },
            "page": 1,
            "limit": 9999999999,
            "sorts": [
                {
                    "field": "name",
                    "mode": "ASC"
                }
            ]
        }`:
        `?body={
            "query": "${query}",
            "search": {
                "groupOp": "AND",
                "rules": [
                    {
                        "field": "type",
                        "op": "eq",
                        "data": "Provinsi"
                    }
                ],
                "groups": []
            },
            "page": 1,
            "limit": 9999999999,
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

    const request = await fetch("http://covid19.pantimarhaen.id:8001/regionals" + body, requestOptions)
    const response = await request.json()
    return response
}

export {
    getRegionals,
    getRegional
}