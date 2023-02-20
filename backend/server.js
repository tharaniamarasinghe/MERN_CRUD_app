const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workout');

dotenv.config();
const app = express();

//middleware
app.use(express.json()); //to use requests

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})    

//routes
app.use('/api/workouts', workoutRoutes);

//to resolve deprecation warning 
mongoose.set('strictQuery', true);

//connect to db 
mongoose.connect(process.env.MONGO_URL)
.then( () => {
    //listen for requests
    app.listen(process.env.PORT, () => {
    console.log('DB connected & listerning on port', process.env.PORT);
});
})
.catch( (err) => {
    console.log('DB connection error', err);
});


