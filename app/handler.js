const bookshelf = require('./books')
// import { nanoid } from './node_modules'
const { nanoid } = require('nanoid')

const addBooksHandler = (request, h) => {
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload
    const id = nanoid(16)
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt
    const isFinished = (pageCount, readPage) => {
        if(pageCount === readPage){
            return true
        }
        else{
            return false
        }
    }
    const finished = isFinished(pageCount, readPage)


    //cek value item
    if(!name||name===''||name === null){
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

    const isSuccess = bookshelf.filter((book)=>book.id === id).length > 0

    if(isSuccess){
        const res = h.response({
            status:'success',
            message:'Buku berhasil ditambahkan hehehe',
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
    const getAllBooksHandler = (request, h) => {
        const { name, reading, finished} = request.query
        if (name) {
            const lowCaseName = name.toLowerCase()
            const response = h.response({
                status: 'success',
                data: {
                    books: bookshelf
                    .filter((n) => n.name === lowCaseName)                
                    .map((books) => ({
                        id: books.id,
                        name: books.name,
                        publisher: books.publisher
                    }))
                }
            })
            response.code(200)
            return response
        }
        if (reading === '1'){
            const response = h.response({
                status: 'success',
                data:{
                    books: bookshelf
                    .filter((r) => r.reading === true)
                    .map((books) => ({
                        id: books.id,
                        name: books.name,
                        publisher: books.publisher
                    }))
                }
            })
            response.code(200)
            return response
        }
        if (reading === '0') {
            const response = h.response({
                status: 'success',
                data: {
                    books: bookshelf
                    .filter((r) => r.reading === false)
                    .map((book) => ({
                        id: books.id,
                        name: books.name,
                        publisher: books.publisher
                    }))
                }
            })
            response.code(200)
            return response
        }
        if(finished === '1') {
            const response = h.response({
                status: 'success',
                data:{
                    book: bookshelf
                    .filter((r) => r.finished === true)
                    .map((books) => ({
                        id: books.id,
                        name: books.name,
                        publisher: books.publisher
                    }))
                }
            })
            response.code(200)
            return response
        }
        if(finished === '0') {
            const response = h.response({
                status: 'success',
                data:{
                    book: bookshelf
                    .filter((r) => r.finished === false)
                    .map((books) => ({
                        id: books.id,
                        name: books.name,
                        publisher: books.publisher
                    }))
                }
            })
            response.code(200)
            return response
        }
        const response = h.response({
            status: 'success',
            data:{
                book: bookshelf.map((b) => ({
                    id: b.id,
                    name: b.name,
                    publisher: b.publisher
                }))
            }
        })
        response.code(200)
        return response
    }
    const getByIdBooksHandler = (request, h) => {
        const {bookId} = request.params
        const book = bookshelf.filter((book) => book.id === bookId)[0]
        if (book !== undefined){
            return {
                status: 'success',
                data: {
                    book
                }
            }
        }
        const response = h.response({
            status: 'fail',
            message: 'Buku tidak ditemukan'
        })
        response.code(404)
        return response
    }

    const editBooksHandler = (request, h) => {
        const {bookId} = request.params
        const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,        
        reading
        } = request.payload
        if (!name) {
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama buku'
            })
            response.code(400)
            return response
        }
        if (readPage > pageCount) {
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
            })
            response.code(400)
            return response
        }
        const updatedAt = new Date().toISOString()
        const index = bookshelf.findIndex((book) => book.id === bookId)
        if(index !== -1) {
            bookshelf[index] = {
                ...bookshelf[index],
                name,
                year,
                author,
                summary,
                publisher,
                pageCount,
                readPage,                
                reading,
                updatedAt
            }
            const res = h.response({
                status:'success',
                message:'Buku berhasil diperbarui'
            })
            res.code(200)
            return res
        }
        const res = h.response({
            status:'fail',
            message:'Gagal mempebarui buku. Id tidak ditemukan'
        })
        res.code(404)
        return res
    }

    const deleteBooksHandler = (request, h) => {
        const {bookId} = request.params
        const index = bookshelf.findIndex((book) => book.id === bookId)
        if(index !== -1){
            bookshelf.splice(index,1)
            const res = h.response({
                status:'success',
                message:'Buku berhasil dihapus'
            })
            res.code(200)
            return res
        }
        const res = h.response({
            status:'fail',
            message:'Buku gagal dihapus. Id tidak ditemukan.'
        })
        res.code(404)
        return res
    }
    
module.exports = {addBooksHandler, getAllBooksHandler, getByIdBooksHandler, editBooksHandler, deleteBooksHandler}