// import bootstrap from 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css'

// import './layout/styles/style.css';

// import app from './script/js/main.js';

// app();

// function async(){
//   let a;
//   setTimeout(()=>{
//     a=200
//     console.log('setTimeout 1 ', a)
//     setTimeout(()=>{
//       console.log('setTimeout 2 ', a)
//     },0)
//   },0)
//   console.log('steck 0 ', a)
// }

// async()
// let a;
// function asd(data){
//     console.log('asd - ', data)
// };

// function dsa(aza){
//   setTimeout(() =>{
//     a=100500
//     aza(a)
//   },5000)
// }
// dsa(asd);

// function promiseFinc(par){
//   return new Promise((resolve, reject)=>{
//     if (par){
//     resolve('Promise good')}
//     else{
//     reject('Promise bad')}
//   }
//   )
// };


// promiseFinc()
//        .then(data=>{ 
//         console.log(data) 
//         return 1
//       })
//       .then((prev)=>{ 
//         console.log(++prev)
//         return prev
//       })
//       .then((prev)=>{ 
//         console.log(++prev)
//         return prev
//       })
//       .then((prev)=>{ 
//         console.log(++prev)
//         return prev
//       })
//       .catch(par=>{ 
//         console.log(par)})
//       .finally(()=>{
//         console.log('Promise end')
//       })

let url ='https://raw.githubusercontent.com/jushreder/static/master/catalogData.json'

function getData(url){
  return new Promise((res,rej)=>{
    setTimeout(()=>{
    let req = new XMLHttpRequest();
    req.open('GET', url, true); 
    req.onreadystatechange = function () {
      if (req.readyState == 4) {        
        if(req.status == 200){
            res(JSON.parse(req.responseText))}
        else {
          rej("Error loading");}
      }
    };
    req.send();
  },0)
  })
}

function handleData(url) {
         getData(url)
        .then(data =>{
          return data
        })
        .catch(err =>{
          return err
        })
}

