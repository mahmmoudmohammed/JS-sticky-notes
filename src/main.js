// Constant
const notes_container =document.getElementById("app");
const add_note_button =notes_container.querySelector(".add-note");

// Events 
add_note_button.addEventListener("click",()=>addNote());

// Draw all notes on the ground
getNotes().forEach(note => {
    const note_element = createNoteElement(note.id,note.content);
    notes_container.insertBefore(note_element,add_note_button);
});

// Retrive all notes from local storage
function getNotes() {
    return JSON.parse(localStorage.getItem("sticky-notes")||"[]");
}

// Save All notes on local storage
function saveNotes(notes){
    localStorage.setItem("sticky-notes",JSON.stringify(notes))
}

// Draw new note on the ground 
function createNoteElement (id, content) {
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.value = content;
    element.placeholder = "Add your notes here...";
    
    element.addEventListener("change",()=>{
        updateNote(id,element.value);
    }); 
    
    element.addEventListener("dblclick", () => {
        const on_delete = confirm("Are you sure you want to delete the note?");
        if (on_delete) {
            deleteNote(id,element);
        }
    });
    return element;
}

//  Push new note object to the array and save it on the local storage 
function addNote () {
    const notes = getNotes ();
    const note_object = {
        id: Math.floor (Math.random () * 1000000),
        content:""
    };
    const note_element = createNoteElement(note_object.id, note_object.content);
    notes_container.insertBefore(note_element, add_note_button);
    notes.push(note_object);
    saveNotes(notes);
}

// update specific note and save on the local storage
function updateNote (id, newContent) {
    const notes = getNotes();
    const target_note = notes.filter (note => note.id ==id)[0];
    
    target_note.content =newContent;
    saveNotes(notes);
}

// Delete || Discard specific note object and save the rest notes on the local storage
function deleteNote(id,element){
    const notes = getNotes().filter(note => note.id != id);
    saveNotes(notes);
    notes_container.removeChild(element);
}