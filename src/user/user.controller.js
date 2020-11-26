
const user1_notes = [];

const users = [
    { id: 1, notes: user1_notes},
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