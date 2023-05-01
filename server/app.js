'use strict'
const express = require('express');
const xlsx = require('xlsx');
const app = express();
const cors = require('cors');

var dataformatter = require('dateformatter');
app.use(cors());
app.use(express.json());
var bodyParser = require('body-parser');
const dateformatter = require('dateformatter');
app.use(bodyParser.urlencoded({ extended: false }));
var workbook = xlsx.readFile('../DataRepo/Confidential.xlsx');

app.get('/getPaymentsInfo', (req, res) => {
    console.log("getPaymentsInfo");
    const accountsInfo = [];
    xlsx.utils.sheet_to_json(workbook.Sheets['AccountsInfo']).forEach(element => {
        req.query.Id = 102548;
        if (element.UserId === Number(req.query.Id)) {

            if (element.isTransferEligible) {
                if (element.isFromAccountTransferEligible) {
                    accountsInfo.push(element);
                } else if (element.isToAccountTransferEligible) {
                    accountsInfo.push(element);
                }
            }
        } else {

        }



    });
    res.send(accountsInfo);
});

app.get('/getInvestmentportfolio', (req, res) => {

    console.log("inside getinvestmentportfolio");
    let history = [];
    var labelList = [];
    var dataSet = [];
    var portfolioData = [];
    var sortedData = new Map();
    xlsx.utils.sheet_to_json(workbook.Sheets['TransactionsHistory']).forEach(element => {
        req.query.Id = 102548;
        if (element.UserId === Number(req.query.Id)) {
            history.push(element)
        } else {

        }



    });

    history.forEach(element => {

        if (sortedData.get(new Date(Date.UTC(0, 0, element.TransactionDate - 1)).getFullYear()) == null) {
            sortedData.set(new Date(Date.UTC(0, 0, element.TransactionDate - 1)).getFullYear(), element.Amount);
        } else {
            sortedData.set(new Date(Date.UTC(0, 0, element.TransactionDate - 1)).getFullYear(), sortedData.get(new Date(Date.UTC(0, 0, element.TransactionDate - 1)).getFullYear()) + element.Amount)

        }
    });

    sortedData.forEach((value, key, map) => {
        labelList.push(key);
        dataSet.push(value);
    });

    portfolioData.push(labelList);
    portfolioData.push(dataSet);

    res.send(portfolioData);


});

app.get('/getTransactionsHistory', (req, res) => {
    console.log("inside getTransactionsHistory method");


    let history = [];
    xlsx.utils.sheet_to_json(workbook.Sheets['TransactionsHistory']).forEach(element => {
        req.query.Id = 102548;
        if (element.UserId === Number(req.query.Id)) {
            history.push(element)
        } else {

        }



    });

    res.send(history);
});


app.get('/test', (req, res) => {
    var accountsList = [];
    xlsx.utils.sheet_to_json(workbook.Sheets['Accounts']).forEach(element => {
        req.query.Id = 102548;
        if (element.Id === Number(req.query.Id)) {
            console.log(req.query.Id);
            accountsList.push(element)
        } else {

        }



    });
    res.send(accountsList);
});

app.post('/login', (req, res) => {
    var resp;
    xlsx.utils.sheet_to_json(workbook.Sheets['UserInfo']).forEach(element => {

        if (element.userName == req.body.userName && element.password == req.body.password) {
            console.log(req.body.userName);
            resp = "success";
        } else {
            resp = "failure";
        }



    });
    res.redirect('/test');
    res.send();
});


app.listen(8080, () => {
    console.log("server listening on port 8080");
});