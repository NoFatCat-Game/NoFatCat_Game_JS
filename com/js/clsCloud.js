var tempCloudY = 0;

class clsCloud {
    constructor(pCtx, pId, pX, pY) {
        this.id = pId;
        this.ctx = pCtx;

        this.X = pX;
        this.Y = pY;

        this.sprite = new clsSprite(this.ctx, this.id, "img/cloud/cloud02_", 1, '.png', 0, 0, (this.ctx.canvas.height / (3500 + Math.floor(Math.random() * 1500))));

        //fricció
        this.sprite.flw.friction = 0;

        //velocidad
        this.sprite.flw._velocity = ((0.5 + (Math.random() * 2)) / 5); //0 //0.5

        //Ignorar rotacion imagen
        this.sprite.flw.ignoreGraphicRotation = 1;

        this.resizeCloud();
    }

    resizeCloud() {
        this.height = this.ctx.canvas.height;

        //agafar només el num de la cloud
        this.numID = parseInt(this.id.slice(5));

        //si no s'especifica "x,y" la seva posició serà random
        if (this.X == null || this.X == undefined) {
            this.sprite.flw.pt.x = width * Math.random();
        } else {
            this.sprite.flw.pt.x = this.X;
        }

        // quan no especifiquem y
        if (this.Y == null || this.Y == undefined) {

            if (this.id == "Nube_0") { //la primera plataforma que es genera
                this.sprite.flw.pt.y = Math.round((this.height * 0.4834) + ((this.height * 0.0667) * Math.random())); //tingui un rang d'aparició  /* 410 */ /* 40 */
            } else { //a partir de la segona
                this.sprite.flw.pt.y = Math.round((tempCloudY - (this.height * 0.12)) - ((this.height * 0.0367) * Math.random())); //el seu rang tingui en compte la plataforma anterior /* 80 */ /* 40 */
            }
            tempCloudY = this.sprite.flw.pt.y;

        } else {
            this.sprite.flw.pt.y = this.Y;
        }

        /*  //en les plataformes parell
         if (this.numID % 2 == 0) {
             this.sprite.flw._rotation = 0; //que vagi cap a un costat
         } else { //en els senars cap a l'altre costat
             this.sprite.flw._rotation = 3.1415;
         } */
    }

    Draw(catvelocity, direction) {

        if (direction == "right") {
            this.sprite.flw.pt.x = (this.sprite.flw.pt.x - (catvelocity / 2.5));

        } else if (direction == "left") {
            this.sprite.flw.pt.x = (this.sprite.flw.pt.x + (catvelocity / 5));
        }

        this.sprite.Draw();

    }
}