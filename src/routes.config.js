const NoteRouter = require('./note/note.routes');
const UserRouter = require('./user/user.routes');

exports.routesConfig = (app) => {
    NoteRouter.routesConfig(app);
    UserRouter.routesConfig(app);
}