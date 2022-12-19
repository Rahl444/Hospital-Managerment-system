const mysql = require("mysql");
const { use } = require("../routes/auth");
var userp='';
var userd=  '';
var pname ='';
var age=0;
var gender = '';
var des = '';
var docname = '';
var spec = 'snckjdwn';
var branch = '';
var date = '';
var time = '';
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: 3307
});

exports.login=(req,res)=>{
    //console.log(req.body);


    const username = req.body.username;
    const password = req.body.password;
    db.query('SELECT * FROM log WHERE username = ? AND user = ?',[username, "patient"], async function (error, results, fields) {
        if (error) {
          res.send({
            "code":400,
            "failed":"error ocurred"
          })
        }else{
          if(results.length >0){
            //const comparision = await bcrypt.compare(password, results[0].password)
            if(password == results[0].password){
                console.log("logged in");
                /*res.send({
                  "code":200,
                  "success":"login sucessfull"
                })*/
                userp=username;
                res.render("patients");
                /*if (typeof localStorage === "undefined" || localStorage === null) {
                  var LocalStorage = require('node-localstorage').LocalStorage;
                  localStorage = new LocalStorage('./scratch');
               }
               globalVariable.x=username;
                localStorage.setItem("username", "4rfrrs");
                console.log("sent");*/
            }
            else{
              return res.render('patients_login',{message:'Wrong Password'
            });
            }
          }
          else{
            return res.render('patients_login',{message:'Username Not valid'
            });
          }
        }
        });



    //res.send("login sucess");
}
exports.reg=(req,res)=>{

  const name = req.body.full_name;
  const number = req.body.phoneNumber;
  const city = req.body.city;
  const gender = req.body.gender;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const password_again = req.body.password_again;
  //console.log(req.body);
  db.query('SELECT * FROM log WHERE username = ?',[username], async function (error, results, fields) {

    if(error){
      console.log(error);
    }else{
      if(results.length > 0){
        return res.render('register',{message:'Username Not available'
            });
      }else if(password.length<8){
        if(password!=password_again){
          return res.render('register',{message:'Password does not match'
        });
        }
      }
      else if(number.length>12){
        return res.render('register',{message:'Enter a valid Contact Number'
            });
      }
    }

    

    db.query('INSERT INTO log SET ?',{username: username,password:password,email_id:email,user:'patient' },(error,results) =>{
      if(error){
        console.log(error);
      }else{
        db.query('INSERT INTO patients SET ?',{username: username,name: name,email:email,phone_num:number,gender:gender,password:password,city:city },(error,results) =>{
          if(error){
            console.log(error);
          }
        })
        res.render('patients_login');
      }
    })

    

    
    
  });


  
}

exports.doclogin=(req,res)=>{
  //console.log(req.body);


  const username = req.body.username;
  const password = req.body.password;
  db.query('SELECT * FROM log WHERE username = ? AND user = ?',[username,"doctor"], async function (error, results, fields) {
      if (error) {
        res.send({
          "code":400,
          "failed":error
        })
      }else{
        if(results.length >0){
          
          if(password == results[0].password){
              console.log("logged in");
              
              userd=username;
              res.render("dochome");
              
          }
          else{
            return res.render('doctorlogin',{message:'Wrong Password'
            });
          }
        }
        else{
          return res.render('doctorlogin',{message:'Invalid Username'
            });
        }
      }
      });



  //res.send("login sucess");
}

exports.history=(req,res)=>{
    var name = '';
    var email = '';
    console.log("success");
    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require('node-localstorage').LocalStorage;
      localStorage = new LocalStorage('./scratch');}
    const username = localStorage.getItem("user1");
    console.log(username);
  db.query('SELECT * FROM patients WHERE username = ?', [userp] , async function (error, results, fields) {

    if(error){console.log(error);}
    else{
      console.log(results);
      res.write('<table><tr>');
      for(var column in results[0]){
        res.write('<td><label>'+column+'</label></td>');
        res.write('</tr>');
      }
      for(var row in results){
        res.write('<tr>');
        for(var column in results[row]){
          res.write('<td><label>'+results[row][column]+'</label></td>');
        }
        res.write('</tr>');
      }  
      res.write('</table>');
    }
  })
  //alert("sucess");
  

}

exports.book4=(req,res)=>{
  
  var time = req.body.time;
  des = req.body.des;
  
  sql3 = 'INSERT INTO appointments SET ?';
  sql4 = 'SELECT * FROM appointments WHERE pusername = ? AND pname = ? AND date = ? AND time = ?';
  sql5 = 'SELECT * FROM appointments WHERE pusername = ? AND date = ? AND time = ?';

  db.query(sql4,[userp,pname,date,time], function(error, rows, fields) {

    if(error){
      console.log(error);
    }else{
      if(rows.length>0){
        //alert("Appointment already booked at this date and time for this patient");
        return res.render('book3',{message:'Appointment already booked at this date and time for this patient'
            });
        
      }else{
        db.query(sql5,[userp,date,time], function(err, row, fields){
          if(err){console.log(err);}
          else{
            if(row.length>0){
              //alert("You already booked an appointment at this time. Do you want to continue ??");
              console.log("You already booked an appointment at this time. Do you want to continue ??");

            }
            db.query(sql3,{pusername:userp,dname:docname,date:date,time:time,branch:branch,pname:pname, age:age,gender:gender,spec:spec,des:des}, function(err1,r, fields){
              if(err1){console.log(err1);
              }else{
                //alert("Appointment Booked Successfully");
                console.log("Appointment Booked Successfully");
                res.render('patients');
              }
            })
          }

        })//end of 2nd q
      }//end of second else
    }//end of 1st else
    
  })//end of first q

}

exports.book3=(req,res)=>{
    docname = req.body.doctor;
    date = req.body.birthday;
    console.log(docname+" "+date);
    var k =0;
    db.query("SELECT * FROM appointments WHERE dname = ? AND date = ?",[docname,date], function(err,rows,fields){
        if(err){console.log(err);}
        else{
            a=[10,11,12,13,15,16,17,18];
            for(var i=0;i<rows.length;i++){
                var t= rows[i].time;
                var index = a.indexOf(t);
                if (index > -1) {
                    a.splice(index, 1);
                    k=k+1;}
            }
            console.log(a);
            var d =[];
            for(var j=0;j<a.length;j++){
              if(a[j]<12){
              var time = (a[j])+"-"+(a[j]+1)+" AM";
              d.push(time);}
              else if(a[j]==12){
                var time = (a[j])+"-"+(a[j]-11)+" PM";
                d.push(time);
              }
              else{
                var time = (a[j]-12)+"-"+(a[j]-11)+" PM";
                d.push(time);
              }
            }
            console.log(d);
            if(d.length==0){d.push("Doctor not available for this date");}
            res.render("book3",{title:'doctor',
            items:d });
        }
    
    
    })
  }




  exports.booking=(req,res)=>{
    branch = req.body.HospitalBranch;
    spec  = req.body.spec;
    pname = req.body.name;
    age = req.body.age;
    gender = req.body.gender;
    console.log(branch);
    db.query("SELECT * FROM doctors WHERE branch = ? AND spec = ?",[branch,spec], function(error,rows,fields){
        if(error){console.log(error);}
        else{
            res.render("book2",{title:'doctor',
            items:rows });
        }
    
    
    })
    

}



exports.apphistory=(req,res)=>{

  
      
  
      db.query("SELECT * FROM appointments WHERE pusername = ?",[userp],function(err,rows,fields){
      res.render("apphistory",{title:'User | Appointment History',
      items:rows });
      
      })
  
  
  

}


exports.medhis=(req, res)=>{


  sql11= 'SELECT * FROM purchases WHERE pusername =?';
  db.query(sql11,[userp],function(error, rows, fields){

    if(error){
      console.log(error);
    }else{
      res.render("medhistory",{title:'medicine History',
      items:rows });
    }
  })

}

exports.dochis=(req, res)=>{

  
  
  var name = '';
  var spec ='';
  var sql22 = 'SELECT * FROM doctors WHERE usernamed =? ';
  db.query(sql22,[userd],function(error, rows, fields){
    if(error){
      console.log(error);
    }else{
      if(rows.length>0){
        name = rows[0].name;
        spec = rows[0].spec;
        console.log(name+" "+spec);
        var Sql21 = 'SELECT * FROM appointments WHERE dname = ? AND spec =?';
        db.query(Sql21, [name, spec], function(err, rows1, fields){
          if(err){
            console.log(err);
          }else{
            //console.log(rows1.length);
            
              res.render("docappointments",{title:'medicine History',
      items:rows1 });
            
          }
        })

      }
    }
  })

  

  
  
}


exports.profile=(req, res)=>{


  var sql11= 'SELECT * FROM patients WHERE username =?';
  db.query(sql11,[userp],function(error, rows, fields){

    if(error){
      console.log(error);
    }else{
      if(rows.length>0){
      res.render("profile",{title:'profile',
      username : userp,
      name : rows[0].name,
      email : rows[0].email,
      phone : rows[0].phone_num,
      gender : rows[0].gender,
      city : rows[0].city,
      items:rows });
    }
  }
  })

}

exports.docprofile=(req, res)=>{


  var sql11= 'SELECT * FROM doctors WHERE usernamed =?';
  db.query(sql11,[userd],function(error, rows, fields){

    if(error){
      console.log(error);
    }else{
      if(rows.length>0){
      res.render("docprofile",{title:'profile',
      username : userd,
      name : rows[0].name,
      email : rows[0].emailid,
      phone : rows[0].phonenum,
      gender : rows[0].gender,
      city : rows[0].branch,
      spec : rows[0].spec,
      items:rows });
    }
  }
  })

}


exports.regdoc=(req,res)=>{

  const name = req.body.full_name;
  const number = req.body.phoneNumber;
  const age = req.body.age;
  const city = req.body.city;
  const gender = req.body.gender;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const password_again = req.body.password_again;
  const spec1 =  req.body.spec;
  console.log(req.body);
  db.query('SELECT * FROM log WHERE username = ?',[username], async function (error, results, fields) {

    if(error){
      console.log(error);
    }else{
      if(results.length > 0){
        return res.send({
          "code":206,
          "success":"username not availaable"
            });
      }else if(password.length<8){
        if(password!=password_again){
          return res.send({
            "code":206,
            "success":"password do not match"
              });
        }
      }
      
    }

    

    db.query('INSERT INTO log SET ?',{username: username,password:password,email_id:email,user:'doctor' },(error,results) =>{
      if(error){
        console.log(error);
      }else{
        db.query('INSERT INTO doctors SET ?',{usernamed: username,name: name,emailid:email,phonenum:number,gender:gender,branch:city,spec:spec1,age:age },(error,results) =>{
          if(error){
            console.log(error);
          }
        })
        res.render('adminhome');
      }
    })

    

    
    
  });


  
}




exports.adminhome=(req,res)=>{

  var aname = req.body.aname;
  var pss = req.body.apassword;
  if(aname ==  'admin'){
      if(pss == 'EcoHealth'){
          res.render("adminhome");
      }else{
          return res.render("admin",{message:'Wrong Password'});    
      }
  }else{
      return res.render("admin",{message:'Username Invalid'});
  }
  
}


//doctors med update


exports.medup=(req,res)=>{

  var med = req.body.mname;
  var qua = req.body.quantity;
  var dom = req.body.dom;
  var pr = req.body.price;
  var bb = req.body.bestbefore;


  var sql24 = 'SELECT * FROM medicines WHERE mname = ?';
  
  db.query(sql24,[med],function(error, rows, fields){
    if(error){
      console.log(error);
    }else{
      if(rows.length>0){
        var sql25 = 'UPDATE medicines SET quantity = ? ,dom=? ,price=?,bestbefore=? WHERE mname = ?';
        db.query(sql25,[qua,dom,pr,bb,med ],function(err, results, fields){
          if(err){console.log(err);}
        })
      }else{
        var sql26 = 'INSERT INTO medicines SET ?';
        db.query(sql26, {mname:med,quantity:qua, dom:dom, price:pr,bestbefore:bb },function(err, result, fields){
          if(err){console.log(err);}
        })
      }
      db.query("SELECT * FROM medicines",function(err,rows,fields){
        
        if(err){console.log(err);}
        else{
            db.query("SELECT * FROM medicines",function(err,rows,fields){
                
            res.render("docpharmacy",{title:'pharmacy',
            items:rows });
            
            })
        }
        
        })
    }
  })

  
}




exports.medup1=(req,res)=>{

  var med = req.body.mname;
  var qua = req.body.quantity;
  var dom = req.body.dom;
  var pr = req.body.price;
  var bb = req.body.bestbefore;


  var sql24 = 'SELECT * FROM medicines WHERE mname = ?';
  
  db.query(sql24,[med],function(error, rows, fields){
    if(error){
      console.log(error);
    }else{
      if(rows.length>0){
        var sql25 = 'UPDATE medicines SET quantity = ? ,dom=? ,price=?,bestbefore=? WHERE mname = ?';
        db.query(sql25,[qua,dom,pr,bb,med ],function(err, results, fields){
          if(err){console.log(err);}
        })
      }else{
        var sql26 = 'INSERT INTO medicines SET ?';
        db.query(sql26, {mname:med,quantity:qua, dom:dom, price:pr,bestbefore:bb },function(err, result, fields){
          if(err){console.log(err);}
        })
      }
      db.query("SELECT * FROM medicines",function(err,rows,fields){
        
        if(err){console.log(err);}
        else{
            db.query("SELECT * FROM medicines",function(err,rows,fields){
                
            res.render("docpharmacy",{title:'pharmacy',
            items:rows });
            
            })
        }
        
        })
    }
  })

  
}