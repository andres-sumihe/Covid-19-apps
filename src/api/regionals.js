const getRegionals = async (parentID) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const body = parentID?`?body={
            "query": "",
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
                    "field": "regionalID",
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
                    "field": "regionalID",
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
    getRegionals
}