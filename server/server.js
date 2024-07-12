const express = require ('express');
const cors = require('cors');
const mongoose = require('mongoose');

// ROUTES
const projectRoutes = require('./routes/projects');

//CONNECT TO MONGODB
// GET CONNECTION STRNG DRIVER
mongoose.connect('') //ADD CONNECTION STRING FOR MONGODB

const app = express(); //Exactly as connect;
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/projects', projectRoutes);

// app.get('/', (req,res) => {
//     res.send('Robot Chef');
// })

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
