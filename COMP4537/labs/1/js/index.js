function init_index() {
    const title_text = document.createElement("p");
    const subtitle_text = document.createElement("p");

    title_text.textContent = WELCOME_MESSAGE;
    subtitle_text.textContent = AUTHOR_NAME;

    document.querySelector("#title_container").appendChild(title_text);
    document.querySelector("#subtitle_container").appendChild(subtitle_text);

    const to_writer = document.createElement("div");
    const to_reader = document.createElement("div");

    document.querySelector("#directory_btns_container").appendChild(to_writer);
    document.querySelector("#directory_btns_container").appendChild(to_reader);

    to_writer.setAttribute("id", "to_writer_btn");
    to_reader.setAttribute("id", "to_reader_btn");

    document.querySelector("#to_writer_btn").textContent = WRITER;
    document.querySelector("#to_reader_btn").textContent = READER;

    document.querySelector("#to_writer_btn").onclick = function() {
        location.href = './html/writer.html';
    };
    document.querySelector("#to_reader_btn").onclick = function() {
        location.href = './html/reader.html';
    };
}

init_index();