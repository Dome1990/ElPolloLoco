class Chicken extends MovableObject {

    constructor() {
        super().loadImage('img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png');
        this.x = 100 + Math.random() * 1180;
        this.heigth = 100;
        this.width = 100;
        this.y = 550;
    }
}