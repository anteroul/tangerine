class Player {
    constructor() {
        this.score = 0;
        this.lives = 3;
        this.gameOver = false;
    }
}

class PlayerProfile {
    constructor(username, country) {
        this.user = username;
        this.country = country;
        this.hiscore = 0;
        this.player = new Player();
    }
}