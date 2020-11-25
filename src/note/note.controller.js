const Joi = require('joi');
const users = require('../user/user.controller').data;

function validateNote(note) {
    const noteSchema = Joi.object({
        title: Joi.string().min(8).required(),
        content: Joi.string().required()
    });
    return noteSchema.validate(note);
}

function getUserFromId(id) {
    return users.find(u => u.id === parseInt(id));
}

function getNoteFromId(user, id) {
    return user.notes.find(n => n.id === parseInt(id));
}

exports.list = (req, res) => {
    console.log('Getting notes...');
    const user = getUserFromId(req.params.id);
    if (!user) {
        return res.status(404).send('User not found.');
    }
    res.send(user.notes);
}

exports.get = (req, res) => {
    console.log('Get note...');
    const user = getUserFromId(req.params.userId);
    if (!user) {
        return res.status(404).send('User not found.');
    }

    const note = getNoteFromId(user, req.params.noteId);

    if (!note) {
        return res.status(404).send('Note not found.');
    }
    res.send(note);
}

exports.add = (req, res) => {
    console.log('Adding note...');
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
}

exports.update = (req, res) => {
    console.log('Updating note...');
    const user = getUserFromId(req.params.userId);
    if (!user) {
        return res.status(404).send('User not found.');
    }

    const note = getNoteFromId(user, req.params.noteId);
    if (!note) {
        return res.status(404).send('Note not found.');
    }

    note.title = req.body.title;
    note.content = req.body.content;
    res.send(note);
}

exports.delete = (req, res) => {
    console.log('Deleting note...');
    const user = getUserFromId(req.params.userId);
    if (!user) {
        return res.status(404).send('User not found.');
    }

    const note = getNoteFromId(user, req.params.noteId);
    if (!note) {
        return res.status(404).send('Note not found.');
    }

    const index = user.notes.indexOf(note);
    user.notes.splice(index, 1);
    res.send(note);
}