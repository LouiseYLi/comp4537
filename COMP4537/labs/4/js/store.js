class StorePage {
    constructor() {
        this.init_page();
    }
    
    init_page() {
        const title = document.querySelector("#title_store");
        const page_title = document.querySelector("#page_title h1");
        const word_label = document.querySelector('#word_label');
        const definition_label = document.querySelector('#definition_label');
        const submit_btn = document.querySelector('input[type="submit"]');
    
        title.textContent = TITLE_STOREPAGE;
        page_title.textContent = TITLE_STOREPAGE;
        word_label.textContent = WORD_LABEL;
        definition_label.textContent = DEFINITION_LABEL;
        submit_btn.value = ADD_LABEL;

        submit_btn.addEventListener('click', this.add_word.bind(this));
    }

    add_word() {
        this.reset_page();
        const word = document.querySelector("#word").value;
        const definition = document.querySelector("#store_definition").value;
        
        if (!this.validate_string(word) || !this.validate_string(definition) || word.includes(" ")) {
            if (!this.validate_string(word) || word.includes(" ")) {
                this.display_err("#error_message_word", ERR_INVALID_WORD);
            }

            if (!this.validate_string(definition)) {
                this.display_err("#error_message_definition", ERR_INVALID_DEFINITION);
            }
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://134.122.45.247:8080/api/dictionary");
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(`?word=${word}&definition=${definition}`);
        xhr.onreadystatechange = () => {
            // if request was fully sent or error occurred
            if (xhr.readyState == 4) {
                if (xhr.status === 200) { 
                    const response = JSON.parse(xhr.responseText); 
                    if (response.entry) {
                        this.display_send_status(`Request ${response.requests}: ${SUCCESS_ADD}... "${response.word}: ${response.definition}"`);
                    } else {
                        this.display_err("#error_message_word", `Request ${response.requests} ${ERR_WORD_EXISTS}`);
                    }
                } else if (xhr.status >= 500) { 
                    this.display_send_status(`Server Error`); 
                } else if (xhr.status >= 400) { 
                    this.display_send_status(`Client Error`); 
                } else if (xhr.status >= 300) { 
                    this.display_send_status(`Redirection`); 
                } 
                return;
            }
        };
    }

    reset_page() {
        event.preventDefault();
        document.querySelector("#submit_status").textContent = "";
        document.querySelector("#error_message_word").textContent = "";
        document.querySelector("#error_message_definition").textContent = "";
    }

    validate_string(str) {
        if (str.length == 0) {
            return false;
        }

        for (let i = 0; i < str.length; i++) {
            if(!((/[a-zA-z' \n]/).test(str[i]))) {
                return false;
            }
        }
        return true;
    }

    display_err(id, msg) {
        document.querySelector(id).textContent = msg;
    }

    display_send_status(msg) {
        document.querySelector("#submit_status").textContent = msg;
    }
    
}

const page = new StorePage();


