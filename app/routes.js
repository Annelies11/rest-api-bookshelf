const {createBooksHandler} = require('./handler')

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: () => {
            return 'Ini adalah halaman home hrrr'
        }
    },
    {
        method: '*',
        path: '/',
        handler: () => {
            return 'Halaman ini tidak dapat diakses dengan method ini'
        }
    },
    {
        method:'POST',
        path: '/books',
        handler: createBooksHandler
    }
]
module.exports = routes