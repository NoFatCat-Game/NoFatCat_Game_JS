class clsCat {

    constructor(pCtx) {
        this.ctx = pCtx
        this.direction = "right";

        this.sprite = new clsSprite(this.ctx, "cat", "img/cat/cat01_", 10, ".png", 0, 0, (this.ctx.canvas.height / 400), 30);

        //X,Y iniciales
        this.sprite.flw.pt.x = (this.ctx.canvas.width / 2);
        this.sprite.flw.pt.y = (this.ctx.canvas.height);

        //Ignorar rotacion imagen
        this.sprite.flw.ignoreGraphicRotation = 1;

        //Friccion //Velocidad Maxima
        this.sprite.flw.friction = -((this.ctx.canvas.width / 400) / 50);
        this.sprite.flw._velomax = (this.ctx.canvas.width / 400);

        //Suelo
        this.sprite.flw.floorY = 500;

        //Gravedad
        this.sprite.flw.gravity = this.ctx.canvas.height * (2.5 / 722);
        //
    }
    ///////////////////////////////////////////////////////////////
    moveRight() {
        this.sprite.stFrame = 0; //frame inicial dreta
        this.sprite.endFrame = 3; //frame final dreta

        this.sprite.flw._velomax = (this.ctx.canvas.width / 400); //canviem la velocitat màxima perquè al saltar se la canviem

        this.direction = "right";
    }

    moveLeft() {
        //si s'estava mirant cap a la dreta al moment d'anar cap a l'esquerra
        if (this.direction == "right") {
            this.sprite.current_frame = 4; //fem el frame actual sigui aquest
        }

        this.sprite.flw._velomax = (this.ctx.canvas.width / 400);

        this.sprite.stFrame = 4;
        this.sprite.endFrame = 7;

        this.direction = "left";
    }

    moveUp() {
        this.sprite.state = 0;

        //canviar la direcció del sprite al saltar en funció d'on estigui mirant
        if (this.direction == "right") {
            this.sprite.current_frame = 8;

            this.sprite.stFrame = 8;
            this.sprite.endFrame = 8;

        } else if (this.direction == "left") {
            this.sprite.current_frame = 9;

            this.sprite.stFrame = 9;
            this.sprite.endFrame = 9;
        }
    }
    ///////////////////////////////////////////////////////////////
    Draw() {

        this.sprite.Draw();

        if (this.sprite.flw._velocity > 0) {
            this.sprite.state = 1;

        } else { //fer que quan pari de moure's i estigui al terra, el frame sigui el de quedar-se quiet
            if (this.direction == "right" && this.sprite.flw.pt.y == this.sprite.flw.floorY) {
                this.sprite.current_frame = 0;
            } else if (this.direction == "left" && this.sprite.flw.pt.y == this.sprite.flw.floorY) {
                this.sprite.current_frame = 4;
            }
            this.sprite.state = 0;
        }
    }

}