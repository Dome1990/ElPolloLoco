let canvas;
let world;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);
    world.canvas.height = 739;
    world.canvas.width = 1280;
    // console.log('new character is ', world.character);
}