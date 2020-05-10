let express = require('express'); //import ... from (es5)
let fs = require('fs');
let writer = require('./utils/writer.js');
let catalog = require('./services/catalog.js');
let basket = require('./services/basket.js');
let logger = require('./utils/logger.js');

let server = express();

server.use(express.json());

// Для отправки конкретной ХТМЛ (логин/пароль в public) 
// Для продакшн версии (после сборки)
// server.use('/', express.static('server/public'));

server.get('/catalog', (req, res) => {
    fs.readFile('./server/db/catalog.json', 'utf-8', (err, data) => {
        if(!err) {
            res.send(data);
        }
    });
});

server.get('/basket', (req, res) => {
    fs.readFile('./server/db/basket.json', 'utf-8', (err, data) => {
        if(!err) {
            res.send(data);
        }
    });
});

server.post('/catalog', (req, res) => {
    fs.readFile('./server/db/catalog.json', 'utf-8', (err, data) => {
        if(!err) { 
            let { newCatalog, id } = catalog.add(req.body, JSON.parse(data));
            writer('./server/db/catalog.json', JSON.stringify(newCatalog, null, ' '))
                .then(report => {
                    if(report) {
                        res.json({ id: id });
                    }
                });
        }
    })
})

server.post('/basket', (req, res) => {
    // тупо добавление нового товара
    fs.readFile('./server/db/basket.json', 'utf-8', (err, data) => {
        if(!err) { 
            let { newBasket, itemName, actionName } = basket.add(req.body, JSON.parse(data));
            writer('./server/db/basket.json', JSON.stringify(newBasket, null, ' '))
                .then(report => {
                    if(report) {
                        logger(actionName, itemName);
                        res.json({ status: 1 });
                    }
                });
        }
    });
});

server.delete('/basket/:id', (req, res) => {
    //тупо выпиливание товара из корзины
    fs.readFile('./server/db/basket.json', 'utf-8', (err, data) => {
        if(!err) { 
            let { newBasket, itemName, actionName } = basket.delete(req.params.id, JSON.parse(data));
            writer('./server/db/basket.json', JSON.stringify(newBasket, null, ' '))
                .then(report => {
                    if(report) {
                        logger(actionName, itemName);
                        res.json({ status: 1 });
                    }
                });
        }
    });
});

server.put('/basket/:id', (req, res) => {
    //тупо изменение кол-ва
    fs.readFile('./server/db/basket.json', 'utf-8', (err, data) => {
        if(!err) { 
            let { newBasket, itemName, actionName } = basket.change(req.params.id, JSON.parse(data), req.body.amount);
            writer('./server/db/basket.json', JSON.stringify(newBasket, null, ' '))
                .then(report => {
                    if(report) {
                        logger(actionName, itemName);
                        res.json({ status: 1 });
                    }
                });
        }
    });
});

server.listen(3000, () => {
    console.log('Server runs at 3000...');
});