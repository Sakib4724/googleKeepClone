const addButton = document.querySelector("#add");

const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];   //creating empty array to store notes

    console.log(textAreaData);

    textAreaData.forEach((note) => {
        return notes.push(note.value);
    })
    console.log(notes);
    
    //to store notes data to the local storage
    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNewNote = (text = '') => {

    const note = document.createElement('div'); //for creating new div using javascript
    note.classList.add('note');   

    const htmlData = `
        <div class="operation">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>

        <div class="main ${text ? "" : "hidden"} "> </div>
        <textarea class="${text ? "hidden" : ""}"></textarea>  
    `;

    //to add this html data to above newly created div
    note.insertAdjacentHTML('afterbegin', htmlData)   //1st argument is position(where the data is to be stored, 2nd is data which is to be stored)
    //console.log(note);


    //getting the References
    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    //deleting the note
    delButton.addEventListener('click', () => {
        note.remove();
        updateLSData(); //to update the local storage data after performing deletion
    })

    textArea.value = text;
    mainDiv.innerHTML = text;

    //toggle using edit button 
    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    textArea.addEventListener('change', (event) => {    //Event object is a parent object of all events.
        const value = event.target.value;
        //then we have we have to add this value to the main div
        mainDiv.innerHTML = value;

        updateLSData(); //update local storage data
    })

    document.body.appendChild(note);  //this method appends a node as the last child of a node

}

//getting data back from local storage
const notes = JSON.parse(localStorage.getItem('notes'));

if(notes) {
    notes.forEach((note) => addNewNote(note) ) 
}

addButton.addEventListener('click', () => addNewNote() );