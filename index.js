var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/static'));

const users = [{
    id: 1,
    name: 'Matteo',
    lists: [{
        id: 1,
        title: 'Weekend ToDo',
        tasks: ['Visit museum', 'Clean house']
    }]
}, {
    id: 2,
    name: 'Luca',
    lists: [{
        id: 2,
        title: 'Weekend ToDo',
        tasks: ['Visit museum', 'Help wife to ironing']
    }]
}];

var listsCount = 2;

function findById(collection, id) {
    var item = collection.filter(function (item) {
        return item.id == id;
    })[0];

    return item;
}

app.get('/user', function (req, res) {
    res.send(users);
});

app.get('/user/:userId', function (req, res) {
    var user = findById(users, req.params.userId);

    res.send(user);
});

app.get('/user/:userId/list', function (req, res) {
    var user = findById(users, req.params.userId);
    res.send(user.lists);
});

app.get('/user/:userId/list/:listId', function (req, res) {
    var user = findById(users, req.params.userId);
    var list = findById(user.lists, req.params.listId);

    res.send(list);
});

app.post('/user/:userId/list', function (req, res) {
    var user = findById(users, req.params.userId);

    if(!req.body.title)
        return res.status(400).end();

    var list = {
        id: ++listsCount,
        title: req.body.title,
        tasks: []
    };

    user.lists.push(list);

    res.status(201).send(list);
});

app.post('/user/:userId/list/:listId', function (req, res) {
    var user = findById(users, req.params.userId);
    var list = findById(user.lists, req.params.listId);

    if(req.body.text === 'fail') {
        // Fake slow operation
        setTimeout(function () {
            res.status(400).end();
        }, 3000);
    } else {
        list.tasks.push(req.body.text);
        res.status(201).end();
    }
});

app.delete('/user/:userId/list/:listId', function (req, res) {
    var user = findById(users, req.params.userId);
    var list = findById(user.lists, req.params.listId);

    var index = user.lists.indexOf(list);

    if(index > -1) {
        user.lists.splice(index, 1);
    }

    res.status(200).end();
});

app.delete('/user/:userId/list/:listId/:text', function (req, res) {
    var user = findById(users, req.params.userId);
    var list = findById(user.lists, req.params.listId);

    var index = list.tasks.indexOf(req.params.text);

    if(index === 1) {
        // Fake slow operation
        setTimeout(function () {
            res.status(400).end();
        }, 3000);

        return;
    } else if(index > -1) {
        list.tasks.splice(index, 1);
    }

    res.status(200).end();
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
