/*import { createRequire } from 'module';
const require = createRequire(import.meta.url);*/


const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require("dotenv");
const http = require('http');
var bodyParser=require("body-parser");
//import path from 'path';
/*import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);*/

dotenv.config({ path: './.env' })

//ML algo

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: 3307
});

const publicDirectory = path.join(__dirname, './public' );
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false}));
app.use(express.json());


app.set('view engine', 'hbs');


db.connect( (error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("MYSQL Connected...")
    }
})

//app.use(bodyParser.json());


app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));



app.post('/add', async (request, response) => {
    const data = await request.body;
    //const gotData = data.categoryChoice;
    //const category = gotData;
    console.log(data);
    var length = data[1];
    var username = data[0];
    var Mname='';
    var Quantity='';
    var Price = 0;
    for (i = 2; i < data.length; i=i+2) {
    Price = 0;
    Mname = data[i];
    Quantity = parseInt(data[i+1]);
    
    sql20 = 'SELECT * FROM medicines WHERE mname = ?';
    db.query(sql20,[Mname],function(err6, rows, fields){
      if(err6){console.log(err6);
      }else{
        if(rows.length>0){
          var quan = rows[0].quantity;
          var upquan = quan - Quantity;
          if(upquan>0){
          var sql21 = 'UPDATE medicines SET quantity = ? WHERE mname = ?';
          db.query(sql21,[upquan,Mname] , function(err12, rows, fields){
            if(err12){console.log(err12);}
          })
        }else{
          console.log("This Medicine is out of Stock");
        }
          
        }
      }
    }) 



    var sql10 = 'SELECT * FROM medicines WHERE mname = ?';
    db.query(sql10,[Mname],async function(err1,results, fields){
      if(err1){
        console.log(err1);
      }else{
        if(results.length>0){
          Price = (results[0].price)*(Quantity);}
      }
    })
    console.log(data[i]+" "+data[i+1]+" "+Price );
    var sql = "SELECT * FROM purchases WHERE pusername = ? AND mname = ? ";
    db.query(sql,[username,Mname], async function (error, results, fields) {
      if(error){console.log(error);
      }else{
        if(results.length>0){
          var q1 = results[0].quantity;
          var q2 = q1+Quantity;
          var p1  = results[0].price;
          var p2 = p1+Price;
          //console.log("result quantityr "+q1);
          var Sql1 = "UPDATE purchases SET quantity = ? WHERE pusername= ? AND mname = ? AND price = ? "; 
          db.query(Sql1,[q2,username,Mname,p2], (error, results, fields)=>{
            if(error){console.log(error);}
          })
          
        }else{
          //console.log("for"+Mname+" "+results.length);
          db.query('INSERT INTO purchases SET ?',{pusername: username,mname : Mname, quantity: Quantity,price:Price},(error,results) =>{
            if(error){
              console.log(error);
            }/*else{
              return res.send({
                "code":206,
                "success":"registered"
                  });
            }*/
          })
        }//end of inner else
      }//end of else
    })//end of query1
    
    }//end of for
})



app.post('/addit', async (request, response) => {
  const data = await request.body;
  //const gotData = data.categoryChoice;
  //const category = gotData;
  console.log(data);
  
  
})


app.post('/up', async (request, response) => {
  const data = await request.body;
  //const gotData = data.categoryChoice;
  //const category = gotData;
  console.log(data);

  
  
})

/*
app.post('/dochis', async (request, response) => {
  const data = await request.body;
  //const gotData = data.categoryChoice;
  //const category = gotData;
  console.log(data);
  var userd = data[0];
  var name = '';
  var spec ='';
  sql22 = 'SELECT * FROM doctors WHERE usernamed =? ';
  db.query(sql22,[userd],function(error, rows, fields){
    if(error){
      console.log(error);
    }else{
      if(rows.length>0){
        name = rows[0].name;
        spec = rows[0].spec;
        console.log(name+" "+spec);
        Sql21 = 'SELECT * FROM appointments WHERE dname = ? AND spec =?';
        db.query(Sql21, [name, spec], function(err, results, fields){
          if(err){
            console.log(err);
          }else{
            console.log(results.length);
            if(results.length>0){
              response.render("docappointments",{items:results});
            }
          }
        })

      }
    }
  })

  

  
  
})*/




app.listen(5004, () => {
    console.log("Server started on Port 5004");
})      