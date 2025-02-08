class QuotePanel {
    #type;
    #room;

    constructor(type, room) {
        this.#type = type;
        this.#room = room;
    }
    
    getType() {
        return this.#type;
    }

    getRoom() {
        return this.#room;
    }
    
}