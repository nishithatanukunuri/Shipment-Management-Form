var token = '90932674|-31949276415202273|90954529';
var dbname = 'DELIVERY-DB';
var relation = "SHIPMENT-TABLE";
var baseUrl = "http://api.login2explore.com:5577";
function resetForm() {
    $("#shipmentno").val('');
    $("#description").val('');
    $("#source").val('');
    $("#destination").val('');
    $("#shipping_date").val('');
    $("#expected_delivery_date").val('');
}

function disableAll() {
    resetForm();
    $("#shipmentno").prop("disabled", false);
    $("#shipmentno").focus();
    $("#description").prop("disabled", true);
    $("#source").prop("disabled", true);
    $("#destination").prop("disabled", true);
    $("#shipping_date").prop("disabled", true);
    $("#expected_delivery_date").prop("disabled", true);
    $("#save").prop("disabled", true);
    $("#update").prop("disabled", true);
    $("#reset").prop("disabled", true);
}
disableAll();
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
function createGET_BY_KEYRequest(token, dbname, relationName, jsonObjStr, createTime, updateTime) {
    if (createTime !== undefined) {
        if (createTime !== true) {
            createTime = false;
        }
    } else {
        createTime = false;
    }
    if (updateTime !== undefined) {
        if (updateTime !== true) {
            updateTime = false;
        }
    } else {
        updateTime = false;
    }
    var value1 = "{\n"
            + "\"token\" : \""
            + token
            + "\",\n" + "\"cmd\" : \"GET_BY_KEY\",\n"
            + "\"dbName\": \""
            + dbname
            + "\",\n"
            + "\"rel\" : \""
            + relationName
            + "\",\n"
            + "\"jsonStr\":\n"
            + jsonObjStr
            + "\,"
            + "\"createTime\":"
            + createTime
            + "\,"
            + "\"updateTime\":"
            + updateTime
            + "\n"
            + "}";
    return value1;
}

function findShipmentNo(ele) {
    var shipmentno = ele.value;
    var obj = {
        shipment_no: shipmentno
    };
    var jsnobj = JSON.stringify(obj);
    var request = createGET_BY_KEYRequest(token, dbname, relation, jsnobj);
    jQuery.ajaxSetup({ async: false });
    var res = executeCommand(request, "/api/irl");
    jQuery.ajaxSetup({ async: true });
    if (res.status === 400) {
        $("#description").prop("disabled", false);
        $("#description").focus();
        $("#source").prop("disabled", false);
        $("#destination").prop("disabled", false);
        $("#shipping_date").prop("disabled", false);
        $("#expected_delivery_date").prop("disabled", false);
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
    } else {
        $("#description").prop("disabled", false);
        $("#shipmentno").prop("disabled", true);
        $("#source").prop("disabled", false);
        $("#destination").prop("disabled", false);
        $("#shipping_date").prop("disabled", false);
        $("#expected_delivery_date").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#save").prop("disabled", true);
        $("#update").prop("disabled", false);
        // console.log(res);
        var data = JSON.parse(res.data).record;
        // console.log(data);
        $("#description").val(data.description);
        $("#source").val(data.source);
        $("#destination").val(data.destination);
        $("#shipping_date").val(data.shipping_date);
        $("#expected_delivery_date").val(data.expected_delivery_date);
    }
}
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
function saveData() {
    $("#ajax").html("wait");
    var shipmentno = $("#shipmentno").val();
    var description = $("#description").val();
    var source = $("#source").val();
    var destination = $("#destination").val();
    var shipping_date = $("shipping_date").val();
    var expected_delivery_date = $("#expected_delivery_date").val();
    if(shipmentno===''){
        $("#shipmentno").focus();
        return;
    }
    if(description===''){
        alert("Description is a required field");
        $("#description").focus();
        return;
    }if(source===''){
        alert("Source is a required field");
        $("#source").focus();
        return;
    }if(destination===''){
        alert("Destination is a required field");
        $("#destination").focus();
        return;
    }if(shipping_date===''){
        alert("Shipping Date is a required field");
        $("#shipping_date").focus();
        return;
    }if(expected_delivery_date===''){
        alert("Expected Delivery Date is a required field");
        $("#expected_delivery_date").focus();
        return;
    }
    var obj = {
        shipment_no:shipmentno,
        description:description,
        source:source,
        destination:destination,
        shipping_date:shipping_date,
        expected_delivery_date:expected_delivery_date
    };
    var jsonobj = JSON.stringify(obj);
    var req = createPUTRequest(token, jsonobj, dbname, relation);
    jQuery.ajaxSetup({ async: false });
    var res = executeCommand(req, "/api/iml");
    jQuery.ajaxSetup({ async: true });
    disableAll();
}
function createSETRequest(token, jsonStr, dbName, relName, type, primaryKey, uniqueKeys, foreignKeys) {
    if (type === undefined) {
        type = "DEFAULT";
    }
    var req = {
        token: token,
        cmd: "SET",
        dbName: dbName,
        rel: relName,
        type: type,
        jsonStr: JSON.parse(jsonStr)
    };
    if (primaryKey !== undefined) {
        req.primaryKey = primaryKey;
    }
    if (uniqueKeys !== undefined) {
        req.uniqueKeys = uniqueKeys;
    }
    if (foreignKeys !== undefined) {
        req.foreignKeys = foreignKeys;
    }
    req = JSON.stringify(req);
    return req;
}

function updateData(){
    var shipmentno = $("shipmentno").val();
    var description = $("#description").val();
    var source = $("#source").val();
    var destination = $("#destination").val();
    var shipping_date = $("#shipping_date").val();
    var expected_delivery_date = $("#expected_delivery_date").val();
    if(description===''){
        $("#description").focus();
        return;
    }if(source===''){
        $("#source").focus();
        return;
    }if(destination===''){
        $("#destination").focus();
        return;
    }if(shipping_date===''){
        $("#shipping_date").focus();
        return;
    }if(expected_delivery_date===''){
        $("#expected_delivery_date").focus();
        return;
    }
    var obj = {
        shipment_no:shipmentno,
        description:description,
        source:source,
        destination:destination,
        shipping_date:shipping_date,
        expected_delivery_date:expected_delivery_date
    };
    var jsonobj = JSON.stringify(obj);
    var req=createSETRequest(token,jsonobj,dbname,relation,'UPDATE','shipment_no');
    jQuery.ajaxSetup({ async: false });
    var res = executeCommand(req, "/api/iml/set");
    jQuery.ajaxSetup({ async: true });
    disableAll();
}