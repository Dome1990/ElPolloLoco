class StatusBar extends DrawableObject {
    
    IMAGES = [
        'img/7.Marcadores/Barra/Marcador vida/azul/0_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/20_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/40_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/60_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/80_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/100_.png'
    ]
    
    percantage = 100;

    constructor(){
        super().loadImages(this.IMAGES);
        this.setPercentage(this.percantage);
    }

    setPercentage(percantage){
        let path = this.IMAGES[this.resolveImageIndex(percantage)];
        this.img = this.imgCache[path];
        console.log('image path is ' + this.img);
    }
    
    resolveImageIndex(percantage){
        if(percantage == 100){
            return 5;
        }
        else if (percantage < 100){
            return 4;
        } 
        else if(percantage <= 80){
            return 3;
        }
        else if(percantage <= 60){
            return 2;
        }
        else if(percantage <= 40){
            return 1;
        }
        else if(percantage <= 20){
            return 0;
        }
    }
}