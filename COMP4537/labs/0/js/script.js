// script.js
// Classes, functions, startup logic

// === Classes ===

class Form_Container {
    constructor(form_element, form_label, button_label) {
        this.form_element = form_element;
        document.querySelector("label[for='ask_button_count']").textContent = form_label;
        document.querySelector("#go_button").setAttribute("value", button_label);
    }
}

class Game {
    constructor(total_buttons) {
        const BASE_16 = 16;
        const MAX_COLOR = 0xffffff;
        this.window_width = window.innerWidth;
        this. window_height = window.innerHeight;
        this.buttons = [];
        // Clears the grid of previous game buttons
        document.querySelector("#buttons_grid").textContent = "";
        document.querySelector("#game_message").textContent = "";
        this.score = 0;
        for (let count = 0; count < total_buttons.value; ++count) {
            // Found this color generator on stack overflow
            this.buttons[count] = new Button(count + 1, Math.floor(Math.random()*MAX_COLOR).toString(BASE_16));
        }
    }

    sleep = (delay) => new Promise((resolve) => {
        setTimeout(resolve, delay)
    })

    start_game = async () => {
        // ms in a second
        const SECOND = 1000;
        // Seconds in an interval, 2 seconds
        const INTERVAL = 2;
        const texts = document.querySelectorAll(".button_text");
        await this.sleep(this.buttons.length * SECOND);
        for (let i = 0; i < this.buttons.length; i++) {
            if (i == this.buttons.length - 1) {
                texts.forEach((text) => {
                    text.textContent = "";
                })
                this.buttons.forEach((button) => {
                    button.btn.onclick = () => this.handle_button_click(button);
                });
            }
            this.shuffle_buttons();
            await this.sleep(INTERVAL * SECOND);
        }
    }

    shuffle_buttons() {
        const BUTTON_H_PX = 100;
        const BUTTON_W_PX = 200;
        for (let i = 0; i < this.buttons.length; i++) { 
            // For precise positioning
            this.buttons[i].btn.style.position = "absolute";
            this.buttons[i].btn.style.top = Math.floor(Math.random() * (this.window_height - (BUTTON_H_PX * 2)) + BUTTON_H_PX) + "px";
            this.buttons[i].btn.style.left = Math.floor(Math.random() * (this.window_width - BUTTON_W_PX)) + "px";
        }
    }

    handle_wrong_answer() {
        this.buttons.forEach((button) => {
            button.text.textContent = button.id;
            button.btn.onclick = null;
        })
    }

    handle_button_click(button) {
        ++this.score;
        if (this.score == button.id && this.score == this.buttons.length) {
            button.text.textContent = button.id;
            button.btn.onclick = null;
            document.querySelector("#game_message").textContent = "Excellent memory!";
        } else if (this.score == button.id && this.score < this.buttons.length) {
            button.text.textContent = button.id;
            button.btn.onclick = null;
        } else if (this.score != button.id) {
            this.handle_wrong_answer();
            document.querySelector("#game_message").textContent = "Wrong order!";
        }
    }
}

class Button {
    static height = 5;
    static width = 10;
    constructor(button_id, color) {
        this.id = button_id;
        this.color = "#" + color;
        this.btn = document.createElement("div");
        this.text = document.createElement("p");
        this.btn.setAttribute("class", "button_container");
        this.btn.setAttribute("id", button_id);
        this.text.setAttribute("class", "button_text");
        this.style_button();
    }
    
    style_button() {
        this.btn.onclick = null;
        this.text.textContent = this.id;
        this.btn.style.backgroundColor = this.color;
        this.btn.style.width = Button.width + "em";
        this.btn.style.height = Button.height + "em";
        this.btn.appendChild(this.text);
        document.querySelector("#buttons_grid").appendChild(this.btn);
    }
}

// === Startup ===

const buttons_form = new Form_Container(document.querySelector("#form"), ASK_BUTTON_COUNT, GO_BUTTON);

// Form submission
buttons_form.form_element.addEventListener("submit", (event) => {
    const MIN = 3;
    const MAX = 7;
    const input = document.getElementById("ask_button_count").value;
    if (input < MIN || input > MAX) {
        // Don't refresh
        event.preventDefault();
    } else {
        const game = new Game(document.getElementById("ask_button_count"));
        game.start_game();
        event.preventDefault();
    }
});

