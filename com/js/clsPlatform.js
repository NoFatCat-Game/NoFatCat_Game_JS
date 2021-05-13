var tempPlatY = 0;

class clsPlatform {
    constructor(pCtx, pId, pX, pY) {
        this.id = pId;
        this.ctx = pCtx;

        this.X = pX;
        this.Y = pY;

        this.sprite = new clsSprite(this.ctx, this.id, "img/platforms/platform01_", 1, '.png', 0, 0, (this.ctx.canvas.height / 600), 30);

        //fricció
        this.sprite.flw.friction = 0;

        //Ignorar rotacion imagen
        this.sprite.flw.ignoreGraphicRotation = 1;

        this.resizePlatform();
    }

    resizePlatform() {
        this.height = this.ctx.canvas.height;

        //agafar només el num de la ID
        this.numID = parseInt(this.id.slice(11));

        //si no s'especifica "x,y" la seva posició serà random
        if (this.X == null || this.X == undefined) {
            this.sprite.flw.pt.x = 800 * Math.random();
        } else {
            this.sprite.flw.pt.x = this.X;
        }

        // quan no especifiquem y
        if (this.Y == null || this.Y == undefined) {

            if (this.id == "Plataforma_0") { //la primera plataforma que es genera  
                this.sprite.flw.pt.y = Math.round((this.height * 0.6834) + ((this.height * 0.0667) * Math.random())); //tingui un rang d'aparició  /* 410 */ /* 40 */
                this.sprite.flw._velocity = 1.5; //i una velocitat

            } else { //a partir de la segona
                this.sprite.flw.pt.y = Math.round((tempPlatY - (this.height * 0.12)) - ((this.height * 0.0367) * Math.random())); //el seu rang tingui en compte la plataforma anterior /* 80 */ /* 40 */
                this.sprite.flw._velocity = (2 + (this.numID / 2));
            }
            tempPlatY = this.sprite.flw.pt.y;

        } else {
            if (this.id == "Plataforma_0") { //la primera plataforma que es genera  
                this.sprite.flw.pt.y = this.Y;
                this.sprite.flw._velocity = 1.5; //i una velocitat

            } else { //a partir de la segona
                this.sprite.flw.pt.y = this.Y;
                this.sprite.flw._velocity = (2 + (this.numID / 2));
            }
            tempPlatY = this.sprite.flw.pt.y;
        }

        //en les plataformes parell
        if (this.numID % 2 == 0) {
            this.sprite.flw._rotation = 0; //que vagi cap a un costat
        } else { //en els senars cap a l'altre costat
            this.sprite.flw._rotation = 3.1415;
        }

    }

    Draw() {
        this.sprite.Draw();
    }
}