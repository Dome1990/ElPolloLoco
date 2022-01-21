const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss()
    ],

    [
        new Clouds(),
    ],

    [
        new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 739, -1279, 0),
        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', 700, -1279, 739 - 700), //height, x, y,
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', 700, -1279, 739 - 700),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', 700, -1279, 739 - 700),

        new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 739, 0, 0),         //sky
        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/1.png', 700, 0, 739 - 700),      //background mountains
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/1.png', 700, 0, 739 - 700),                  //background with cactus
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/1.png', 700, 0, 739 - 700),            //foreground layer

        new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 739, 1279, 0),
        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', 700, 1279, 739 - 700),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', 700, 1279, 739 - 700),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', 700, 1279, 739 - 700),

        new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 739, 1279 * 2, 0),
        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/1.png', 700, 1279 * 2, 739 - 700),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/1.png', 700, 1279 * 2, 739 - 700),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/1.png', 700, 1279 * 2, 739 - 700),

        new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 739, 1279 * 3, 0),
        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', 700, 1279 * 3, 739 - 700),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', 700, 1279 * 3, 739 - 700),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', 700, 1279 * 3, 739 - 700),
    ],
    // [
    //     new StatusBar(),
    // ]
);