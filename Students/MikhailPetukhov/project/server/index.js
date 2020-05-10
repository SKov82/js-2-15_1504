let express = require('express');
let fs = require('fs');

let server = express();

server.use(express.json());

// Production
// server.use('/', express.static('server/public'));

// HTML

server.get('/catalog', (request, response) => {
	fs.readFile('./server/db/catalog.json', 'utf-8', (err, data) => {
		if (!err) {
			response.send(data);
		}
	})
});

server.get('/basket', (request, response) => {
	fs.readFile('./server/db/basket.json', 'utf-8', (err, data) => {
		if (!err) {
			response.send(data);
		}
	})
});

server.post('/catalog', (req, res) => {
    fs.readFile('./server/db/catalog.json', 'utf-8', (err, data) => {
        if(!err) {
            let dataCatalog = JSON.parse(data);

            let newItem = req.body;
            newItem.id = Date.now();
            dataCatalog.push(newItem);

            fs.writeFile('./server/db/catalog.json', JSON.stringify(dataCatalog, null, ' '), err => {
                if(!err) {
                    res.json({ id: newItem.id });
                } else {
                    console.log(err);
                }
            })
        }
    })
});

server.post('/basket/add', (req, res) => {
    fs.readFile('./server/db/basket.json', 'utf-8', (err, data) => {
        if(!err) {
            let dataBasket = JSON.parse(data);
            let search = req.body;
            let find = dataBasket.find (product => product.id == search.id);

            if (find) {
				find.quantity++;
            } else {
	            search.quantity = 1;
	            dataBasket.push(search);
            }         
            fs.writeFile('./server/db/basket.json', JSON.stringify(dataBasket, null, ' '), err => {
                if(err) {
                    console.log(err);
                }
            })
        }
    })
});

server.post('/basket/remove', (req, res) => {
    fs.readFile('./server/db/basket.json', 'utf-8', (err, data) => {
        if(!err) {
            let dataBasket = JSON.parse(data);
            let search = req.body;
            let find = dataBasket.find (product => product.id == search.id);
            
            if (find.quantity > 1) {
					find.quantity--;
                } else {
					dataBasket.splice (dataBasket.indexOf(find), 1);
                }            
            fs.writeFile('./server/db/basket.json', JSON.stringify(dataBasket, null, ' '), err => {
                if(err) {
                    console.log(err);
                }
            })
        }
    })
});

server.listen(3000, () => {
	console.log("Server runs at 3000...");
});
