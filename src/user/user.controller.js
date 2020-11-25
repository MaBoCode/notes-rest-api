
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

exports.data = users;

exports.list = (req, res) => {
    console.log('Get users...');
    res.send(users);
}

exports.add = (req, res) => {
    console.log('Adding user...');
    const user = {
        id: users.length + 1,
        notes: []
    };
    users.push(user);
    res.send(user);
}