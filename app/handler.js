const bookshelf = require('./bookshelf')
// import { nanoid } from './node_modules'
const { nanoid } = require('nanoid')

const createBooksHandler = (request, h) => {
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload
    const id = nanoid(16)
    const isFinished = (readPage, pageCount) => {
        if(readPage === pageCount){
            return true
        }
        if(readPage < pageCount){
            return false
        }
    }
    
    const finished = isFinished(readPage, pageCount)

    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt

    //cek value item
    if(!name||name===''){
        const res = h.response({
            status:'fail',
            message:'Gagal menambah buku. Mohon isi nama buku'
        })
        res.code(400)
        return res
    }
    if(readPage>pageCount){
        const res = h.response({
            status:'fail',
            message:'Gagal menambahkan buku, readPage tidak boleh lebih dari pageCount'
        })
        res.code(400)
        return res
    }
    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt
    }
    bookshelf.push(newBook)

    const isSuccess = bookshelf.filter(book=>book.id === id).length > 0

    if(isSuccess){
        const res = h.response({
            status:'success',
            data:{
                bookId:id
            }
        })
        res.code(201)
        return res
    }
    const res = h.response({
        status:'error',
        message:'Buku gagal ditambahkan'

    })
    res.code(500)
    return res
    
}
    //lihat data
    const getAllBooksHandler = (response, h) => ({
        status: 'success',
        data: {
            books: bookshelf.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher
            }))
        }
    })
module.exports = {createBooksHandler, getAllBooksHandler}