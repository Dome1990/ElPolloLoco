class Chicken extends MovableObject {

    IMAGES_WALKING = [
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/3.Ga_paso izquierdo.png'
    ]

    currentImage = 0;

    constructor() {
        super().loadImage('img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png');
        this.loadImages(this.IMAGES_WALKING);
        this.playAnimation(this.IMAGES_WALKING);
        this.speed = 0.15 + Math.random() * 0.35;
        this.x = 200 + Math.random() * 1080;
        this.heigth = 100;
        this.width = 100;
        this.y = 550;
    }
}