const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to the database')
    } catch (err) {
        console.log(err)
    }
}

connectToDb();

app.use('/blackpine/auth', require('./blackpine/routes/authRouter'))
app.use('/blackpine/businessInfo', require('./blackpine/routes/businessInfoRouter'))
app.use('/blackpine/services', require('./blackpine/routes/servicesRouter'))
app.use('/blackpine/massageStyles', require('./blackpine/routes/massageStylesRouter'))


app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === 'UnauthorizedError') {
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})