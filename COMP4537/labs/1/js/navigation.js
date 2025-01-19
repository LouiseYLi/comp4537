function init_back_btn() {
    document.querySelector("#back_btn").textContent = BACK;
    document.querySelector("#back_btn_container").onclick = function() {
        location.href = '../index.html';
    };
}

init_back_btn();