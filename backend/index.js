const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const quoteRoutes = require('./routes/quotes');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/quotes', quoteRoutes);

mongoose.connect('mongodb+srv://vidyotmadhankhar888:jaWHOn3zlrcgCi3e@cluster0.uiox3xv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('MongoDB connected'))
.catch((err)=>console.log("Error in connecting mongoDB",err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));