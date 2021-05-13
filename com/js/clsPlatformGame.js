class clsPlatformGame {

    constructor(pWin, pDoc) {

        this.frameRight = 3;

        this.win = pWin;
        this.Doc = pDoc;

        // Canvas
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        /////

        //Window Event on resize
        window.addEventListener("resize", this.resizeAll.bind(this));
        /////

        // Platforms
        this.platforms = [];
        this.platformNum = 4;
        /////

        // Clouds
        this.clouds = [];
        this.cloudNum = 4;
        /////

        // Crear Sprites
        this.CreateSprites();


        // INTERACT
        this.INTERACT = new clsInteract(this);
        //PC
        // this.Doc.addEventListener('__KEYPRESS_CUSTOM', this._InteractionCallBack.bind(this));
        this.Doc.addEventListener('__KEYDOWN_CUSTOM', this._InteractionCallBack.bind(this));
        this.Doc.addEventListener('__KEYUP_CUSTOM', this._InteractionCallBack.bind(this));
        //Mobile
        this.Doc.addEventListener('__TOUCHSTART_CUSTOM', this._InteractionCallBack.bind(this));
        this.Doc.addEventListener('__TOUCHEND_CUSTOM', this._InteractionCallBack.bind(this));
        /////

        //Bool moving
        this.shouldMove = false;
        this.touching = false;
        this.jumping = false;
        /////

        //fish
        this.fishHit = false;
        this.platformFish = Math.floor(Math.random() * 4);
        this.fishCount = 0; //3905 == 1 pez de cada
        /////

        // Bucle
        this._loop();
        /////
    }
    ///////////////////////////////////////////////////////////////
    //PRUEBA
    onTouchM() {
        console.log("HI");
        this.cat.sprite.flw.pt.y -= 20;
        //idea: while touching: move depending on X (1/2 screen right/left)
        //if touch is deslizando hacia arriba == jumpç
    }
    onTouch() {
        console.log("HI");
        this.cat.sprite.flw.pt.x -= 2;
        //idea: while touching: move depending on X (1/2 screen right/left)
        //if touch is deslizando hacia arriba == jumpç
    }
    ///////////////////////////////////////////////////////////////
    //resize
    resizeCanvas() {
        // console.log("resizecanvas");

        this.newWidth = this.Doc.documentElement.clientWidth;
        this.newHeight = this.Doc.documentElement.clientHeight;

        width = this.newWidth;
        height = this.newHeight;

        this.Doc.getElementById("canvas").width = this.newWidth;
        this.Doc.getElementById("canvas").height = this.newHeight;
    }
    resizeAll() {
        this.resizeCanvas();

        this.CreateSprites();

        /*         this.floor = new clsFloor(this.ctx);
        
                for (var i = 0; i < this.platformNum; i++) {
                    var tPlat = new clsPlatform(this.ctx, "Plataforma_" + i);
                    this.platforms.push(tPlat);
                } */
    }
    ///////////////////////////////////////////////////////////////
    //Funció inicialitzar la creació dels sprites
    CreateSprites() {
        // Fondo
        this.createBackGround();

        // Suelo
        this.createfloor();

        // Nubes
        this.createCloud();

        //  Arbol
        this.createTree();

        // Contador
        this.createCount();

        // Plataforma
        this.createPlatforms();

        // Pescado
        this.createFish();

        // Gato
        this.createCat();

    }
    ///////////////////////////////////////////////////////////////
    createBackGround() {
        this.backGround = new clsBackground(this.ctx, 1);

        //NO FAT CAT
        this.letters = new clsSprite(this.ctx, "nofatcatletters", "img/nofatcat/nofatcat_", 1, ".png", 0, 0, (this.ctx.canvas.height / 600));
        this.letters.flw.pt.x = this.newWidth / 2;
        this.letters.flw.pt.y = height * 0.03334; //heigh * 0.95;

        //Icono contador
        this.iconCount = new clsSprite(this.ctx, "iconCount", "img/counter/counter02_", 1, ".png", 0, 0, (this.ctx.canvas.height / 600));
        this.iconCount.flw.pt.x = (this.ctx.canvas.width / 20);
        this.iconCount.flw.pt.y = (this.ctx.canvas.height * 0.06);
    }

    createfloor() {
        this.floor = new clsFloor(this.ctx);
    }

    createCloud() {
        this.clouds = [];

        for (var i = 0; i < this.cloudNum; i++) {
            var tCloud = new clsCloud(this.ctx, "Nube_" + i);
            this.clouds.push(tCloud);
        }
    }

    createTree() {
        this.tree = new clsTree(this.ctx);
    }

    createCount() {
        this.count = new clsCount(this.ctx, this.fishCount);
    }

    createPlatforms() {
        this.platforms = [];

        n = this.ctx.canvas.height * (225 / 722);

        for (var i = 0; i < this.platformNum; i++) {
            var tPlat = new clsPlatform(this.ctx, "Plataforma_" + i, null, this.ctx.canvas.height - n);
            this.platforms.push(tPlat);
            n += this.ctx.canvas.height * (120 / 722);
        }
    }

    createFish() {
        this.fishHit = false;
        this.fish = new clsFish(this.ctx);
    }

    createCat() {
        this.cat = new clsCat(this.ctx);
    }

    ///////////////////////////////////////////////////////////////
    _InteractionCallBack(e) {
        if (e.type == "__KEYDOWN_CUSTOM") {
            this.keydownInteraction(e);
        }
        if (e.type == "__KEYUP_CUSTOM") {
            this.keyupInteraction(e);
        }
        if (e.type == "__TOUCHSTART_CUSTOM") {
            this.touchstartInteraction(e);
        }
        if (e.type == "__TOUCHEND_CUSTOM") {
            this.touchendInteraction(e);
        }
    }

    //PC Interaction
    keydownInteraction(e) {
        this.shouldMove = true;
        this.keyPressed = e.keyCode;
    }
    keyupInteraction() {
        this.shouldMove = false;
    }
    //Mobile Interaction
    touchstartInteraction(e) {
        this.touching = true;
        this.touchingX = e.changedTouches[0].clientX;
        this.touchingY = e.changedTouches[0].clientY;
    }
    touchendInteraction() {
        this.touching = false;
    }

    //Move On Touching
    moveOnTouching() {
        if (this.touchingX >= (this.ctx.canvas.width / 2) && this.touchingY >= (this.ctx.canvas.height / 2)) {
            this.interactMoveRight();
        } else if (this.touchingX < (this.ctx.canvas.width / 2) && this.touchingY > (this.ctx.canvas.height / 2)) {
            this.interactMoveLeft();
        } else if (this.touchingY <= (this.ctx.canvas.height / 2)) {
            this.interactJump();
        }
    }
    //Move Interaction
    interactMoveRight() {
        this.cat.sprite.flw._rotation = 0;
        this.cat.sprite.flw.increaseVelocity();

        this.cat.moveRight();
    }

    interactMoveLeft() {
        this.cat.sprite.flw._rotation = 3.1415; //PI Radianes == 180º
        this.cat.sprite.flw.increaseVelocity();

        this.cat.moveLeft();
    }

    interactJump() {

        if (this.cat.sprite.flw.pt.y >= this.cat.sprite.flw.floorY) {
            this.cat.moveUp();
            this.cat.sprite.flw.jump(this.cat.direction);
        }
    }

    //KEY INTERACTIONS
    keyInteractions() {
        if (this.keyPressed == 97 || this.keyPressed == 65) { //a || A
            this.interactMoveLeft();
        }

        if (this.keyPressed == 100 || this.keyPressed == 68) { //d || D
            this.interactMoveRight();
        }

        if (this.keyPressed == 32 || this.keyPressed == 119 || this.keyPressed == 87) { //space || w || W
            this.interactJump();
        }

    }

    ///////////////////////////////////////////////////////////////
    _CheckHits() {
        //Pez
        if (!this.fishHit) {
            if (this.fish.sprite.Collide(this.cat.sprite)) {
                this.fishCount++;

                this.TempPlatformFish = this.platformFish;

                while (this.TempPlatformFish == this.platformFish) {
                    this.platformFish = Math.floor(Math.random() * 4);
                }

                this.fishHit = true;

                this.fish = "";
                this.createFish();
                this.count = "";
                this.createCount();
            }
        }

        //Plataformas
        for (var i = 0; i < this.platforms.length; i++) {
            if (this.cat.sprite.Collide(this.platforms[i].sprite)) {
                // console.log(this.ctx.canvas.height);
                if ((this.cat.sprite.flw.pt.y + (this.ctx.canvas.height * (30 / 722))) <= this.platforms[i].sprite.flw.pt.y && i % 2 == 0) { // el +33 en el if es para evitar el "tp" al tocar la plataforma
                    this.cat.sprite.flw.floorY = this.platforms[i].sprite.flw.pt.y - (this.ctx.canvas.height * (33 / 722));
                    this.cat.sprite.flw.pt.x += this.platforms[i].sprite.flw._velocity;

                } else if ((this.cat.sprite.flw.pt.y + (this.ctx.canvas.height * (30 / 722))) <= this.platforms[i].sprite.flw.pt.y && i % 2 != 0) {
                    this.cat.sprite.flw.floorY = Math.round(this.platforms[i].sprite.flw.pt.y - (this.ctx.canvas.height * (33 / 722)));
                    this.cat.sprite.flw.pt.x -= this.platforms[i].sprite.flw._velocity;
                }

                return;
            }
        }

        this.cat.sprite.flw.floorY = this.ctx.canvas.height * 0.8033;/* 482 */
    }
    ///////////////////////////////////////////////////////////////
    //Bucle
    _loop() {
        this._CheckHits();

        this.backGround.Draw();
        this.floor.Draw();

        for (var i = 0; i < this.cloudNum; i++) {
            this.clouds[i].Draw(this.cat.sprite.flw._velocity, this.cat.direction);
        }

        this.tree.Draw();

        if (this.fishCount != 0) {
            this.count.Draw();
        }

        this.iconCount.Draw();

        this.letters.Draw();

        for (var i = 0; i < this.platformNum; i++) {
            this.platforms[i].Draw();
        }

        if (!this.fishHit) {
            this.fish.Draw(this.platforms[this.platformFish].sprite.flw.pt.x, this.platforms[this.platformFish].sprite.flw.pt.y);
        }

        if (this.shouldMove == true) {
            this.keyInteractions();
        }
        if (this.touching == true) {
            this.moveOnTouching();
        }

        this.cat.Draw();

        window.requestAnimationFrame(this._loop.bind(this));
    }
    ///////////////////////////////////////////////////////////////
}