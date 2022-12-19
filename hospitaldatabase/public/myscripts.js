//import { createRequire } from '../node_modules/module';
//const require = createRequire(import.meta.url);

window.addEventListener('load', ()=>{

  
  let options = {
    method: 'POST',
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(tableData)
}
const promise = fetch('/docpharm', options);
promise.then(response => {
    if(!response.ok){
        console.error(response)
    } else {
        return response.json();
    }
}).then(result => {
    console.log(result);
})
  
})
  