class Dictionary {
    constructor() {
        this.dictionary = new Map();
    }
    add_entry(word, definition) {
        if (word && !this.dictionary.has(word.toLowerCase())) {
            this.dictionary.set(word.toLowerCase(), definition);
            return word;
        }
        else return null;
    }
    get_definition(word) {
        if (!word || !this.dictionary.has(word.toLowerCase())) {
            return null;
        }
        return this.dictionary.get(word.toLowerCase());
    }
}
module.exports = Dictionary;