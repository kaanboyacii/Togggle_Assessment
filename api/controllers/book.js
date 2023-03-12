import { createError } from "../error.js";
import Book from "../models/Book.js";

export const getBook = async (req, res, next) => {
    try {
        const Book = await Book.findById(req.params.id);
        res.status(200).json(Book);
    } catch (err) {
        next(err)
    }
};

export const getAllBook = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
};

export const addBook = async (req, res, next) => {
    const newBook = new Book({ userId: req.user.id, ...req.body });
    try {
        const savedBook = await newBook.save();
        res.status(200).json(savedBook)
    } catch (err) {
        next(err)
    }
};


export const updateBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id)
        if (!book) return next(createError(404, "Book not found !"));
        if (req.user.id === book.userId) {
            const updatedBook = await Book.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                {
                    new: true
                },
            );
            res.status(200).json(updatedBook)
        } else {
            return next(createError(403, "You can update only your book!"));
        }
    } catch (err) {
        next(err)
    }
};

export const deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id)
        if (!book) return next(createError(404, "Book not found !"));
        if (req.user.id === book.userId) {
            const updatedBook = await Book.findByIdAndDelete(
                req.params.id,
                {
                    $set: req.body,
                },
                {
                    new: true
                },
            );
            res.status(200).json("Book has been deleted.")
        } else {
            return next(createError(403, "You can delete only your book!"));
        }
    } catch (error) {

    }
};
