const mongoose = require('mongoose');
const express = require('express');
const config = require('config');
const { auth } = require('./middleware/auth')
const path = require('path')
const app = express();



//we should call this before routing to prevent the CORS error 
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
        res.header("Access-Control-Allow-Headers", 
                   "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });


//bodyparser Middleware
app.use(express.json());

//DB config
 const db = config.get('mongoURI');

//connection mongo db
mongoose.connect(db,
{
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
});

mongoose
.connection
.then(() => console.log('DB connnected...'))
.catch(err => console.log('connection',error));

//Use Routes: if hit this end point (/api/question) we are going right to the question file required in up in this file
// app.use('/api/question', require('./routes/api/question'));
app.use('/public', express.static(path.join(__dirname,'uploads')));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/category',require('./routes/api/category'));
app.use('/api/product',require('./routes/api/product'));
app.use('/api/cart',require('./routes/api/cart'));
app.use('/api/initialdata',require('./routes/api/initialdata'))

console.log()
// app.get("/checkout",auth,(req,res)=> res.render('checkout'))
// app.use(auth)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on the port ${port}` )) 