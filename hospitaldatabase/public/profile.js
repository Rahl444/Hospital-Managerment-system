
function update() {

    var tdata = [];
    var username = document.getElementById("username").value;
    tdata.push("username");
    var name = document.getElementById('name').value;
    tdata.push(name);
    var email = document.getElementById('email').value;
    tdata.push(email);
    var gender = document.getElementById('gender').value;
    tdata.push(gender);
    var city = document.getElementById('city').value;
    tdata.push(city);
    var phone = document.getElementById('phone').value;
    tdata.push(phone);


    
    let options = {
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(tdata)
    }
    const promise = fetch('/up', options);
    promise.then(response => {
        if(!response.ok){
            console.error(response)
        } else {
            return response.json();
        }
    }).then(result => {
        console.log(result);
    })

}