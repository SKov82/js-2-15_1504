class TextCorr {
    constructor(container='.buy-btn'){
        this.container = container;
        this.correct_text ='';
        this._init();
    }
    _init(){
      document.querySelector(this.container).addEventListener('click', event => {this._read();})
    }
    _read(){
      
      let file = document.getElementById('file').files[0]
      let reader = new FileReader();
      reader.readAsText(file)
      reader.onload = function () {
      
      let corr = reader.result.replace(/\n/g," <br>");
      document.getElementById('in').innerHTML = corr
      corr = corr.replace(/(?<=\s)'|'(?=\s)|'$/g, "\"")
      document.getElementById('out').innerHTML = corr      
      }; 
      console.log(reader.onload['rezult'])
      console.log(this) 
    }
}

export default ()=>{
  let itm = new TextCorr;
}
