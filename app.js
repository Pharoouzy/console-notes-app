// console.log("Starting app.js...");

const fs = require('fs');//Loading the File system module
const os = require('os');//Loading the operating system module
const _ = require('lodash');//_ is the common name for Lodash Utility Library
const yargs = require('yargs');

const notes = require('./notes.js');//Loading own files
var titleOptions = {
    describe: 'Title of the note',
    demand: true,//To make the argument required
    alias: 't'//Let you provide a shortcut
}

var bodyOptions = {
    describe: 'Body of the note',
    demand: true,
    alias: 'b'
}
const argv = yargs
    .command('add', 'Add a new Note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all Notes')
    .command('read', 'Read a Note', {
        title: titleOptions
    })
    .command('remove', 'Remove a Note', {
        title: titleOptions
    })
    .help()
    .argv;
var command = process.argv[2];//For yargs use argv._[0]

if(command === 'add'){
    // console.log('Adding new note...');
    var note = notes.addNewNote(argv.title, argv.body);
    // console.log(note);
    if(note){
        console.log(`Note '${argv.title}' created successfully!`);
        notes.logNote(note);
    }
    else{
        console.log(`Duplicate entry! Note with title '${argv.title}' already exist!`);
    }
}
else if(command === 'list'){
    // console.log('Listing all notes...');
    var allNotes = notes.getAllNotes();
    var noteText = (allNotes.length > 1) ? 'notes' : 'note';
    console.log(`Printing ${allNotes.length} ${noteText}`);
    if(allNotes.length === 0){
        console.log('Note is empty!');
    }
    else{
        allNotes.forEach((note) => notes.logNote(note));
        console.log('Done!');
    }
}
else if(command === 'read'){
    // console.log('Reading note...');
    var note = notes.getNote(argv.title);
    if(note){
        console.log(`Reading Note '${argv.title}'...`);
        notes.logNote(note);
    }
    else{
        console.log(`Note does not exist!`);
    }
}
else if(command === 'remove'){
    // console.log('Removing note...');
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? `Note '${argv.title}' deleted successfully!` : `Note '${argv.title}' not found!`;
    console.log(message);
}
else{
    console.log('\'' + process.argv[2] + '\' is not recognized');
}