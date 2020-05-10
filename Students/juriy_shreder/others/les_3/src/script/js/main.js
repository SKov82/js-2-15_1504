'use strict'

let obj= {
     a:1,
     b:'string',
     c:[11,22,true],
     d:{
       aa:11,
       bb:false,
       cc:'stringman'
     }
}

// console.log(JSON.stringify(obj))



export default ()=>{
  console.log(JSON.stringify(obj))
  console.log(obj)
}