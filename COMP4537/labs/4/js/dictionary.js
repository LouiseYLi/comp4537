class Dictionary {
    constructor() {
        this.dictionary = new Map();
    }
    add_entry(word, definition) {
        console.log(word.toLowerCase());
        if (!this.dictionary.has(word.toLowerCase())) {
            this.dictionary.set(word.toLowerCase(), definition);
            return word;
        }
        else return null;
    }
    get_definition(word) {
        if (!this.dictionary.has(word.toLowerCase())) return null;
        return this.dictionary.get(word.toLowerCase());
    }
}
module.exports = Dictionary;