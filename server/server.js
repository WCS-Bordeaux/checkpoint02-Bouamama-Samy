// From JS Project Creator v0.3.2

require('colors');
let express = require('express');
let bodyParser = require('body-parser');
let app = express();

var usersDb = require('../mocks/users.json').users; // Arrays
var notesDb = require('../mocks/notes.json').notes;

for (let i = 0, l = usersDb.length; i < l; i++) { // Not best practice
   usersDb[i].notes = createUserNotes(usersDb[i]._id);;
}

app.use(function (req, res, next) {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
   next();
});
app.use(bodyParser.json());

app.use(express.static('../public'));

// ~~~~~~~~~~~~~ ROUTING ~~~~~~~~~~~~~~~

app.get('/users', function (req, res) {
   res.send({ users: usersDb }); // Send object instead of array
});

app.get('/users/:id', function (req, res) {
   let id = req.params.id;
   if (isIdValid(id))
      res.send(getUserById(id));
   else
      res.send("User " + id + " not found");
});

app.post('/users', function (req, res) {
   let newUser = req.body;
   if (isUserValid(newUser)) {
      if (!newUser.notes) newUser.notes = [];
      usersDb.push(newUser);
      res.send("User created");
   } else {
      res.send("User sent not valid");
   }
});

app.put('/users', function (req, res) {
   let newUser = req.body;
   if (isUserValid(newUser)) {
      if (!newUser.notes) newUser.notes = [];
      usersDb.push(newUser);
      res.send("User created");
   } else {
      res.send("User sent not valid");
   }
});

app.delete('/users/:id', function (req, res) {
   let id = req.params.id;
   if (typeof id === "string" && id != "")
      deleteUserById(id);
   else
      res.send("User " + id + " not found");
});

app.get('/notes/:userId', function(req, res) {
   let id = req.params.userId;
   if (isIdValid(id)) { 
      res.send(getUserById(id).notes);
   } else {
      res.send("Notes not found for user " + id);
   }
})

app.post('/notes', function (req, res) {
   let note = req.body;
   if (isNoteValid(note)) {
      notesDb.push(note);
      addUserNote(note);
      res.send("Note added");
   } else {
      res.send("Note not valid");
   }
})

app.put('/notes', function (req, res) {
   let note = req.body;
   if (isNoteValid(note) && note.old) {
      editNote(note);
      res.send("Note added");
   } else {
      res.send("Note not valid");
   }
})

app.delete('/notes', function (req, res) {
   let note = req.body;
   if (isNoteValid(note)) {
      deleteNote(note);
      res.send("Note added");
   } else {
      res.send("Note not valid");
   }
})

// ~~~~~~~~~~~~ ROUTING END ~~~~~~~~~~~~~~~~~~~~

let server = app.listen(9000, '127.0.0.1', function () {
   let serverInfo = server.address();
   console.log(('\n\tServer started on http://' + serverInfo.address + ':' + serverInfo.port));
   console.log('Ready to Roll !'.america);
});

// ~~~~~~~~~~~~~~ UTILS ~~~~~~~~~~~~~~~~
// TODO: functions find, findIndex etc with security about Index value

function createUserNotes(id) {
   let notes = [];
   for (let i = 0, l = notesDb.length; i < l; i++) {
      if (notesDb[i].userId === id) {
         notes.push(notesDb[i].content);
      }
   } return notes;
}

function isIdValid(id) {
   if (id && typeof id === "string" && id != "" && getUserById(id)) {
      return true;
   } return false;
}

// users
function isUserValid(user) {
   if (user && typeof user == "object" && user._id && user.name && user.company && user.email && user.phone) {
      return true;
   } return false;
}

function getUserById(id) {
   return usersDb.find(u => u._id === id)
}

function deleteUserById(id) {
   let i = usersDb.findIndex(u => u._id === id);
   usersDb.splice(i, 1);
}

function editUser(newUser) {
   let i = usersDb.findIndex(u => u._id === newUser._id);
   usersDb[i] = newUser;
}

// notes
function isNoteValid(note) {
   if (note && typeof note == "object" && note.content && note.userId) {
      return true;
   } return false;
}

function editNote(note) {
   let i = notesDb.findIndex(n => n.content === note.old);
   notesDb[i].content = note.content;
   // Would require a rebuild of the usersDb architecture to get the updated note in some routes like /users (thats why it was bad practice)
}

function addUserNote(note) {
   let i = usersDb.findIndex(u => u._id === id);
   usersDb[i].notes.push(note);
}


// --------- Save files on Node exit ---------

// process.stdin.resume(); //so the program will not close instantly

// function exitHandler(options, err) {
//    fs.writeFileSync('../mocks/users.json', usersDb);
//    fs.writeFileSync('../mocks/notes.json', notesDb);
//    if (options.exit) process.exit();
// }

// //do something when app is closing
// process.on('exit', exitHandler.bind(null, {}));

// //catches ctrl+c event
// process.on('SIGINT', exitHandler.bind(null, { exit: true }));

// //catches uncaught exceptions
// process.on('uncaughtException', exitHandler.bind(null, { exit: true }));