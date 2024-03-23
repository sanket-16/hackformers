const express = require('express');
const userRoutes = require('./src/routes/userRoutes')
const orgRoutes = require('./src/routes/orgRoutes')
const eventRoutes = require('./src/routes/eventRoutes')
const cors = require('cors')
const passport = require('passport');
require('./src/passport')


const app = express();
app.use(express.json())
app.use(cors());
app.use(passport.initialize())




const port = 8080||process.env.PORT;
app.get('/',(req,res)=>{


    res.send('<h1>I am Inevitable!!</h1>');
})

app.use(userRoutes);
app.use('/org',orgRoutes);
app.use('/event',eventRoutes);



app.listen(port,()=>{
    console.log('[server]: http://localhost:8080')
})