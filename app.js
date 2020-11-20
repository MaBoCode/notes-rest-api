const Joi = require('joi');

const express = require('express');
const app = express();

app.use(express.json());

const user1_notes = [
  { id: 1, title: 'note1', content: 'content'},
  { id: 2, title: 'note2', content: 'content'},
  { id: 3, title: 'note3', content: 'content'}
];

const user2_notes = [
  { id: 1, title: 'note4', content: 'content'},
  { id: 2, title: 'note5', content: 'content'},
  { id: 3, title: 'note6', content: 'content'}
];

const users = [
  { id: 1, notes: user1_notes},
  { id: 2, notes: user2_notes}
];

app.get('/api/users', (req, res) => {
  res.send(users);
});

app.get('/api/users/:id/notes', (req, res) => {
  console.log('Getting notes...');
  const user = users.find(c => c.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send('User not found.');
  }
  res.send(user.notes);
});

app.post('/api/users', (req, res) => {
  const user = {
    id: users.length + 1,
    notes: []
  };
  users.push(user);
  res.send(user);
});

app.post('/api/users/:id/notes', (req, res) => {
  const user = users.find(c => c.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send('User not found.');
  }

  const { error } = validateNote(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const note = {
    id: user.notes.length + 1,
    title: req.body.title,
    content: req.body.content
  };

  user.notes.push(note);
  res.send(note);
});

app.put('/api/users/:userId/notes/:noteId', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.userId));
  if (!user) {
    return res.status(404).send('User not found.');
  }

  const note = user.notes.find(n => n.id === parseInt(req.params.noteId));
  if (!note) {
    return res.status(404).send('Note not found.');
  }

  note.title = req.body.title;
  note.content = req.body.content;
  res.send(note);
});

app.delete('/api/users/:userId/notes/:noteId', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.userId));
  if (!user) {
    return res.status(404).send('User not found.');
  }

  const note = user.notes.find(n => n.id === parseInt(req.params.noteId));
  if (!note) {
    return res.status(404).send('Note not found.');
  }

  const index = user.notes.indexOf(note);
  user.notes.splice(index, 1);
  res.send(note);
})

function validateNote(note) {
  const noteSchema = Joi.object({
    title: Joi.string().min(8).required(),
    content: Joi.string().required()
  });
  return noteSchema.validate(note);
}

const port = process.env.PORT || 3000;
app.listen(port, '192.168.5.18', () => {
  console.log(`Listening on port ${port}...`);
});