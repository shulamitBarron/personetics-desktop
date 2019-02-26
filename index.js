const express = require('express');
var bodyParser = require('body-parser');
const path = require("path");
var request = require('request');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 8091;

/**
 * get data from DB
 */
const usersData = {
    "david": {
        "transactions":[
            {
              "id": "0",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "Gov.org",
              "type": "PostedCheck",
              "amount": "-2000",
              "date": "2019-02-26",
              "categoryDescription": "Government",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "1",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "Grocery Shlomo",
              "type": "PostedCheck",
              "amount": "-500",
              "date": "2019-02-27",
              "categoryDescription": "Food",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "2",
              "account": "B_1010_1003",
              "accountNumber": "1003",
              "transaction": "Brachi",
              "type": "PostedCheck",
              "amount": "-100",
              "date": "2019-02-27",
              "categoryDescription": "clothing",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "3",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-2100",
              "date": "2019-01-26",
              "categoryDescription": "Travel",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "4",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-500",
              "date": "2019-01-20",
              "categoryDescription": "Grocery",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "5",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-450",
              "date": "2019-01-01",
              "categoryDescription": "Grocery",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "6",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-250",
              "date": "2019-01-05",
              "categoryDescription": "Grocery",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "7",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-800",
              "date": "2019-01-13",
              "categoryDescription": "Grocery",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "8",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-450",
              "date": "2019-01-24",
              "categoryDescription": "Grocery",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "9",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-700",
              "date": "2019-01-18",
              "categoryDescription": "clothing",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "10",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-100",
              "date": "2019-01-08",
              "categoryDescription": "clothing",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "11",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-2100",
              "date": "2018-12-26",
              "categoryDescription": "Travel",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "12",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-500",
              "date": "2018-12-20",
              "categoryDescription": "Grocery",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "13",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-450",
              "date": "2018-12-01",
              "categoryDescription": "Grocery",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "14",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-250",
              "date": "2018-12-05",
              "categoryDescription": "Grocery",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "15",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-800",
              "date": "2018-12-13",
              "categoryDescription": "Grocery",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "16",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-450",
              "date": "2018-12-24",
              "categoryDescription": "Grocery",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "17",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-700",
              "date": "2018-12-18",
              "categoryDescription": "clothing",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "18",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-100",
              "date": "2018-12-08",
              "categoryDescription": "clothing",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "19",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-2100",
              "date": "2018-11-24",
              "categoryDescription": "Travel",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "20",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-500",
              "date": "2018-11-18",
              "categoryDescription": "Grocery",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "21",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-450",
              "date": "2018-11-01",
              "categoryDescription": "Grocery",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "22",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-250",
              "date": "2018-11-05",
              "categoryDescription": "Grocery",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "23",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-800",
              "date": "2018-11-13",
              "categoryDescription": "Grocery",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "24",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-450",
              "date": "2018-11-24",
              "categoryDescription": "Grocery",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "25",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-700",
              "date": "2018-11-18",
              "categoryDescription": "clothing",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "26",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-100",
              "date": "2018-11-08",
              "categoryDescription": "clothing",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "27",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-1100",
              "date": "2018-10-29",
              "categoryDescription": "Travel",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "28",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-1500",
              "date": "2018-10-27",
              "categoryDescription": "Grocery",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "29",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-950",
              "date": "2018-10-01",
              "categoryDescription": "Grocery",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "30",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-250",
              "date": "2018-10-05",
              "categoryDescription": "Grocery",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "31",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-800",
              "date": "2018-10-13",
              "categoryDescription": "Grocery",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "32",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-450",
              "date": "2018-10-24",
              "categoryDescription": "Grocery",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "33",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-700",
              "date": "2018-10-18",
              "categoryDescription": "clothing",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "34",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "PostedCheck",
              "amount": "-100",
              "date": "2018-10-08",
              "categoryDescription": "clothing",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "35",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "Gov.org",
              "type": "charge",
              "amount": "2000.00",
              "date": "2018-12-01",
              "categoryDescription": "Government",
              "Mode": "In",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "36",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "Gov.org",
              "type": "charge",
              "amount": "1200.00",
              "date": "2019-02-27",
              "categoryDescription": "Government",
              "Mode": "In",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "37",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "Gov.org",
              "type": "charge",
              "amount": "2000.00",
              "date": "2019-02-15",
              "categoryDescription": "Government",
              "Mode": "In",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "40",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "Gov.org",
              "type": "charge",
              "amount": "2800.99",
              "date": "2019-01-25",
              "categoryDescription": "Government",
              "Mode": "In",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "42",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "charge",
              "amount": "-5000.99",
              "date": "2018-11-12",
              "categoryDescription": "Grocery",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "43",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "charge",
              "amount": "-1100",
              "date": "2018-12-03",
              "categoryDescription": "Grocery",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "44",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "charge",
              "amount": "-112000.5",
              "date": "2019-01-01",
              "categoryDescription": "Travel",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "45",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "charge",
              "amount": "-1000",
              "date": "2019-01-27",
              "categoryDescription": "Grocery",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "46",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "sem.COM",
              "type": "charge",
              "amount": "-2100",
              "date": "2019-01-03",
              "categoryDescription": "Grocery",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "47",
              "account": "B_1010_1003",
              "accountNumber": "1003",
              "transaction": "Grocery.Shlomo",
              "type": "charge",
              "amount": "-100",
              "date": "2019-02-26",
              "categoryDescription": "Grocery",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "48",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "Grocery.Shlomo",
              "type": "charge",
              "amount": "-100",
              "date": "2019-02-26",
              "categoryDescription": "Grocery",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "49",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "Irox",
              "type": "DepositCheck",
              "amount": "6100",
              "date": "2019-02-26",
              "categoryDescription": "Salary",
              "Mode": "In",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "50",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "Irox",
              "type": "DepositCheck",
              "amount": "1100",
              "date": "2019-02-27",
              "categoryDescription": "Salary",
              "Mode": "In",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "51",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "Irox",
              "type": "DepositCheck",
              "amount": "6100",
              "date": "2019-01-10",
              "categoryDescription": "Salary",
              "Mode": "In",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "52",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "Irox",
              "type": "DepositCheck",
              "amount": "6100",
              "date": "2018-12-10",
              "categoryDescription": "Salary",
              "Mode": "In",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "53",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "Irox",
              "type": "DepositCheck",
              "amount": "6100",
              "date": "2018-11-10",
              "categoryDescription": "Salary",
              "Mode": "In",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "54",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "Irox",
              "type": "DepositCheck",
              "amount": "5500",
              "date": "2018-10-10",
              "categoryDescription": "Salary",
              "Mode": "In",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "55",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "Irox",
              "type": "DepositCheck",
              "amount": "5500",
              "date": "2018-09-10",
              "categoryDescription": "Salary",
              "Mode": "In",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "56",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "Irox",
              "type": "DepositCheck",
              "amount": "5500",
              "date": "2018-08-10",
              "categoryDescription": "Salary",
              "Mode": "In",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "57",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "Irox",
              "type": "DepositCheck",
              "amount": "4500",
              "date": "2018-07-10",
              "categoryDescription": "Salary",
              "Mode": "In",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "58",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "Irox",
              "type": "DepositCheck",
              "amount": "5500",
              "date": "2018-06-10",
              "categoryDescription": "Salary",
              "Mode": "In",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "59",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "Irox",
              "type": "DepositCheck",
              "amount": "5500",
              "date": "2018-05-10",
              "categoryDescription": "Salary",
              "Mode": "In",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "60",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "Irox",
              "type": "DepositCheck",
              "amount": "5500",
              "date": "2018-04-10",
              "categoryDescription": "Salary",
              "Mode": "In",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "61",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "Irox",
              "type": "DepositCheck",
              "amount": "5500",
              "date": "2018-03-10",
              "categoryDescription": "Salary",
              "Mode": "In",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "62",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "Irox",
              "type": "DepositCheck",
              "amount": "5500",
              "date": "2018-02-10",
              "categoryDescription": "Salary",
              "Mode": "In",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "63",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "Irox",
              "type": "DepositCheck",
              "amount": "5500",
              "date": "2018-01-10",
              "categoryDescription": "Salary",
              "Mode": "In",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "64",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "Sem",
              "type": "DepositCheck",
              "amount": "-11050",
              "date": "2019-01-28",
              "categoryDescription": "tuition Fee",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "65",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "Sem",
              "type": "DepositCheck",
              "amount": "-11050",
              "date": "2018-12-28",
              "categoryDescription": "tuition Fee",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "66",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "Sem",
              "type": "DepositCheck",
              "amount": "-11050",
              "date": "2018-11-28",
              "categoryDescription": "tuition Fee",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },
            {
              "id": "67",
              "account": "B_1010_1002",
              "accountNumber": "1002",
              "transaction": "Sem",
              "type": "DepositCheck",
              "amount": "-11050",
              "date": "2018-10-28",
              "categoryDescription": "tuition Fee",
              "Mode": "Out",
              "currencyCd": "ILS",
              "status": "cleared"
            },{
                "id": "68",
                "account": "B_1010_1003",
                "accountNumber": "1003",
                "transaction": "Personetics",
                "type": "DepositCheck",
                "amount": "4100",
                "date": "2019-02-26",
                "categoryDescription": "Salary",
                "Mode": "In",
                "currencyCd": "ILS",
                "status": "cleared"
              },{
                "id": "69",
                "account": "B_1010_1003",
                "accountNumber": "1003",
                "transaction": "Personetics",
                "type": "DepositCheck",
                "amount": "3100",
                "date": "2019-01-26",
                "categoryDescription": "Salary",
                "Mode": "In",
                "currencyCd": "ILS",
                "status": "cleared"
              },{
                "id": "70",
                "account": "B_1010_1003",
                "accountNumber": "1003",
                "transaction": "Personetics",
                "type": "DepositCheck",
                "amount": "1100",
                "date": "2018-12-26",
                "categoryDescription": "Salary",
                "Mode": "In",
                "currencyCd": "ILS",
                "status": "cleared"
              },{
                "id": "71",
                "account": "B_1010_1003",
                "accountNumber": "1003",
                "transaction": "Personetics",
                "type": "DepositCheck",
                "amount": "4100",
                "date": "2018-11-26",
                "categoryDescription": "Salary",
                "Mode": "In",
                "currencyCd": "ILS",
                "status": "cleared"
              },{
                "id": "72",
                "account": "B_1010_1003",
                "accountNumber": "1003",
                "transaction": "Personetics",
                "type": "DepositCheck",
                "amount": "6100",
                "date": "2018-10-26",
                "categoryDescription": "Salary",
                "Mode": "In",
                "currencyCd": "ILS",
                "status": "cleared"
              },{
                "id": "73",
                "account": "B_1010_1003",
                "accountNumber": "1003",
                "transaction": "Personetics",
                "type": "DepositCheck",
                "amount": "1100",
                "date": "2018-09-26",
                "categoryDescription": "Salary",
                "Mode": "In",
                "currencyCd": "ILS",
                "status": "cleared"
              },{
                "id": "74",
                "account": "B_1010_1003",
                "accountNumber": "1003",
                "transaction": "Gov.org",
                "type": "charge",
                "amount": "2000.00",
                "date": "2019-01-10",
                "categoryDescription": "grant",
                "Mode": "In",
                "currencyCd": "ILS",
                "status": "cleared"
              },{
                "id": "75",
                "account": "B_1010_1003",
                "accountNumber": "1003",
                "transaction": "Gov.org",
                "type": "charge",
                "amount": "2000.00",
                "date": "2019-02-10",
                "categoryDescription": "grant",
                "Mode": "In",
                "currencyCd": "ILS",
                "status": "cleared"
              },{
                "id": "76",
                "account": "B_1010_1003",
                "accountNumber": "1003",
                "transaction": "Gov.org",
                "type": "charge",
                "amount": "2800.00",
                "date": "2018-12-10",
                "categoryDescription": "grant",
                "Mode": "In",
                "currencyCd": "ILS",
                "status": "cleared"
              },{
                "id": "77",
                "account": "B_1010_1003",
                "accountNumber": "1003",
                "transaction": "Gov.org",
                "type": "charge",
                "amount": "2800.00",
                "date": "2018-10-10",
                "categoryDescription": "grant",
                "Mode": "In",
                "currencyCd": "ILS",
                "status": "cleared"
              },{
                "id": "78",
                "account": "B_1010_1003",
                "accountNumber": "1003",
                "transaction": "Ministry of Education",
                "type": "charge",
                "amount": "3000.00",
                "date": "2019-02-15",
                "categoryDescription": "Scholarship",
                "Mode": "In",
                "currencyCd": "ILS",
                "status": "cleared"
              },{
                "id": "79",
                "account": "B_1010_1003",
                "accountNumber": "1003",
                "transaction": "Ministry of Education",
                "type": "charge",
                "amount": "3000.00",
                "date": "2019-01-15",
                "categoryDescription": "Scholarship",
                "Mode": "In",
                "currencyCd": "ILS",
                "status": "cleared"
              },{
                "id": "80",
                "account": "B_1010_1003",
                "accountNumber": "1003",
                "transaction": "Ministry of Education",
                "type": "charge",
                "amount": "3000.00",
                "date": "2018-12-15",
                "categoryDescription": "Scholarship",
                "Mode": "In",
                "currencyCd": "ILS",
                "status": "cleared"
              },{
                "id": "81",
                "account": "B_1010_1003",
                "accountNumber": "1003",
                "transaction": "Ministry of Education",
                "type": "charge",
                "amount": "3000.00",
                "date": "2018-11-15",
                "categoryDescription": "Scholarship",
                "Mode": "In",
                "currencyCd": "ILS",
                "status": "cleared"
              },{
                "id": "82",
                "account": "B_1010_1003",
                "accountNumber": "1003",
                "transaction": "Ministry of Education",
                "type": "charge",
                "amount": "3000.00",
                "date": "2018-10-15",
                "categoryDescription": "Scholarship",
                "Mode": "In",
                "currencyCd": "ILS",
                "status": "cleared"
              },
          ]
        ,
        "accounts":
            [
                {
                    "id": "B_1010_1002",
                    "balance": "320",
                    "number": "1002",
                    "credit": "11177.57",
                    "currencyCd": "ILS",
                    "type": "Credit",
                    "accountStatus": "Open",
                    "numberOfOwners": "1"
                }, {
                    "id": "B_1010_1003",
                    "balance": "2000",
                    "number": "1003",
                    "credit": "1000",
                    "currencyCd": "ILS",
                    "type": "Credit",
                    "accountStatus": "Open",
                    "numberOfOwners": "1"
                }
                , {
                    "id": "B_1010_1007",
                    "balance": "24430",
                    "number": "1007",
                    "credit": "1000",
                    "currencyCd": "ILS",
                    "type": "Credit",
                    "accountStatus": "Open",
                    "numberOfOwners": "1"
                }, {
                    "id": "B_1010_1001",
                    "balance": "-1430",
                    "number": "1001",
                    "credit": "1000",
                    "currencyCd": "ILS",
                    "type": "Credit",
                    "accountStatus": "Open",
                    "numberOfOwners": "1"
                }
            ]
    }
}

const banks ={
    "test-1":{
        'content-type': 'application/json',
        'token': '3dwesdlklkl67tyu89776',
        'name': 'test bank 1',
        'lang': 'en'
    },
    "test-2":{
        'content-type': 'application/json',
        'token': '3dwesdlklkl67tyu89888',
        'name': 'test bank 2',
        'lang': 'en'
    },
    "test-3":{
        'content-type': 'application/json',
        'token': '3dwesdlklkl67tyu89uto',
        'name': 'test bank 3',
        'lang': 'en'
    }
}
let userId;
let bank;
const serverURL = "https://personetics-moneywatch.herokuapp.com";


const personeticsAPIs = [
    'getInsights',
    'getInsightDetails',
    'getInboxInsights',
    'updateInsightRating',
    'updateInsightFeedback'
]

/**
 * serves
 * Page: project's home/sample page
 * Request Type: POST
 * Handle: will rout/send/pipe the request to the appropriate server, according to network map
 */
app.post('/*', function (req, res, next) {
    if (personeticsAPIs.indexOf(req.body.type) > -1) {
        request.post({
            url: `${serverURL}/${req.body.type}`,
            body: JSON.stringify(Object.assign(req.body, {
                transactions: usersData[userId].transactions,
                accounts: usersData[userId].accounts
            })),
            headers: banks[bank]
        }, function (error, response, body) {
            if (error || response.statusCode !== 200) {
                res.send({ ok: false, error: error ? error.message : "error" });
            } else {
                var respo = JSON.parse(body);
                respo.unreadMessages = 1;
                respo.ok = true;
                respo.protocolVersion = 2.3;
                respo.statusMessage = "ok";
                respo.status = "200";
                res.send(respo);
            }
        });
    } else {
        res.send({ ok: true });
    }
})
















//----------------------------------------------------
app.get('/', function (request, response) {
    bank = request.query.bank;
    userId = request.query.userId;
    response.sendFile("samplePage/samplePage.html", { root: 'Product' });
})
/**
 * serves
 * Page: project's home/sample page
 * Request Type: GET
 * Handle: returns resources(files) upon request, with the bellow file name extensions
 */
var fileExtentions = ['js', 'css', 'ashx', 'gif', 'svg', 'jpg', 'png', 'html', 'htm', 'map', 'ttf'];
app.get('/*\.(' + fileExtentions.join('|') + ')', function (request, response) {
    var url = request.params[0] + "." + request.params[1];
    response.sendFile(url, { root: 'Product' });
})

app.listen(port, function (err) {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log("server is listening on " + port);
})

module.exports = app;
