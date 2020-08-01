const getEthnics = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = "";

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const request = await fetch("http://covid19.pantimarhaen.id:8001/ethnics", requestOptions)
    const response = await request.json()
    return response
}

const getEthnic = async (ethnicID) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = `?body={
    "query": "",
    "search": {
        "groupOp": "AND",
        "rules": [
            {
                "field": "ethnicID",
                "op": "eq",
                "data": "${ethnicID}"
            }
        ],
        "groups": []
    },
    "page": 1,
    "limit": 10,
    "sorts": [
        {
            "field": "ethnicID",
            "mode": "ASC"
        }
    ]
}`;

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const request = await fetch("http://covid19.pantimarhaen.id:8001/ethnics" + raw, requestOptions)
    const response = await request.json()
    return response.data.rows[0]
}

export {
    getEthnics,
    getEthnic
}