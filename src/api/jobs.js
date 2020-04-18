const getJobs = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = "";

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const request = await fetch("http://covid19.pantimarhaen.id:8001/jobs", requestOptions)
    const response = await request.json()

    return response
}

const getJob = async (jobID) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = `?body={
    "query": "",
    "search": {
        "groupOp": "AND",
        "rules": [
            {
                "field": "jobID",
                "op": "eq",
                "data": "${jobID}"
            }
        ],
        "groups": []
    },
    "page": 1,
    "limit": 10,
    "sorts": [
        {
            "field": "jobID",
            "mode": "ASC"
        }
    ]
}`;

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const request = await fetch("http://covid19.pantimarhaen.id:8001/jobs" + raw, requestOptions)
    const response = await request.json()

    return response.data.rows[0]
}

export {
    getJobs,
    getJob
}