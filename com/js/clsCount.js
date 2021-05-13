class clsCount {

    constructor(pCtx, pfishCount) {

        this.ctx = pCtx;
        this.fishCount = pfishCount;
        this.sprite = [];
        this.n = 0;

        //contador de cada pez
        this.pez1 = 0;
        this.pez5 = 0;
        this.pez25 = 0;
        this.pez125 = 0;
        this.pez625 = 0;
        this.pez3125 = 0;

        //cantidad total
        this.cantidad_total = 0;

        this.countFishes();
    }

    countFishes() {
        for (var i = 0; i < this.fishCount; i++) {
            this.pez1++;

            if (this.pez1 >= 5) {
                this.pez1 = 0;
                this.pez5++;
            }
            if (this.pez5 >= 5) {
                this.pez5 = 0;
                this.pez25++;
            }
            if (this.pez25 >= 5) {
                this.pez25 = 0;
                this.pez125++;
            }
            if (this.pez125 >= 5) {
                this.pez125 = 0;
                this.pez625++;
            }
            if (this.pez625 >= 5) {
                this.pez625 = 0;
                this.pez3125++;
            }
        }

        this.numInicial5 = this.pez1;
        this.numInicial25 = this.pez5 + this.pez1;
        this.numInicial125 = this.pez25 + this.pez5 + this.pez1;
        this.numInicial625 = this.pez125 + this.pez25 + this.pez5 + this.pez1;
        this.numInicial3125 = this.pez625 + this.pez125 + this.pez25 + this.pez5 + this.pez1;

        this.cantidad_total = this.pez3125 + this.pez625 + this.pez125 + this.pez25 + this.pez5 + this.pez1;

        if (this.pez3125 != 0) {
            this.loopFishes(this.numInicial3125, this.cantidad_total, "07") //Fish 07, el rojo
        }
        if (this.pez625 != 0) {
            this.loopFishes(this.numInicial625, this.numInicial3125, "06") //Fish 06, el naranja
        }
        if (this.pez125 != 0) {
            this.loopFishes(this.numInicial125, this.numInicial625, "05") //Fish 05, el amarillo
        }
        if (this.pez25 != 0) {
            this.loopFishes(this.numInicial25, this.numInicial125, "04") //Fish 04, el rosa
        }
        if (this.pez5 != 0) {
            this.loopFishes(this.numInicial5, this.numInicial25, "03") //Fish 03, el verde
        }
        if (this.pez1 != 0) {
            this.loopFishes(0, this.pez1, "02") //Fish 02, el original
        }

    }

    loopFishes(inicial, numPeces, typeFish) { //ya puedes seguir // vale xd
        for (var i = inicial; i < numPeces; i++) {

            this.sprite[i] = new clsSprite(this.ctx, "count_" + i, "img/fish/fish" + typeFish + "_", 1, ".png", 0, 0, (this.ctx.canvas.height / 3000));

            //X,Y iniciales
            this.sprite[i].flw.pt.x = ((this.ctx.canvas.width * 0.1112)) + this.n;
            this.sprite[i].flw.pt.y = (this.ctx.canvas.height * 0.06);

            this.n += (this.ctx.canvas.width * 0.026);
        }
    }
    ///////////////////////////////////////////////////////////////
    Draw() {
        for (var i = 0; i < this.cantidad_total; i++) {
            this.sprite[i].Draw();
        }
    }
}