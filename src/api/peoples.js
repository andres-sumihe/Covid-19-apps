import { getOfficeID } from "./auth";

const getPeoples = async () => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const request = await fetch("http://covid19.pantimarhaen.id:8001/peoples", requestOptions)
    const response = await request.json()
    return response
}

const storePeoples = async (body) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body
    };
    const request = await fetch("http://covid19.pantimarhaen.id:8001/peoples", requestOptions)
    const response = await request.json()
    return response
}

const updatePeople = async (body) => {
    const officeID = await getOfficeID()
    body.officeID = officeID
    console.log(body)
    const request = await fetch("http://covid19.pantimarhaen.id:8001/peoples", {
        "method": "PUT",
        "headers": {
            "content-type": "application/json",
        },
        "body": JSON.stringify(body)
    })
    const response = await request.json()
    return response
}

const deletePeople = async (peopleID) => {
    const request = await fetch("http://covid19.pantimarhaen.id:8001/peoples", {
        "method": "DELETE",
        "headers": {
            "content-type": "application/json",
            "authorization": "Bearer "
        },
        "body": `{"peopleID": "${peopleID}"}`
    })
    const response = await request.json()
    return response
}

export {
    getPeoples,
    storePeoples,
    updatePeople,
    deletePeople
}