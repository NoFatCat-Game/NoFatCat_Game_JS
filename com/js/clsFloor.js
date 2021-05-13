class clsFloor {

    constructor(pCtx) {
        this.ctx = pCtx

        this.sprite = new clsSprite(this.ctx, "cat", "img/floor/floor0-grass_", 1, ".png", 0, 0, (this.ctx.canvas.height / 600));
        
        this.resizeFloor();
    }

    resizeFloor() {
        this.sprite.flw.pt.x = this.ctx.canvas.width / 2; /* 400 */
        this.sprite.flw.pt.y = this.ctx.canvas.height * 0.9167; /* 550 */


        this.sprite.flw.floorY = this.ctx.canvas.height; //600
    }

    Draw() {      

        this.sprite.Draw()
    }
}