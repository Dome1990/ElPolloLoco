let canvas;
let world;
let keyboard = new Keyboard;

function startGame() {
    gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = addElPolloLoco();
    // `
    // <div class="gameStart">
    // <canvas id="canvas">

    // </canvas>
    // <div id="buttons">
    // <button onclick="fullscreen()">Fullscreen</button>
    // </div>
    // </div>
    // `;
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    world.canvas.height = 739;
    world.canvas.width = 1280;
}

function addElPolloLoco(){
    return     `
    <div class="gameStart">
    <canvas id="canvas">

    </canvas>
    <div id="buttons">
    <button onclick="fullscreen()">Fullscreen</button>
    </div>
    </div>
    `;
}

function gameOver(){
    console.log('gameoverfunction')
    buttons = document.getElementById('buttons');
    buttons.innerHTML = `
    <button onclick="startGame">Restart</button>
    `;
}


window.addEventListener('keydown', (e) => {
    if (e.key == 'd' || e.key == 'D' || e.key == 'ArrowRight') {
        keyboard.RIGHT = true;
    }
    else if (e.key == 's' || e.key == 'S' || e.key == 'ArrowDown') {
        keyboard.DOWN = true;
    }
    else if (e.key == 'a' || e.key == 'A' || e.key == 'ArrowLeft') {
        keyboard.LEFT = true;
    }
    else if (e.key == 'w' || e.key == 'W' || e.key == 'ArrowUp') {
        keyboard.UP = true;
    }
    else if (e.key == ' ') {
        keyboard.SPACE = true;
    }
    else if (e.key == 'Enter') {
        keyboard.ENTER = true;
    }
});
window.addEventListener('keyup', (e) => {
    if (e.key == 'd' || e.key == 'D' || e.key == 'ArrowRight') {
        keyboard.RIGHT = false;
    }
    else if (e.key == 's' || e.key == 'S' || e.key == 'ArrowDown') {
        keyboard.DOWN = false;
    }
    else if (e.key == 'a' || e.key == 'A' || e.key == 'ArrowLeft') {
        keyboard.LEFT = false;
    }
    else if (e.key == 'w' || e.key == 'W' || e.key == 'ArrowUp') {
        keyboard.UP = false;
    }
    else if (e.key == ' ') {
        keyboard.SPACE = false;
    }
    else if (e.key == 'Enter') {
        keyboard.ENTER = false;
    }
});

function fullscreen() {
    canvas.requestFullscreen();
}