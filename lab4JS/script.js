document.addEventListener("DOMContentLoaded", () => {
    const addNoteBtn = document.getElementById("addNoteBtn");
    const noteList = document.getElementById("noteList");
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    function renderNotes() {
        noteList.innerHTML = "";
        notes.forEach((note, index) => {
            const noteElement = document.createElement("div");
            noteElement.classList.add("note");
            if (note.pinned) {
                noteElement.classList.add("pinned");
            }
            noteElement.innerHTML = `
                <div class="title">${note.title}</div><br>
                <div class="content">${note.content}</div>
                <div class="date">Data utworzenia: ${note.date}</div><br>
                <button class="delNoteBtn" onclick="deleteNote(${index})">Usuń</button>
            `;
            noteList.appendChild(noteElement);
        });
    }

    window.deleteNote = function(index) {
        notes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        renderNotes();
    }

    addNoteBtn.addEventListener("click", () => {
        const title = prompt("Wprowadź tytuł notatki:");
        const content = prompt("Wprowadź treść notatki:");
        const pinned = confirm("Czy chcesz przypiąć notatkę na początek listy?");
        const date = new Date().toLocaleString();

        if (title && content) {
            const newNote = {
                title,
                content,
                pinned,
                date,
            };
            if (pinned) {
                notes.unshift(newNote);
            } else {
                notes.push(newNote);
            }
            localStorage.setItem("notes", JSON.stringify(notes));
            renderNotes();
        }
    });

    renderNotes();
});
