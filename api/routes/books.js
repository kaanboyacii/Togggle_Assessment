import express from "express";
import { addBook, deleteBook, getAllBook, getBook, updateBook } from "../controllers/book.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.get("/",getAllBook)
router.get("/:id",getBook)
router.post("/",verifyToken,addBook)
router.put("/:id",verifyToken,updateBook)
router.delete("/:id",verifyToken,deleteBook)


export default router;