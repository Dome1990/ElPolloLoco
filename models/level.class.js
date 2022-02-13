class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = (1279*3);
    collectableBottles;
    collectableCoins;
    levelBgMusic;


constructor(enemies, clouds, backgroundObjects, collectableBottles, collectableCoins, levelBgMusic, endscreen){
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.collectableBottles = collectableBottles;
    this.collectableCoins = collectableCoins;
    this.levelBgMusic = levelBgMusic;
    this.endscreen = endscreen;
}
}