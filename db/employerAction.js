var express = require('express');
var router = express.Router();
var db = require('../db');
var employerAction = require('../db/employerAction');

exports.findEmployerEmail = function(req, res){

    var queryName = 'SELECT * FROM employer WHERE aEmail = "'+ req.body.aEmail +'"';

    db.query(queryName,function(err, result) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('result is:'+ result[0]);
            if(result[0] != undefined)
            {
                console.log("here is coming");
                req.flash('aEmail', 'The email already exists');
                res.redirect('/employercreate');
            }
            else
                employerAction.findEmployerName(req, res);
        }

    });

};

exports.findEmployerName = function(req, res){

    var queryName = 'SELECT * FROM employer WHERE cName = "'+ req.body.cName +'"';
    db.query(queryName,function(err, result) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result[0]);
            if(result[0] != undefined)
            {
                console.log("here is coming");
                req.flash('cNameExist', 'The company name already exists');
                res.redirect('/employercreate');
            }
            else
                employerAction.findEmployercEmail(req, res);
        }

    });

};

exports.findEmployercEmail = function(req, res){

    var queryName = 'SELECT * FROM employer WHERE cPersonEmail = "'+ req.body.cPersonEmail +'"';
    db.query(queryName,function(err, result) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result[0]);
            if(result[0] != undefined)
            {
                console.log("here is coming");
                req.flash('cPersonEmail', 'The email already exists');
                res.redirect('/employercreate');
            }
            else
                employerAction.findEmployerpEmail(req, res);
        }

    });

};



exports.addEmployer = function(req, res){

    var usr = req.body;
    var details = [];
    var Description;
    var VirtualAdress;
    // if(!usr.bDescription){
    //     Description = "";
    // }
    //else
    //    Description = usr.bDescription;

    Description = (usr.bDescription) ? usr.bDescription : "";
    VirtualAdress = (usr.webAddress) ? usr.webAddress : "";

    console.log(usr);
    details = {
        aEmail: usr.aEmail,
        password: usr.password,
        cName: usr.cName,
        cPersonName: usr.cPersonName,
        cPersonDesignation: usr.cPersonDesignation,
        cPersonMobile: usr.cPersonMobile,
        cPersonEmail: usr.cPersonEmail,
        industryType: usr.industryType,
        bDescription: Description,
        pEmail: usr.pEmail,
        pCountry: usr.pCountry,
        pCity: usr.pCity,
        pContactAddress: usr.pContactAddress,
        pContactPhone: usr.pContactPhone,
        webAddress: VirtualAdress,
        policy: usr.policy
    };
    db.query('INSERT into  `employer` SET ?', details, function (err, result) {
        if (err)
            throw err;
        else{
            console.log(' The value inserted. ');
            req.flash('success', 'Your registration has been successfully completed.');
            res.redirect('/employercreate');
        }

    });

};