class Note {
    constructor() {
        this.id = notebook.notes.length;
        this.content = "";
        this.init_note_ui();
    }
    init_note_ui() {
        this.note_container = document.createElement("div");
        this.note_container.setAttribute("class", "form_group note_container");
        this.note_container.setAttribute("id", "note_container" + this.id);

        // Bootstrap textarea.
        this.text_area_container = document.createElement("textarea");
        this.text_area_container.setAttribute("class", "form-control");
        this.text_area_container.setAttribute("class", "note");
       
        this.remove_btn_container = document.createElement("div");
        this.remove_btn_container.setAttribute("class", "remove_btn_container");

        this.remove_btn = document.createElement("div");
        this.remove_btn.setAttribute("id", "remove_btn" + this.id);
        this.remove_btn.textContent = REMOVE;

        this.remove_btn_container.appendChild(this.remove_btn);

        this.note_container.appendChild(this.text_area_container);
        this.note_container.appendChild(this.remove_btn_container);
        document.querySelector("#notebook_container").appendChild(this.note_container);

        document.querySelector("#remove_btn" + this.id).addEventListener('click', () => {
            notebook.remove_note(this.id);
        })
    }
}

class Notebook {
    constructor() {
        this.notes = [];
        // 2 second interval, 2000 ms.
        this.interval = 2000;
        // Sets function to execute repeatedly at an interval of time.
        //  Creates a new execution context for the function so
        //  it doesn't preserve "this" context for the current Notebook instance
        setInterval(this.save_to_local_storage.bind(this), this.interval);
        this.init_notebook_ui();
    }

    init_notebook_ui() {
        document.querySelector("#add_note_btn").textContent = ADD;
        document.querySelector("#add_note_btn").addEventListener('click', () => {
            this.add_note();
        })
    }

    add_note() {
        this.notes.push(new Note());
    }

    remove_note(id) {
        document.getElementById("note_container" + id).remove();
      
        // Find the index of the note to remove
        const index = this.notes.findIndex(note => note.id === id); 
      
        // Remove the note from the array if index is found
        if (index !== -1) { 
          this.notes.splice(index, 1); 
        }
        
        this.save_to_local_storage();
    }

    save_to_local_storage() {
        const timestamp = this.format_timestamp(Date.now());
        document.querySelector("#writer_timestamp").textContent = WRITER_TIMESTAMP + timestamp;

        this.notes.forEach(note => {
            note.content = note.text_area_container.value;
        });
        const myNotebook = { 
          notebook: this
        };
        // Convert the data to a JSON string
        const dataString = JSON.stringify(myNotebook);
        // Save the data to localStorage
        localStorage.setItem('myNotebook', dataString);
    }

    format_timestamp(timestamp) {
        const half_day = 12;
        const date = new Date(timestamp);
      
        const army_hour = date.getHours();
        let hours;

        if (army_hour % half_day == 0) {
            hours = String(army_hour).padStart(2, '0');
        } else {
            hours = String(army_hour % half_day).padStart(2, '0');
        }
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        let time_of_day;
        if (army_hour >= half_day) {
            time_of_day = "PM";
        } else {
            time_of_day = "AM";
        }
      
        return `${hours}:${minutes}:${seconds}${time_of_day}`;
    }
    
    update_from_local_storage() {
        const timestamp = this.format_timestamp(Date.now());
        document.querySelector("#writer_timestamp").textContent = WRITER_TIMESTAMP + timestamp;
        const temp_notebook = JSON.parse(notebookData).notebook;
        temp_notebook.notes.forEach(note_data => {
            const note = new Note();
            note.content = note_data.content;
            note.text_area_container.value = note.content;
            notebook.notes.push(note);
        });
    }
}

const notebookData = localStorage.getItem("myNotebook");
let notebook;

if (notebookData) { 
    notebook = new Notebook();
    notebook.update_from_local_storage();
} else {
    notebook = new Notebook();
}

