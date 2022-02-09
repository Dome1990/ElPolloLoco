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
    [
        new CollectableObject(200, 200, 'bottle'),
        new CollectableObject(400, 50, 'bottle'),
        new CollectableObject(600, 200, 'bottle'),
        new CollectableObject(1000, 200, 'bottle'),
        new CollectableObject(1200, 50, 'bottle'),
        new CollectableObject(1400, 200, 'bottle'),
        new CollectableObject(2400, 200, 'bottle'),
        new CollectableObject(2600, 50, 'bottle'),
        new CollectableObject(2800, 200, 'bottle')
    ],
    [
        new CollectableObject(100, 100, 'coin'),
        new CollectableObject(500, 200, 'coin'),
        new CollectableObject(1000, 100, 'coin'),
        new CollectableObject(2000, 50, 'coin'),
        new CollectableObject(2500, 100, 'coin'),
        new CollectableObject(2600, 500, 'coin'),
        new CollectableObject(2800, 200, 'coin')
    ]
    // [
    //     new StatusBar(),
    // ]
);