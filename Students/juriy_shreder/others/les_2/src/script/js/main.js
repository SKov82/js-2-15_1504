class App{
     constructor(form){
       this.form = null;
       this.items = null;
       this._init(form);
     }
     _init(form){
      this.form = document.querySelector(form);
       document.querySelector(form).addEventListener('click', () => {
           this.callcPrice()});
     }
     callcPrice(){
       this.items = new Price(this.form, 'Size', 'Filling', 'Seasoning')
     }        
}

class Price {
    constructor(form, size, filling, seasoning){
      this.form = form;
      
      this.size_data = this._get_data(size);
      this.filling_data = this._get_data(filling);
      this.seasoning_data = this._priceSeasoning(seasoning);
      this._init();
    }
    _get_data(selector){
      return this.form.querySelector(`input[name=${selector}]:checked`).dataset
    }
    _priceSeasoning(selector){
      return [...this.form.querySelectorAll(`input[name=${selector}]:checked`)]
    }
    _init(){
      let seasoning_price = 0
      let seasoning_calories = 0
      this.seasoning_data.forEach(item =>{seasoning_price += +item.dataset.price})
      this.seasoning_data.forEach(item =>{seasoning_calories += +item.dataset.calories})
      let price = +this.size_data.price + +this.filling_data.price + seasoning_price
      let calories = +this.size_data.calories + +this.filling_data.calories + seasoning_calories
      document.querySelector('div.price').innerHTML= ` цена: ${price}, калорий: ${calories}`
    }
}
// 
export default ()=>{
  
  let app = new App('#app-form')

}