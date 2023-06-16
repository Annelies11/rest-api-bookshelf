const bookshelf = require('./bookshelf')
const {nanoid} = require('nanoid')

const createBooksHandler = (request, h)=>{
    const {name, year, author, summary, publisher, pageCount, readPage,reading} = request.payload
    const {id} = nanoid(16)
    const isFinished = (readPage, pageCount) {
        if(readPage === pageCount){
            return true
        }
        if(readPage < pageCount){
            return false
        }
    }
}