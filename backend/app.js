import express from 'express'
import env from 'dotenv'
import passport from 'passport'
import session from 'express-session'
import cors from 'cors'

import mongoSanitize from 'express-mongo-sanitize'
import {executeRouter} from './Routers/executeRouter.js'
import { problemRouter } from './Routers/problemsRouter.js'
import {initilize} from './utils/passportConfig.js'
import { authRouter } from './Routers/authRouter.js'
import connect from "./DataBase/MongoDb.js"
import {rateLimit} from 'express-rate-limit'
// import MongoStore from 'connect-mongo'


const app = express()
env.config()
initilize()

const limiter = rateLimit({
    windowMs:10 * 60* 1000,
    limit:100,
    standardHeaders:'draft-7',
    legacyHeaders:false,
    message:'no of requests execcede limit'

})


app.use(express.json())

// const store = MongoStore.create({
//     mongoUrl:process.env.MONGO_URI,
//     ttl:14 * 24 * 60 * 60,
//     stringify:false
    
// })
app.use(session({
    secret:"hello guys",
    saveUninitialized:false,
    resave:false,
    cookie:{
        expiresIn:'1d'
    },
    // store:store
}));
app.use(mongoSanitize({}))

app.get('/',(req,res)=>{
    res.end('hello after login in')

})

app.use(passport.initialize())
app.use(passport.session())
//connect to db
connect();
app.use(cors())
app.use(limiter)

app.use('/auth',authRouter);
app.use('/execute',executeRouter);
app.use('/problems',problemRouter);


const port = process.env.PORT|| 9090; 
app.listen(port,()=>console.log(`http://localhost:${port}/`))