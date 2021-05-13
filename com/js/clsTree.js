class clsTree {

    constructor(pCtx, pY) {
        this.ctx = pCtx

        this.sprite = new clsSprite(this.ctx, "tree", "img/tree/tree01_", 1, ".png", 0, 0, (this.ctx.canvas.height / 2000));

        //X,Y iniciales
        this.sprite.flw.pt.x = (Math.random() * this.ctx.canvas.width);
        this.sprite.flw.pt.y = this.ctx.canvas.height * 0.5867;


    }   
    ///////////////////////////////////////////////////////////////
    Draw () {
        this.sprite.Draw();
    }
}