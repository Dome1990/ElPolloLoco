let canvas;
let world;
let keyboard = new Keyboard;

function init() {
    // canvas = document.getElementById('canvas');
    // world = new World(canvas, keyboard);
    // world.canvas.height = 739;
    // world.canvas.width = 1280;
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

function fullscreen(){
    canvas.requestFullscreen();
}