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

        this.text_area_container = document.createElement("textarea");
        this.text_area_container.setAttribute("class", "form-control");
        this.text_area_container.setAttribute("class", "note");

        this.note_container.appendChild(this.text_area_container);
        document.querySelector("#notebook_container").appendChild(this.note_container);
    }
}

class Notebook {
    constructor() {
        this.notes = [];
        // 2 second interval, 2000 ms.
        this.interval = 2000;
        this.last_retrieved_notebook = null;
        setInterval(this.update_from_local_storage.bind(this), this.interval);
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
        const notebook_data = localStorage.getItem("myNotebook");
        const timestamp = this.format_timestamp(Date.now());
        document.querySelector("#reader_timestamp").textContent = READER_TIMESTAMP + timestamp;

        if (this.last_retrieved_notebook != notebook_data) {
            document.querySelector("#notebook_container").innerHTML = "";
            this.last_retrieved_notebook = notebook_data;
            const temp_notebook = JSON.parse(notebook_data).notebook;
            temp_notebook.notes.forEach(note_data => {
                const note = new Note();
                note.content = note_data.content;
                note.text_area_container.value = note.content;
                this.notes.push(note);
            });
        }
    }
}


const notebook = new Notebook();
notebook.update_from_local_storage();


