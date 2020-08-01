const getCountries = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const request = await fetch("http://covid19.pantimarhaen.id:8001/countries", requestOptions)
    const response = await request.json()
    return response
}

export {
    getCountries
}