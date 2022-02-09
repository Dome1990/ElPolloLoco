class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = (1279*3);
    collectableBottles;
    collectableCoins;


constructor(enemies, clouds, backgroundObjects, collectableBottles, collectableCoins){
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.collectableBottles = collectableBottles;
    this.collectableCoins = collectableCoins;
}
}