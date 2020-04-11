const getPeoples = async () => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const request = await fetch("http://covid19.pantimarhaen.id:8001/peoples", requestOptions)
    const response = await request.json()
    return response
}

const storePeoples = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Content-Type", "text/plain");

    var raw = {
        "officeID": "",
        "familyID": "",
        "provinceID": "",
        "districtID": "",
        "subdistrictID": "",
        "villageID": "",
        "zoneID": "",
        "birthlocationID": "",
        "jobID": "",
        "ethnicID": "",
        "NIK": "",
        "Paspor": "",
        "KITAP": "",
        "NPWP": "",
        "name": "",
        "frontDegree": "",
        "backDegree": "",
        "birthdate": "",
        "gender": "",
        "religion": "",
        "religionOther": "",
        "marital": "",
        "blood": "",
        "education": "",
        "disability": "",
        "type": "",
        "nationality": "",
        "country": "",
        "revenue": "",
        "handphone": "",
        "photo": ""
    };

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://covid19.pantimarhaen.id:8001/peoples", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

export {
    getPeoples
}