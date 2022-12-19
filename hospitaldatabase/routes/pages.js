/*import { createRequire } from 'module';
const require = createRequire(import.meta.url);*/

const mysql = require("mysql");
const { use } = require("../routes/auth");

var userp='';

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: 3307
});

const express = require('express');
const e = require("express");
const app = express();
const router = express.Router();

router.get("/", ( req, res) =>{
    res.render("home");
});
router.get("/homep", ( req, res) =>{
    res.render("patients");
});
router.get("/register", ( req, res) =>{
    res.render("register");
});
router.get("/patients_login", ( req, res) =>{
    res.render("patients_login");
});
router.get("/patients", ( req, res) =>{
    res.render("patients");
});
router.get("/index", ( req, res) =>{
    res.render("index");
});


router.get("/book", ( req, res) =>{
    res.render("book");
});
router.get("/docapp", ( req, res) =>{
    res.render("docappointments");
});
router.get("/doctor", ( req, res) =>{
    res.render("doctorlogin");
});



router.get("/docpharm", ( req, res) =>{

    db.query("SELECT * FROM medicines",function(err,rows,fields){
        
    if(err){console.log(err);}
    else{
        db.query("SELECT * FROM medicines",function(err,rows,fields){
            
        res.render("docpharmacy",{title:'pharmacy',
        items:rows });
        
        })
    }
    
    })
});

router.get("/adminpharm", ( req, res) =>{

    db.query("SELECT * FROM medicines",function(err,rows,fields){
        
    if(err){console.log(err);}
    else{
        db.query("SELECT * FROM medicines",function(err,rows,fields){
            
        res.render("adminpharmacy",{title:'pharmacy',
        items:rows });
        
        })
    }
    
    })
});


/*
router.get("/profile", (req,res)=>{
    
    
    res.render("profile");
});*/









router.get("/doc", ( req, res) =>{
    
    res.render('dochome');
});


router.get("/admin", ( req, res) =>{
    res.render("admin");
});

router.get("/shop", ( req, res) =>{
    var sql15 = 'SELECT * FROM medicines'
    db.query(sql15, function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            res.render("index", {items:rows});
        }
    })
    
    
});


//admin



router.get("/adminapp", ( req, res) =>{


    var sql23 = 'SELECT * FROM appointments';
    db.query(sql23,function(error, results, fields){
        if(error){
            console.log(error);
        }else{
            if(results.length>0){
                res.render("adminapp", 
                {items:results});

            }
        }

    })
    
});

router.get("/adminhome", ( req, res) =>{


    res.render('adminhome');
    
});


router.get("/admindoc", ( req, res) =>{


    var sql24 = 'SELECT * FROM doctors';
    db.query(sql24,function(error, results, fields){
        if(error){
            console.log(error);
        }else{
            if(results.length>0){
                res.render("admindoc", 
                {items:results});

            }
        }

    })
    
});

router.get("/docreg", ( req, res) =>{


    res.render('docreg');
    
});



router.get("/updatemed", ( req, res) =>{


    res.render('updatemed');
    
});
router.get("/updatemed1", ( req, res) =>{


    res.render('updatemed1');
    
});


router.get("/contact", ( req, res) =>{


    res.render('contact');
    
});


module.exports = router;    