const { db } = require('../utils/admin')

exports.getAllTodos = (req, res) => {
  db.collection('todos')
    .where('username', '==', req.user.username)
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
      let todos = []
      data.forEach(doc => {
        todos.push({
          todoId: doc.id,
          title: doc.data().title,
          body: doc.data().body,
          createdAt: doc.data().createdAt,
          username: doc.data().username
        })
      })
      return res.json(todos)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
}

exports.postOneTodo = (req, res) => {
  if (req.body.body.trim() === '') {
    return res.status(400).json({ body: 'Must not be empty' })
  }
  if (req.body.title.trim() === '') {
    return res.status(400).json({ title: 'Must not be empty' })
  }
  const newTodoItem = {
    title: req.body.title,
    body: req.body.body,
    createdAt: new Date().toISOString(),
    username: req.user.username
  }

  db.collection('todos')
    .add(newTodoItem)
    .then(doc => {
      const responseTodoItem = newTodoItem
      responseTodoItem.id = doc.id
      return res.json(responseTodoItem)
    })
    .catch(err => {
      res.status(500).json({ error: 'Something went wrong' })
      console.error(err)
    })
}

exports.deleteTodo = (req, res) => {
  const document = db.doc(`/todos/${req.params.todoId}`)
  document.get()
    .then(doc => {
      if (!doc.exists) {
        return response.status(404).json({ error: '404 not found' })
      }
      if (doc.data().username !== req.user.username) {
        return res.status(403).json({ error: "Unauthorized" })
      }
      return document.delete()
    })
    .then(() => {
      res.json({ message: 'Deleted!' })
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
}

exports.editTodo = (req, res) => {
  if (req.body.todoId || req.body.createdAt) {
    res.status(403).json({ message: 'Not allowed to edit' })
  }
  let document = db.collection('todos').doc(`${req.params.todoId}`)
  document.update(req.body)
    .then(() => {
      res.json({ message: 'Updated successfully' })
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
}