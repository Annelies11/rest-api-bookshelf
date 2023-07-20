const {createBooksHandler, getAllBooksHandler} = require('./handler')

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
    },
    {
        method:'GET',
        path:'/books',
        handler: getAllBooksHandler
    }
]
module.exports = routes