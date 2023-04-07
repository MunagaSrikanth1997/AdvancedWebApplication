'use strict'
var data = (id) => document.getElementById(id);
const excelProcessor = async () => {
    console.log("res.toString()");

    await fetch("http://localhost:8080/test", {
        method: "GET"

    }).then((res) => {
        console.log("calling");
        return res.json();
    }).then((respo) => {
        console.log(respo);

        respo.forEach(record => {
            var tableRow = document.createElement("tr");
            var td1 = document.createElement("td");
            td1.innerText = record.AccountName;
            var td2 = document.createElement("td");
            td2.innerText = record.AccountNumber;
            var td3 = document.createElement("td");
            td3.innerText = record.AvailBalance;

            tableRow.append(td1, td2, td3);

            document.getElementById("accountsBody").append(tableRow);

        });
    }).catch(error => console.log(error.toString()));


}

$(document).ready(() => {
    excelProcessor();
});



var login = async () => {
    var userName = data("userName").value;
    var pwd = data("pwd").value;
    console.log(userName);
    var parms={
        
        userName: userName,
        password: pwd
    
}
    console.log(pwd);
    const query = Object.keys(params).map(k => `${esc(k)}=${esc(params[k])}`).join('&')
    await fetch('http://localhost:8080/login'+query, {
        method: "GET",
        
    }).then((response) => {
        return response.body;
    }).then((response) => {
        console.log(response);
    }).catch(error => console.log(error.toString()));
}






