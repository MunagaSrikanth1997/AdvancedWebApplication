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
    var params={
        
        userName: userName,
        password: pwd
    
}

var url=new URL('http://localhost:8080/login');
var postBody=new FormData();
postBody.append("userName",userName);
postBody.append("password",pwd);
 //url.searchParams.append("userName",userName);
 //url.searchParams.append("password",pwd);
    console.log(params);
    
    await fetch(url, {
       
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
            },
         body: JSON.stringify(params)
        
    }).then((response) => {
        return response.body;
    }).then((response) => {
        console.log(response);
    }).catch(error => console.log(error.toString()));
}






