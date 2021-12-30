class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];

    ctx;
    canvas;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width,
            this.character.heigth);

            this.enemies.forEach(enemy => {
                this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.heigth)                
            });

        // for (let i = 0; i < this.enemies.length; i++) {
        //     this.ctx.drawImage(this.enemies[i].img, this.enemies[i].x, this.enemies[i].y,
        //         this.enemies[i].width, this.enemies[i].heigth)
        // }

        self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }
}