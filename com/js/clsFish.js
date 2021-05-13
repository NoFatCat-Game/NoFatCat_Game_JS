class clsFish {

    constructor(pCtx) {
        this.ctx = pCtx

        this.sprite = new clsSprite(this.ctx, "fish", "img/fish/fish01_", 1, ".png", 0, 0, (this.ctx.canvas.height / 4000));

        //Ignorar rotacion imagen
        this.sprite.flw.ignoreGraphicRotation = 1;
 
        //Friccion //Velocidad Maxima
        this.sprite.flw.friction = 0;

    }   
    ///////////////////////////////////////////////////////////////
    Draw(x, y) {
        this.sprite.flw.pt.x = x;
        this.sprite.flw.pt.y = y - (this.ctx.canvas.height / 30);
        this.sprite.Draw();
    }
}