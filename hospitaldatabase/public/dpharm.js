function addit() {

    var myTab = document.getElementById('meds');
    var x = document.getElementById("meds").rows.length;
        var tableData = [];
        tableData.push(x-1);
    // LOOP THROUGH EACH ROW OF THE TABLE AFTER HEADER.
    for (i = 1; i < myTab.rows.length; i++) {

        // GET THE CELLS COLLECTION OF THE CURRENT ROW.
        var objCells = myTab.rows.item(i).cells;

        // LOOP THROUGH EACH CELL OF THE CURENT ROW TO READ CELL VALUES.
        for (var j = 0; j < objCells.length-1; j++) {
            tableData.push(objCells.item(j).innerHTML);
            }

    }

	let data = {
        categoryChoice: "cd"+x
    }
    let options = {
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(tableData)
    }
    const promise = fetch('/addit', options);
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