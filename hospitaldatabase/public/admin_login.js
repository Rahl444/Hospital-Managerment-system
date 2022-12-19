function validate()
{

var aname=document.getElementById("aname").value;
var apassword=document.getElementById("apassword").value;
if(aname=="admin" && apassword=="admin"){
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
     }
var username = localStorage.getItem("username");

alert("loginsuccess"+user1);
    
    return false;
}
else
{
    alert("failed"+globalVariable.x);
}

}

