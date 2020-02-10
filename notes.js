// console.log('starting notes.js...');

const fs = require('fs');

fileName = 'notes-data.json';

var fetchNotes = () => {
    //If note already exist we want to append new note to an existing one
    try{
        var notesString = fs.readFileSync(fileName);// String Version of note
        return JSON.parse(notesString);
    }
    catch(err){
        //console.log(err);
        return [];
    }
}

var saveNotes = (notes) => {
    // Updating/saving note to file
    fs.writeFile(fileName, JSON.stringify(notes), function(err){
        if(err){
            console.log('Unable to write to file');
        }
        else{
            console.log('Done!');
        }
    });
}
var addNewNote = (title, body) => {
    //console.log('Adding note', title, body);
    var notes = fetchNotes();;
    var note = {
        title,
        body
    };

    // Making title obj unique by checking if the titles are the same return true and the item would be kept in the array
    var duplicateNotes = notes.filter((note) => note.title === title);
    // if the length of duplicateNotes is > 0 that means we don't wanna save the note
    // because note already exist with that title
    if(duplicateNotes.length === 0){
        // Adding note to notes array
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var getAllNotes = () => {
    // console.log('Getting all Notes');
    return fetchNotes();
};

var getNote = (title) => {
    // console.log('Getting Note', title);
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title === title);   
    return filteredNotes[0];
}

var removeNote = (title) => {
    // console.log('Removing Note', title);
    //Fetch notes
    var notes = fetchNotes();
    //Filter notes, removing the one with title of argument;
    var removeSelectedNote = notes.filter((note) => note.title !== title);
    //Save new note
    saveNotes(removeSelectedNote);

    return notes.length !== removeSelectedNote.length;
}

var logNote = (note) => {
    debugger;
    console.log('-------------------------------------------------------');
    console.log(`Title: ${note.title}.`);
    console.log(`Body: ${note.body}`);
}

module.exports = {
    addNewNote,
    getAllNotes,
    getNote,
    removeNote,
    logNote
}