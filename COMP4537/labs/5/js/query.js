class Client {
    constructor() {
        this.init_page();
    }
    init_page() {
        document.querySelector("#page_title h1").textContent = TITLE;
        document.querySelector("#query_label").textContent = QUERY_LABEL;
        document.querySelector("#query_response_label").textContent = RESPONSE_LABEL;

        document.querySelector("#post_label").textContent = POST;
        document.querySelector("#post_btn").value = POST_BTN;

        this.setup_buttons();
    }
    setup_buttons() {
        document.querySelector("#query_btn").addEventListener("click", (e) => {
            this.query(e);
        })
        document.querySelector("#post_btn").addEventListener("click", (e) => {
            this.post(e);
        })
    }
    query(e) {
        e.preventDefault();
        document.querySelector("#query_response").textContent = "";

        console.log(document.querySelector("#query").value);
        const query = document.querySelector("#query").value;
        if (query.length <= 0) {
            this.display_invalid_query();
            return;
        }

        const operation = query.split(" ")[0];
        if (operation === "SELECT") {
            this.get();
        } else if (operation === "INSERT") {
            let xhr = new XMLHttpRequest();
            xhr.open("POST");  
            
        } else {
            this.display_query(INVALID_QUERY);
            return;
        }

    }
    get() {
        console.log("get");
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/sql/?sql=" + query, true);

        xhr.onload() = () => {
            if (xhr.status === 200) {
                const response = xhr.responseText;
                this.display_query(response);
            } else {
                this.display_query("Error: " + xhr.status + xhr.statusText);
            }
        };

        xhr.send();
    }
    post(e) {
        e.preventDefault();
        document.querySelector("#post_response").textContent = "";

        console.log("post");
    }
    display_query(msg) {
        document.querySelector("#query_response").textContent = msg;
    }

}

const client = new Client();
