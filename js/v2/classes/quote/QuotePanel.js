class QuotePanel {
    #type;
    #room;
    #details;

    constructor(type, details, room) {
        this.#type = type;
        this.#details = details;
        this.#room = room;
    }
    
    getType() {
        return this.#type;
    }

    getRoom() {
        return this.#room;
    }
    
    getDetails() {
        return this.#details;
    }
}