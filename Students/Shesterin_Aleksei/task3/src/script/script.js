// class GoodsItem {
//   constructor(title, price) {
//     this.title = title;
//     this.price = price;
//   }
//   render() {
//     return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
//   }
// }
//
// class GoodsList {
//   constructor() {
//     this.goods = [];
//   }
//   fetchGoods() {
//     this.goods = [
//       { title: 'Shirt', price: 150 },
//       { title: 'Socks', price: 50 },
//       { title: 'Jacket', price: 350 },
//       { title: 'Shoes', price: 250 },
//     ];
//   }
//   render() {
//     let listHtml = '';
//     this.goods.forEach(good => {
//       const goodItem = new GoodsItem(good.title, good.price);
//       listHtml += goodItem.render();
//     });
//     document.querySelector('.goods-list').innerHTML = listHtml;
//   }
// }
//
// const list = new GoodsList();
// list.fetchGoods();
// list.render();


// let url = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';

//function makeGETRequest(url, callback) {
// let xhr = new XMLHttpRequest();
//
// xhr.open('GET', url, true);
//
// xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4) {
//         callback(xhr.responseText);
//     }
// }
//
//
// xhr.send();
//}

// makeGETRequest(url, (goods) => {
//     console.log(JSON.parse(goods));
// })
//
// function promiseFun(par) {
//     return new Promise((res, rej) => {
//         res('Promise good')
//         // rej('promise bad')
//     });
//
// }
//
// promiseFun(100)
//     .then(data => {
//         console.log(data)
//     })
//     .catch(data => {
//         console.log(data)
//     })
//     .finally(() => {
//         console.log('Promise complete')
//     })
//

let addr = 'https://raw.githubusercontent.com/xenophorus/static/master/goods.json';
//let addr = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';
let addr2 = 'https://githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';

function getData(rUrl) {
    return new Promise((res, rej) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', rUrl, true);
        xhr.onreadystatechange = function () {

            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    res(JSON.parse(xhr.responseText));
                } else {
                    rej('Error')
                }
            }
        }
        xhr.send();
    })
}

function exec(url) {
    getData(url)
        .then(data => {
            console.log(data)
        })
        .catch((err) => {
            console.log(err)
        })
}

exec(addr)
