'use strict'
var data = (id) => document.getElementById(id);

const getTransactionHistory=async ()=>{
console.log("inside getTransactionHistory.....");

await fetch("http://localhost:8080/getTransactionsHistory",
{
    method:"GET"
}).then((response)=>{
    console.log("history process completed");
    console.log(response);
return response.json();

}).then((result)=>{
    console.log("************srikanthhhhhhh********");
var history=new Map();
    result.forEach(element=>{
        if(history.get(element.TransactionDate)==null){
            history.set(element.TransactionDate,[]);
            history.get(element.TransactionDate).push(element);
           
element.TransactionDate= new Date(Date.UTC(0, 0, element.TransactionDate - 1));
        }else{
            history.get(element.TransactionDate).push(element);
            element.TransactionDate= new Date(Date.UTC(0, 0, element.TransactionDate - 1));         
        }
    })
   console.log(history);
      history.forEach( (value, key, map) => {
        var trans=document.createElement("div");
        trans.id=key;
        var bold=document.createElement("b");
        var header=document.createElement("h3");
        header.innerHTML="<b>" + new Date(Date.UTC(0, 0, key - 1)) +"</b>";
        
        trans.appendChild(header);
        value.forEach(transaction=>{
var para=document.createElement("p");
para.innerHTML=transaction.TransactionName + "<br>" + transaction.AccountNumber +"<br>";
trans.appendChild(para);
        });
        data("history").appendChild(trans);
      });



});

}

const excelProcessor = async () => {
    await fetch("http://localhost:8080/test", {
        method: "GET"

    }).then((res) => {
        return res.json();
    }).then((respo) => {
        respo.forEach(record => {
            var tableRow = document.createElement("tr");
            var td1 = document.createElement("td");
            td1.innerText = record.AccountName;
            var td2 = document.createElement("td");
            td2.innerText = record.AccountNumber;
            var td3 = document.createElement("td");
            td3.innerText = record.AvailBalance;
            var td4 = document.createElement("td");
            td4.innerText = record.AccountType;

            tableRow.append(td1, td2, td3,td4);

            document.getElementById("accountsBody").append(tableRow);

        });
    }).catch(error => console.log(error.toString()));


}

const paymentsInfo=async ()=>{
console.log("Payments Info");

await fetch("http://localhost:8080/getPaymentsInfo", {
    method: "GET"

}).then((res) => {
    return res.json();
}).then((respo)=>{
console.log(respo);

var fromAccountsEligibleList = document.createElement("select");
var toAccountsEligibleList = document.createElement("select");
fromAccountsEligibleList.name = "fromAccountsList";
fromAccountsEligibleList.id = "fromAccounts";
toAccountsEligibleList.name="toAccountsList";
toAccountsEligibleList.id="toAccounts";

var fromAccountLabel = document.createElement("label");
fromAccountLabel.innerHTML = "From Account: "
//fromAccountLabel.htmlFor = "pets";

var toAccountLabel = document.createElement("label");
toAccountLabel.innerHTML = "To Account: "
//toAccountLabel.htmlFor = "pets";


    respo.forEach(record=>{
        if(record.isFromAccountTransferEligible){
            var option = document.createElement("option");
            option.value = record.AccountName;
            option.text = record.AccountName;
            fromAccountsEligibleList.appendChild(option);
        }else if(record.isToAccountTransferEligible){
            var option = document.createElement("option");
            option.value = record.AccountName;
            option.text = record.AccountName;
            toAccountsEligibleList.appendChild(option);
        }
       
    });
    var amount = document.createElement("label");
amount.innerHTML = "Amount: $"
    data("paymentsInfo").append(fromAccountLabel);
data("paymentsInfo").append(fromAccountsEligibleList);
data("paymentsInfo").append(document.createElement("br"));
data("paymentsInfo").append(toAccountLabel);
data("paymentsInfo").append(toAccountsEligibleList);
data("paymentsInfo").append(document.createElement("br"));
data("paymentsInfo").append(amount);

var input=document.createElement("input");
input.type="text";
input.id="amount";
data("paymentsInfo").append(input);
data("paymentsInfo").append(document.createElement("br"));
var makePayment=document.createElement("input");
makePayment.type="button";
makePayment.id="makePayment";
makePayment.name="make payment";
makePayment.value="make payment";
makePayment.onclick=processPayment;
data("paymentsInfo").append(makePayment);

});
}

const processPayment=()=>{
window.alert("payment is successfully processed");
}

$(document).ready(() => {
    excelProcessor();
    paymentsInfo();
    getTransactionHistory();
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
    //console.log(params);
    
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






