// console.log(workbook.SheetNames);
    // console.log(workbook.Sheets);
    // console.log(workbook.Sheets['Niha']);
    // console.log(xlsx.utils.sheet_to_json(workbook.Sheets['Niha']));

const express = require('express');
const xlsx=require('xlsx');
const app = express();
const cors = require('cors');
var dataformatter=require('dateformatter');
app.use(cors());
app.use(express.json());
var bodyParser = require('body-parser');
const dateformatter = require('dateformatter');
app.use(bodyParser.urlencoded({ extended: false }));
var workbook=xlsx.readFile('../DataRepo/Confidential.xlsx');
const data = [{
    "id": "1",
    "accountName": "Checking",
    "accountNumber":"0000125478963",
    "accountType": "CHECKING",
    "AvailBalance": "$500.35"

},
{
    "id": "2",
    "accountName": "Checking123",
    "accountNumber":"0000125478963",
    "accountType": "CHECKING",
    "AvailBalance": "$550.35"

}];

app.get('/getPaymentsInfo',(req,res)=>{
    console.log("getPaymentsInfo");
const accountsInfo=[];
    const eligibleFromAcct=[];
    const eligibleToAcct=[];
    xlsx.utils.sheet_to_json(workbook.Sheets['AccountsInfo']).forEach(element => {
        req.query.Id=102548;
        if(element.UserId===Number(req.query.Id)){
           
          if(element.isTransferEligible){
if(element.isFromAccountTransferEligible){
    accountsInfo.push(element);
}else if(element.isToAccountTransferEligible){
    accountsInfo.push(element);
}
          }
        }else{

        }
            
        
        
    });
    res.send(accountsInfo);
});

app.get('/getTransactionsHistory',(req,res)=>{
console.log("inside getTransactionsHistory method");


let history=[];
xlsx.utils.sheet_to_json(workbook.Sheets['TransactionsHistory']).forEach(element => {
    req.query.Id=102548;
    if(element.UserId===Number(req.query.Id)){
        history.push(element)
    }else{

    }
        
    
    
});

res.send(history);
});


app.get('/test', (req, res) => {
    var accountsList=[];
    xlsx.utils.sheet_to_json(workbook.Sheets['Accounts']).forEach(element => {
        req.query.Id=102548;
        if(element.Id===Number(req.query.Id)){
           console.log(req.query.Id);
            accountsList.push(element)
        }else{

        }
            
        
        
    });
    res.send(accountsList);
});

app.post('/login',(req,res)=>{
var resp;
xlsx.utils.sheet_to_json(workbook.Sheets['UserInfo']).forEach(element => {

    if(element.userName==req.body.userName && element.password==req.body.password){
       console.log(req.body.userName);
       resp="success";
    }else{
resp="failure";
    }
        
    
    
});
// if(req.body.userName=="Srikanth"){
// console.log("success");
// }else{
// console.log("failure");
// }
res.redirect('/test');
res.send();
});


app.listen(8080, () => {
    console.log("server listening on port 8080");
});