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
    "shlomo": {
        "transactions":
            [
                {
                    "id": "1",
                    "account": "B_1010_1003",
                    "accountNumber": "1003",
                    "transaction": "NETFLIX.COM",
                    "type": "DepositCheck",
                    "amount": "9000.99",
                    "date": "2018-02-11",
                    "categoryDescription": "Travel",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "1B",
                    "account": "B_1010_1003",
                    "accountNumber": "1003",
                    "transaction": "NETFLIX.COM",
                    "type": "DepositCheck",
                    "amount": "9000.99",
                    "date": "2018-02-11",
                    "categoryDescription": "Travel",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "2",
                    "account": "B_1010_1003",
                    "accountNumber": "1003",
                    "transaction": "NETFLIX.COM",
                    "type": "DepositCheck",
                    "amount": "-219.99",
                    "date": "2018-02-11",
                    "categoryDescription": "Grocery",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "3",
                    "account": "B_1010_1004",
                    "accountNumber": "1004",
                    "transaction": "NETFLIX.COM",
                    "type": "DepositCheck",
                    "amount": "-219.99",
                    "date": "2018-01-06",
                    "categoryDescription": "Grocery",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "4",
                    "account": "B_1010_1002",
                    "accountNumber": "1002",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "9000.99",
                    "date": "2018-02-11",
                    "categoryDescription": "Salary",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "5",
                    "account": "B_1010_1002",
                    "accountNumber": "1002",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "9000.99",
                    "date": "2017-12-28",
                    "categoryDescription": "Salary",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "6",
                    "account": "B_1010_1002",
                    "accountNumber": "1002",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "6000.99",
                    "date": "2017-11-28",
                    "categoryDescription": "Salary",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "7",
                    "account": "B_1010_1002",
                    "accountNumber": "1002",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "7000.99",
                    "date": "2017-10-28",
                    "categoryDescription": "Salary",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "8",
                    "account": "B_1010_1003",
                    "accountNumber": "1003",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "5000.99",
                    "date": "2017-09-28",
                    "categoryDescription": "Salary",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "9",
                    "account": "B_1010_1003",
                    "accountNumber": "1003",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "5000.99",
                    "date": "2017-08-28",
                    "categoryDescription": "Salary",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                },
                {
                    "id": "10",
                    "account": "B_1010_1002",
                    "accountNumber": "1002",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "2000",
                    "date": "2018-02-11",
                    "categoryDescription": "Government",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "11",
                    "account": "B_1010_1004",
                    "accountNumber": "1004",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "1000.99",
                    "date": "2017-12-28",
                    "categoryDescription": "Government",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "12",
                    "account": "B_1010_1002",
                    "accountNumber": "1002",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "5000.99",
                    "date": "2017-11-28",
                    "categoryDescription": "Government",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "13",
                    "account": "B_1010_1002",
                    "accountNumber": "1002",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "1000.99",
                    "date": "2017-10-28",
                    "categoryDescription": "Government",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "14",
                    "account": "B_1010_1003",
                    "accountNumber": "1003",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "5000.99",
                    "date": "2017-09-28",
                    "categoryDescription": "Government",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "15",
                    "account": "B_1010_1003",
                    "accountNumber": "1003",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "5000.99",
                    "date": "2017-08-28",
                    "categoryDescription": "Salary",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "14",
                    "account": "B_1010_1003",
                    "accountNumber": "1003",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "5000.99",
                    "date": "2017-09-28",
                    "categoryDescription": "Government",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "16",
                    "account": "B_1010_1003",
                    "accountNumber": "1003",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "-5000.99",
                    "date": "2018-02-11",
                    "categoryDescription": "Grocery",
                    "Mode": "Out",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "16B",
                    "account": "B_1010_1003",
                    "accountNumber": "1003",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "-5000.99",
                    "date": "2018-02-11",
                    "categoryDescription": "Grocery",
                    "Mode": "Out",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "16b",
                    "account": "B_1010_1003",
                    "accountNumber": "1003",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "-4000.99",
                    "date": "2018-01-27",
                    "categoryDescription": "Grocery",
                    "Mode": "Out",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }
                , {
                    "id": "17",
                    "account": "B_1010_1004",
                    "accountNumber": "1004",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "-1000.99",
                    "date": "2018-01-08",
                    "categoryDescription": "Grocery",
                    "Mode": "Out",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "18",
                    "account": "B_1010_1004",
                    "accountNumber": "1004",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "-112000.99",
                    "date": "2018-01-18",
                    "categoryDescription": "Travel",
                    "Mode": "Out",
                    "currencyCd": "ILS",
                    "status": "cleared"
                },
                {
                    "id": "18",
                    "account": "B_1010_1004",
                    "accountNumber": "1004",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "-1000.99",
                    "date": "2017-12-18",
                    "categoryDescription": "Travel",
                    "Mode": "Out",
                    "currencyCd": "ILS",
                    "status": "cleared"
                },
                {
                    "id": "19",
                    "account": "B_1010_1003",
                    "accountNumber": "1003",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "-3000.99",
                    "date": "2017-12-28",
                    "categoryDescription": "Grocery",
                    "Mode": "Out",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }
                , {
                    "id": "17",
                    "account": "B_1010_1003",
                    "accountNumber": "1003",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "-400.99",
                    "date": "2018-01-11",
                    "categoryDescription": "EEE",
                    "Mode": "Out",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "18",
                    "account": "B_1010_1004",
                    "accountNumber": "1004",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "-2000.99",
                    "date": "2017-11-11",
                    "categoryDescription": "Travel",
                    "Mode": "Out",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "19",
                    "account": "B_1010_1004",
                    "accountNumber": "1004",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "2000.99",
                    "date": "2018-01-18",
                    "categoryDescription": "Salary",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "20",
                    "account": "B_1010_1004",
                    "accountNumber": "1004",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "440.99",
                    "date": "2018-01-28",
                    "categoryDescription": "Government",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "21",
                    "account": "B_1010_1004",
                    "accountNumber": "1004",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "1440.99",
                    "date": "2018-01-08",
                    "categoryDescription": "Government",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "22",
                    "account": "B_1010_1003",
                    "accountNumber": "1003",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "1440.99",
                    "date": "2018-01-08",
                    "categoryDescription": "Government",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                },
                {
                    "id": "23",
                    "account": "B_1010_1003",
                    "accountNumber": "1003",
                    "transaction": "sem.COM",
                    "type": "PostedCheck",
                    "amount": "-1440.99",
                    "date": "2018-02-11",
                    "categoryDescription": "null",
                    "Mode": "Out",
                    "currencyCd": "ILS",
                    "status": "cleared"
                },
                {
                    "id": "24",
                    "account": "B_1010_1005",
                    "accountNumber": "1005",
                    "transaction": "sem.COM",
                    "type": "PostedCheck",
                    "amount": "-1440.99",
                    "date": "2018-02-11",
                    "categoryDescription": "null",
                    "Mode": "Out",
                    "currencyCd": "ILS",
                    "status": "cleared"
                },
                {
                    "id": "25",
                    "account": "B_1010_1005",
                    "accountNumber": "1005",
                    "transaction": "seddddm.COM",
                    "type": "PostedCheck",
                    "amount": "-120.99",
                    "date": "2018-01-11",
                    "categoryDescription": "null",
                    "Mode": "Out",
                    "currencyCd": "ILS",
                    "status": "cleared"
                },
                {
                    "id": "26",
                    "account": "B_1010_1005",
                    "accountNumber": "1005",
                    "transaction": "Nrtdm.COM",
                    "type": "PostedCheck",
                    "amount": "-120.99",
                    "date": "2018-01-11",
                    "categoryDescription": "null",
                    "Mode": "Out",
                    "currencyCd": "ILS",
                    "status": "cleared"
                },
                {
                    "id": "26B",
                    "account": "B_1010_1005",
                    "accountNumber": "1005",
                    "transaction": "Nrtdm.COM",
                    "type": "PostedCheck",
                    "amount": "-120.99",
                    "date": "2017-12-11",
                    "categoryDescription": "null",
                    "Mode": "Out",
                    "currencyCd": "ILS",
                    "status": "cleared"
                },
                {
                    "id": "26C",
                    "account": "B_1010_1005",
                    "accountNumber": "1005",
                    "transaction": "Nrtdm.COM",
                    "type": "PostedCheck",
                    "amount": "-120.99",
                    "date": "2017-11-11",
                    "categoryDescription": "null",
                    "Mode": "Out",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }],
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
                    "id": "B_1010_1004",
                    "balance": "24430",
                    "number": "1004",
                    "credit": "1000",
                    "currencyCd": "ILS",
                    "type": "Credit",
                    "accountStatus": "Open",
                    "numberOfOwners": "1"
                }, {
                    "id": "B_1010_1005",
                    "balance": "-1430",
                    "number": "1005",
                    "credit": "1000",
                    "currencyCd": "ILS",
                    "type": "Credit",
                    "accountStatus": "Open",
                    "numberOfOwners": "1"
                }
            ]
    },
    "david": {
        "transactions":
            [
                {
                    "id": "1",
                    "account": "B_1010_1003",
                    "accountNumber": "1003",
                    "transaction": "NETFLIX.COM",
                    "type": "DepositCheck",
                    "amount": "9000.99",
                    "date": "2018-02-11",
                    "categoryDescription": "Travel",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "1B",
                    "account": "B_1010_1003",
                    "accountNumber": "1003",
                    "transaction": "NETFLIX.COM",
                    "type": "DepositCheck",
                    "amount": "9000.99",
                    "date": "2018-02-11",
                    "categoryDescription": "Travel",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "2",
                    "account": "B_1010_1003",
                    "accountNumber": "1003",
                    "transaction": "NETFLIX.COM",
                    "type": "DepositCheck",
                    "amount": "-219.99",
                    "date": "2018-02-11",
                    "categoryDescription": "Grocery",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "3",
                    "account": "B_1010_1004",
                    "accountNumber": "1004",
                    "transaction": "NETFLIX.COM",
                    "type": "DepositCheck",
                    "amount": "-219.99",
                    "date": "2018-01-06",
                    "categoryDescription": "Grocery",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "4",
                    "account": "B_1010_1002",
                    "accountNumber": "1002",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "9000.99",
                    "date": "2018-02-11",
                    "categoryDescription": "Salary",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "5",
                    "account": "B_1010_1002",
                    "accountNumber": "1002",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "9000.99",
                    "date": "2017-12-28",
                    "categoryDescription": "Salary",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "6",
                    "account": "B_1010_1002",
                    "accountNumber": "1002",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "6000.99",
                    "date": "2017-11-28",
                    "categoryDescription": "Salary",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "7",
                    "account": "B_1010_1002",
                    "accountNumber": "1002",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "7000.99",
                    "date": "2017-10-28",
                    "categoryDescription": "Salary",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "8",
                    "account": "B_1010_1003",
                    "accountNumber": "1003",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "5000.99",
                    "date": "2017-09-28",
                    "categoryDescription": "Salary",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "9",
                    "account": "B_1010_1003",
                    "accountNumber": "1003",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "5000.99",
                    "date": "2017-08-28",
                    "categoryDescription": "Salary",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                },
                {
                    "id": "10",
                    "account": "B_1010_1002",
                    "accountNumber": "1002",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "2000",
                    "date": "2018-02-11",
                    "categoryDescription": "Government",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "11",
                    "account": "B_1010_1004",
                    "accountNumber": "1004",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "1000.99",
                    "date": "2017-12-28",
                    "categoryDescription": "Government",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "12",
                    "account": "B_1010_1002",
                    "accountNumber": "1002",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "5000.99",
                    "date": "2017-11-28",
                    "categoryDescription": "Government",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "13",
                    "account": "B_1010_1002",
                    "accountNumber": "1002",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "1000.99",
                    "date": "2017-10-28",
                    "categoryDescription": "Government",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "14",
                    "account": "B_1010_1003",
                    "accountNumber": "1003",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "5000.99",
                    "date": "2017-09-28",
                    "categoryDescription": "Government",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "15",
                    "account": "B_1010_1003",
                    "accountNumber": "1003",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "5000.99",
                    "date": "2017-08-28",
                    "categoryDescription": "Salary",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "14",
                    "account": "B_1010_1003",
                    "accountNumber": "1003",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "5000.99",
                    "date": "2017-09-28",
                    "categoryDescription": "Government",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "16",
                    "account": "B_1010_1003",
                    "accountNumber": "1003",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "-5000.99",
                    "date": "2018-02-11",
                    "categoryDescription": "Grocery",
                    "Mode": "Out",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "16B",
                    "account": "B_1010_1003",
                    "accountNumber": "1003",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "-5000.99",
                    "date": "2018-02-11",
                    "categoryDescription": "Grocery",
                    "Mode": "Out",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "16b",
                    "account": "B_1010_1003",
                    "accountNumber": "1003",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "-4000.99",
                    "date": "2018-01-27",
                    "categoryDescription": "Grocery",
                    "Mode": "Out",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }
                , {
                    "id": "17",
                    "account": "B_1010_1004",
                    "accountNumber": "1004",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "-1000.99",
                    "date": "2018-01-08",
                    "categoryDescription": "Grocery",
                    "Mode": "Out",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "18",
                    "account": "B_1010_1004",
                    "accountNumber": "1004",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "-112000.99",
                    "date": "2018-01-18",
                    "categoryDescription": "Travel",
                    "Mode": "Out",
                    "currencyCd": "ILS",
                    "status": "cleared"
                },
                {
                    "id": "18",
                    "account": "B_1010_1004",
                    "accountNumber": "1004",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "-1000.99",
                    "date": "2017-12-18",
                    "categoryDescription": "Travel",
                    "Mode": "Out",
                    "currencyCd": "ILS",
                    "status": "cleared"
                },
                {
                    "id": "19",
                    "account": "B_1010_1003",
                    "accountNumber": "1003",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "-3000.99",
                    "date": "2017-12-28",
                    "categoryDescription": "Grocery",
                    "Mode": "Out",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }
                , {
                    "id": "17",
                    "account": "B_1010_1003",
                    "accountNumber": "1003",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "-400.99",
                    "date": "2018-01-11",
                    "categoryDescription": "EEE",
                    "Mode": "Out",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "18",
                    "account": "B_1010_1004",
                    "accountNumber": "1004",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "-2000.99",
                    "date": "2017-11-11",
                    "categoryDescription": "Travel",
                    "Mode": "Out",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "19",
                    "account": "B_1010_1004",
                    "accountNumber": "1004",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "2000.99",
                    "date": "2018-01-18",
                    "categoryDescription": "Salary",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "20",
                    "account": "B_1010_1004",
                    "accountNumber": "1004",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "440.99",
                    "date": "2018-01-28",
                    "categoryDescription": "Government",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "21",
                    "account": "B_1010_1004",
                    "accountNumber": "1004",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "1440.99",
                    "date": "2018-01-08",
                    "categoryDescription": "Government",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }, {
                    "id": "22",
                    "account": "B_1010_1003",
                    "accountNumber": "1003",
                    "transaction": "sem.COM",
                    "type": "charge",
                    "amount": "1440.99",
                    "date": "2018-01-08",
                    "categoryDescription": "Government",
                    "Mode": "In",
                    "currencyCd": "ILS",
                    "status": "cleared"
                },
                {
                    "id": "23",
                    "account": "B_1010_1003",
                    "accountNumber": "1003",
                    "transaction": "sem.COM",
                    "type": "PostedCheck",
                    "amount": "-1440.99",
                    "date": "2018-02-11",
                    "categoryDescription": "null",
                    "Mode": "Out",
                    "currencyCd": "ILS",
                    "status": "cleared"
                },
                {
                    "id": "24",
                    "account": "B_1010_1005",
                    "accountNumber": "1005",
                    "transaction": "sem.COM",
                    "type": "PostedCheck",
                    "amount": "-1440.99",
                    "date": "2018-02-11",
                    "categoryDescription": "null",
                    "Mode": "Out",
                    "currencyCd": "ILS",
                    "status": "cleared"
                },
                {
                    "id": "25",
                    "account": "B_1010_1005",
                    "accountNumber": "1005",
                    "transaction": "seddddm.COM",
                    "type": "PostedCheck",
                    "amount": "-120.99",
                    "date": "2018-01-11",
                    "categoryDescription": "null",
                    "Mode": "Out",
                    "currencyCd": "ILS",
                    "status": "cleared"
                },
                {
                    "id": "26",
                    "account": "B_1010_1005",
                    "accountNumber": "1005",
                    "transaction": "Nrtdm.COM",
                    "type": "PostedCheck",
                    "amount": "-120.99",
                    "date": "2018-01-11",
                    "categoryDescription": "null",
                    "Mode": "Out",
                    "currencyCd": "ILS",
                    "status": "cleared"
                },
                {
                    "id": "26B",
                    "account": "B_1010_1005",
                    "accountNumber": "1005",
                    "transaction": "Nrtdm.COM",
                    "type": "PostedCheck",
                    "amount": "-120.99",
                    "date": "2017-12-11",
                    "categoryDescription": "null",
                    "Mode": "Out",
                    "currencyCd": "ILS",
                    "status": "cleared"
                },
                {
                    "id": "26C",
                    "account": "B_1010_1005",
                    "accountNumber": "1005",
                    "transaction": "Nrtdm.COM",
                    "type": "PostedCheck",
                    "amount": "-120.99",
                    "date": "2017-11-11",
                    "categoryDescription": "null",
                    "Mode": "Out",
                    "currencyCd": "ILS",
                    "status": "cleared"
                }],
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
const serverURL = "https://money-watch.herokuapp.com/";

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
            body: JSON.stringify({
                ...req.body,
                transactions: usersData[userId].transactions,
                accounts: usersData[userId].accounts
            }),
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