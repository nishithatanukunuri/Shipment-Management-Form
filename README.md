## Shipment-Management-Form
It is a registration form for shipments that stores the shipping detail in JSONPowerDB. It supports REST APIs and serverless technology. Shipments can be added, updated based on their shipment no. In this form, the shipment no is automatically checked and by the help of API, the data are entered into other input fields so that the user can update accordingly. The application uses AJAX requests for smooth and fast interaction. All kinds of data can be stored, such as numbers, strings, dates, etc.

## Benefits of using JsonPowerDB
* Can store structured / semi-structured and unstructured data along with other types of files and big-data.
* Dynamic relational constraints while using CRUD operations. i.e. Relational data can be managed without pre-defining PK, FK, UK, databases, tables etc.
* Free from technology constraints - Low-Code and easy to use from any technology via HTTP Rest AP
* Minimum learning curves, builds faster, cuts time to market, reduces the development cost.
* Helps developers in managing their databases using various tools and techniques.

## Release History
### JsonPowerDB
**Version:** 2.0
#### Execute API

```
var baseUrl = "http://api.login2explore.com:5577";
function executeCommand(reqString, apiEndPointUrl) {
    var url = baseUrl + apiEndPointUrl;
    var jsonObj;
    
    $.post(url, reqString, function (result) {
        jsonObj = JSON.parse(result);
    }).fail(function (result) {
        var dataJsonObj = result.responseText;
        jsonObj = JSON.parse(dataJsonObj);
    });
    return jsonObj;
}
```
#### Create a PUT Request String
```
function createPUTRequest(connToken, jsonObj, dbName, relName) {
    var putRequest = "{\n"
            + "\"token\" : \""
            + connToken
            + "\","
            + "\"dbName\": \""
            + dbName
            + "\",\n" + "\"cmd\" : \"PUT\",\n"
            + "\"rel\" : \""
            + relName + "\","
            + "\"jsonStr\": \n"
            + jsonObj
            + "\n"
            + "}";
    return putRequest;
}

```

## Features

- Simple to Use
- Fast Response
- Detailed User Interface
## Tech Stack

**Client:** HTML,CSS,Javascript

**Server:** JsonPowerDB




