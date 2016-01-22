var imageWidth = 101;
var imageHeight = 83;
var canvasCol = 5;
var canvasRow = 5;

// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (50*dt);

    if(this.x >= imageWidth * (canvasCol - 1)){
        this.x = imageWidth * (canvasCol - 1);
    }
    if(this.x <= 0){
        this.x = 0;
    }
    if(this.y >= imageHeight * (canvasRow - 1)){
        this.y = imageHeight * (canvasRow - 1);
    }
    if(this.y <= 0){
        this.y = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.x = 5;//5 * 101 / 2;
    this.y = 5;//6 * 83 / 2;
    this.direction = {'x': 0, 'y': 0};
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(){
    this.x += this.direction.x;
    this.y += this.direction.y;

    if(this.x <= 0){
        this.x = 0;
        this.direction.x = 0;
    }
    if(this.x >= imageWidth * (canvasCol - 1)) {
        this.x = imageWidth * (canvasCol - 1);
        this.direction.x = 0;
    }
    if(this.y <= 0){
        this.y = 0;
        this.direction.y = 0;
    }
    if(this.y >= imageHeight * (canvasRow - 1)){
        this.y = imageHeight * (canvasRow - 1);
        this.direction.y = 0;
    }
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction){
    switch(direction){
        case 'left':
            this.direction.x = -1;
            this.direction.y = 0;
            break;
        case 'up':
            this.direction.x = 0;
            this.direction.y = -1;
            break;
        case 'right':
            this.direction.x = 1;
            this.direction.y = 0;
            break;
        case 'down':
            this.direction.x = 0;
            this.direction.y = 1;
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(1,2);
var allEnemies = [enemy1];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
