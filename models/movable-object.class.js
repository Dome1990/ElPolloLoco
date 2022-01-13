class MovableObject {
    x = 100;
    y = 360;
    heigth;
    width;
    img;
    imgCache = {};
    speed = 0.15;
    currentImage = 0;
    speedY = 0;
    acceleration = 2.5;

    applyGravity() {
        setInterval(() => {
            if (this.isAbove()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAbove() {
        return this.y < 360 || this.speedY > 0;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }
    /**
     * 
     * @param {*} IMAGES_WALKING animation for enemies
     */
    playAnimation(IMAGES_WALKING) {
        setInterval(() => {
            this.walkingAnimation();
        }, 100)
        setInterval(() => {
            if (this.x > -1280) {
                this.moveLeft();
            }
            else {
                this.x = 1280;
            }
        }, 1000 / 60);
    }


    checkCharactermovement(){    
    setInterval(() => {
        this.walking_sound.pause();
        /**
         * let character walk
         */
        if (this.world.keyboard.RIGHT) {
            if (!this.isAbove()) {
                this.walking_sound.play();
            }
            this.moveRight();
        }
        if (this.world.keyboard.LEFT) {
            if (this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
            }
            if (!this.isAbove()) {
                this.walking_sound.play();
            }
        }
        //character will jump with space and arrow up
        if ((this.world.keyboard.SPACE || this.world.keyboard.UP) && !this.isAbove()) {//&& this.y >=360
            this.jump();
        }
        this.world.camera_x = -this.x + 100;
    }, 1000 / 60)}

    animateMovement(){
        setInterval(() => {
            if (this.isAbove()) {
                this.jumpingAnimation();
            }
            else {
                if (this.world.keyboard.RIGHT) {
                    this.walkingAnimation();
                }
                if (this.world.keyboard.LEFT) {
                    this.walkingAnimation();
                }
            }
        }, 60);
    }

    moveRight() {
        if (this.x < this.world.level.level_end_x) {
            this.x += this.speed;
            this.otherDirection = false;
        }
    }
    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 40;
    }

    jumpingAnimation() {
        let i = this.currentImage % this.IMAGES_JUMPING.length;
        let path = this.IMAGES_JUMPING[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }

    walkingAnimation() {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = this.IMAGES_WALKING[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.heigth);
    }

    drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "blue";
        ctx.rect(this.x, this.y, this.width, this.heigth);
        ctx.stroke();
    }
    mirrorImage(ctx){
            ctx.save();
            ctx.translate(this.width, 0);
            ctx.scale(-1, 1);
            this.x = this.x * -1;
    }
    reMirrorImage(ctx){
    this.x = this.x * -1;
    ctx.restore();
}
}