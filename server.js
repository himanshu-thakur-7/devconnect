const express=require('express')
const connectDB=require('./config/db')
const app=express()
const UserRoute=require('./routes/api/users')
const AuthRoute=require('./routes/api/auth')
const ProfileRoute=require('./routes/api/profile')
const PostRoute=require('./routes/api/posts')

// connect database
connectDB();

// Init middleware
app.use(express.json({extended: false}))

app.get('/',(req,res)=>{res.send('API running')})

// define routes
app.use('/api/users',UserRoute)
app.use('/api/auth',AuthRoute)
app.use('/api/profile',ProfileRoute)
app.use('/api/posts',PostRoute)

const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{console.log(`Server started on Port ${PORT}`)})