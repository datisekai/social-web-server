import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 5151;

app.get('/',(req, res) => {
    res.send("Server zalo web by datisekai is running!!!!!!!!")
})

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`)
})