// console.log(workbook.SheetNames);
    // console.log(workbook.Sheets);
    // console.log(workbook.Sheets['Niha']);
    // console.log(xlsx.utils.sheet_to_json(workbook.Sheets['Niha']));

const express = require('express');
const xlsx=require('xlsx');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

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
app.get('/test', (req, res) => {
    
    console.log(typeof(req.query.Id));
    var workbook=xlsx.readFile('../DataRepo/Confidential.xlsx');
    
    var accountsList=[];
    xlsx.utils.sheet_to_json(workbook.Sheets['Accounts']).forEach(element => {

        if(element.Id===Number(req.query.Id)){
           console.log(req.query.Id);
            accountsList.push(element)
        }else{

        }
            
        
        
    });
    res.send(accountsList);
});

app.post('/login',(req,res)=>{
console.log(req.body);
res.send(req.body.userName);
});


app.listen(8080, () => {
    console.log("server listening on port 8080");
});