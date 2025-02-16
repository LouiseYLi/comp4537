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
            this.display_query(BAD_REQUEST);
            return;
        }

        const operation = query.split(" ")[0];
        if (operation === "SELECT") {
            this.get();
        } else if (operation === "INSERT") {
            this.post();
            
        } else {
            this.display_query(INVALID_QUERY);
            return;
        }

    }
    get() {
        console.log("get");
        const xhr = new XMLHttpRequest();
        const query = document.querySelector("#query").value;
        // xhr.open("GET", "http://localhost:8080/sql/sql?sql=" + query, true);
        xhr.open("GET", "https://seal-app-wgbcq.ondigitalocean.app/sql/sql?sql=" + query, true);

        xhr.onload = () => {
            if (xhr.status === 200) {
                const response = xhr.responseText;
                this.display_query(response);
            } else {
                this.display_query("Error: " + xhr.status + xhr.statusText);
            }
        };

        xhr.send();
    }
    post() {
        console.log("post");
        const xhr = new XMLHttpRequest();
        const query = document.querySelector("#query").value;
        // xhr.open("POST", "http://localhost:8080/sql/", true);
        xhr.open("POST", "https://seal-app-wgbcq.ondigitalocean.app/sql", true);
        xhr.onload = () => {
            if (xhr.status === 200) {
                const response = xhr.responseText;
                this.display_query(response);
            } else {
                this.display_query("Error: " + xhr.status + xhr.statusText);
            }
        };

        xhr.send(query);
    }
    post_rows(e) {
        e.preventDefault();
        const xhr = new XMLHttpRequest();
        
        const data = [
            ['Sara Brown', '1901-01-01'],
            ['John Smith', '1941-01-01'],
            ['Jack Ma', '1961-01-30'],
            ['Elon Musk', '1999-01-01']
        ];

        xhr.open("POST", "https://seal-app-wgbcq.ondigitalocean.app/sql", true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = () => {
            if (xhr.status === 200) {
              const response = JSON.parse(xhr.responseText);
              document.querySelector("#post_response").value = response.message;
            } else {
              document.querySelector("#post_response").value = 'Error: ' + xhr.status + ' - ' + xhr.statusText;
            }
        };
        console.log(data);
        xhr.send(JSON.stringify(data));
        console.log("post");
    }
    display_query(msg) {
        document.querySelector("#query_response").textContent = msg;
    }

}

const client = new Client();
