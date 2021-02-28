'use strict'

require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const superagent = require('superagent');

app.set('view engine', 'ejs');

app.use(express.urlencoded());
// to use style 
app.use(express.static('./public'))


app.get('/', (req, res) => {
    res.render('pages/searches/new');
});

app.post('/searches/show', (req, res) => {
    let searchData = req.body.searchBox;
    let authorOrTitle = Object.keys(req.body);
    console.log((req.body));
    let url = `https://www.googleapis.com/books/v1/volumes?q=${searchData}+in${authorOrTitle[1]}`
    superagent.get(url)
        .then((results) => {
            
            // map to apply function on each element in array
            let bookData = results.body.items.map(book => {
                return new Book(book)

            })
            
            res.render('pages/searches/show', { data: bookData });
        })
        .catch(() => {
            errorHandler('Cannot Catch your Data from API', req, res)

        })
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

function Book(data) {
    this.title = data.volumeInfo.title;
    this.image = data.volumeInfo.imageLinks.thumbnail || `https://i.imgur.com/J5LVHEL.jpg`;
    this.author = data.volumeInfo.authors || `There is no Authors`;
    this.discription = data.volumeInfo.description || `There is no discription`

}

function errorHandler(error, req, res) {
    res.render('pages/error', { err: error });

};