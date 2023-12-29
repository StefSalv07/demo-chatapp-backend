const express = require('express');
const { chats } = require('./data/data');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const astroRoutes = require('./routes/astroRoutes')
const conversationRoutes = require('./routes/conversationRoutes')
const messageRoutes = require('./routes/messageRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const router = require('express').Router();
const multer = require('multer')

dotenv.config();
connectDB()
const app = express();

app.use(express.json())

app.get('/api/chat', (req, res) => {
    res.send(chats);
})

app.get('/api/chat/:id', (req, res) => { 
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat);
})


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './backend/uploads/')
    },
    filename: function (req, file, cb) {
       cb(null, file.originalname);
    },
  })
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
  }).single("userfile");
  
app.post('/uploadfile', upload, (req, res) => {
    console.log("inside upload");
    res.send("file uploaded")
})

console.log("before")
app.use('/users', userRoutes)
app.use('/astrologers', astroRoutes)
app.use('/conversations', conversationRoutes)
app.use('/messages', messageRoutes)
app.use(notFound)
app.use(errorHandler)

// router.post('/upload', uploadFilel);
// router.get('/getFiles', fileController.getFilesFromDrive);
// module.exports=router;

// app.post('/fileupload', (req, res) => {
    
// })

const PORT = process.env.PORT || 5000

app.listen(5000, console.log(`Server started on port ${PORT}`));
