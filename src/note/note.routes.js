const NoteController = require('./note.controller');

exports.routesConfig = (app) => {
    app.get('/api/users/:id/notes', [
        NoteController.list
    ]);

    app.get('/api/users/:userId/notes/:noteId', [
       NoteController.get
    ]);

    app.post('/api/users/:id/notes', [
        NoteController.add
    ]);

    app.put('/api/users/:userId/notes/:noteId', [
        NoteController.update
    ]);

    app.delete('/api/users/:userId/notes/:noteId', [
        NoteController.delete
    ]);
};