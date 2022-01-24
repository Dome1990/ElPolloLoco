class StatusBar extends DrawableObject {

    HEALTH = [
        'img/7.Marcadores/Barra/Marcador vida/azul/0_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/20_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/40_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/60_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/80_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/100_.png'
    ];

    COINS = [
        'img/7.Marcadores/Barra/Marcador moneda/azul/0_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/20_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/40_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/60_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/80_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/100_.png'
    ];

    BOTTLES = [
        'img/7.Marcadores/Barra/Marcador_botella/Azul/0_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/20_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/40_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/60_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/80_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/100_.png',
    ];

    percantage = 100;

    constructor(x, barType) {
        super();
        // this.checkBarType(barType);
        this.loadImages(this.checkBarType(barType));
        this.setPercentage(100, barType);
        this.x = x;
        this.y = 0;
        this.width = 200;
        this.heigth = 60;
    }

    checkBarType(x) {
        if (x == 'health') {
            return this.HEALTH;
        }
        else if (x == 'coins') {
            return this.COINS;
        }
        else if (x == 'bottles') {
            return this.BOTTLES;
        }
    }

    setPercentage(percantage, barType) {
        let path = this.checkBarType(barType)[this.resolveImageIndex(percantage)];
        this.img = this.imgCache[path];
    }

    resolveImageIndex(percantage) {

        if (percantage == 100) {
            return 5;
        }
        else if (percantage < 100 && percantage > 80) {
            return 4;
        }
        else if (percantage <= 80 && percantage > 60) {
            return 3;
        }
        else if (percantage <= 60 && percantage > 40) {
            return 2;
        }
        else if (percantage <= 40 && percantage > 20) {
            return 1;
        }
        else if (percantage <= 20) {
            return 0;
        }
    }
}