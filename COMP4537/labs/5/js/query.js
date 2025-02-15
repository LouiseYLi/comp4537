class Client {
    constructor() {
        this.init_page();
    }
    init_page() {
        document.querySelector("#page_title h1").textContent = TITLE;
        document.querySelector("#query_label").textContent = QUERY_LABEL;
        document.querySelector("#query_response_label").textContent = RESPONSE_LABEL;

        document.querySelector("#post_label").textContent = POST;
        document.querySelector("#post").value = POST_BTN;
    }

}

const client = new Client();
client.init_page();
