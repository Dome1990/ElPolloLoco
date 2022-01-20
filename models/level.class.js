class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = (1279*3);

constructor(enemies, clouds, backgroundObjects, statusBar){
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
}
}