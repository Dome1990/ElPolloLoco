class CollectableObject extends DrawableObject {

    coin_sound = new Audio('audio/coin.mp3');
    collectBottle_sound = new Audio('audio/collectBottle.mp3');
 

    IMAGE_BOTTLE = [
        'img/6.botella/1.Marcador.png'
    ]

    IMAGE_COIN = [
        'img/8.Coin/Moneda1.png'
    ]

    constructor(x, y, type) {
        super().loadImage(this.checkType(type));
        this.x = x;
        this.y = y;
        this.heigth = 150;
        this.width = 150;
    }

    checkType(type) {
        if (type == 'bottle') {
            return this.IMAGE_BOTTLE;
        }
        else{
            return this.IMAGE_COIN;
        }
    }

}