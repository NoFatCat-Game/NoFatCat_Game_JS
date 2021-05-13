class clsBackground {
    constructor(pCtx, pId) {
        this.id = pId;
        this.ctx = pCtx;

        this.sprite = new clsSprite(this.ctx, this.id, "img/backgrounds/bg2-sky_", 1, '.png', 0, 0, (this.ctx.canvas.height / 300));

        // this.sprite.flw.pt.x = 400; //800/2 = 400
        // this.sprite.flw.pt.y = 300; //600

        this.sprite.flw.pt.x = this.ctx.canvas.width / 2;/* 400 */
        this.sprite.flw.pt.y = this.ctx.canvas.height / 2;/* 300 */

    }
    resizeBackground() {

    }
    /////////////////////////////////////////////////////////////
    Draw() {
        this.sprite.Draw()
    }
}
