const functions = require("firebase-functions");
const app = require('express')()
const auth = require('./utils/auth')

const {
 getAllTodos,
 postOneTodo,
 deleteTodo,
 editTodo,
} = require('./apis/todos')

const {
 loginUser,
 signUpUser,
 uploadProfilePhoto
} = require('./apis/users')

app.get('/', getAllTodos)
app.get('/todos', getAllTodos)
app.post('/todo', postOneTodo)
app.delete('/todo/:todoId', deleteTodo)
app.put('/todo/:todoId', editTodo)

app.post('/login', loginUser)
app.post('/signup', signUpUser)
app.post('/user/image', auth, uploadProfilePhoto)

exports.api = functions.https.onRequest(app)