class clsSprite {
    constructor(pCtx, pId = '', pImgPath, pNum_Frames, pFileExtension, pXoff, pYoff, pScale = 1, pHitboxWidth = 0, pHitboxHeight = 0, pCenter = 1) {
        this.ctx = pCtx;
        this.Id = pId;
        this.pFileExtension = pFileExtension
        this.visible = true;
        this.frames = [];
        this.num_frames = pNum_Frames;
        this.scale = pScale;
        this.current_frame = 0;
        this._imgPath = pImgPath;
        this.cnt = 0;
        this.state = 0;
        this.flw = new clsFollow();
        this.Xoff = pXoff;
        this.Yoff = pYoff;
        this.loaded = false;

        this.stFrame = 0; //start frame
        this.endFrame = this.num_frames - 1; //end frame

        this.HitboxWidth = pHitboxWidth;
        this.HitboxHeight = pHitboxHeight;

        // GetCanvas().addEventListener('click', this.onMouseDown.bind(this), false);
        this.init();
        this._loop();

    }

    // 
    Collide(pSprite) {
        var tRet = false;
        var rect1 = this._getBoundingRect();
        var rect2 = pSprite._getBoundingRect();

        var d = GetDistance(this._centerPoint(), pSprite._centerPoint());

        //if (d<50) {
        //console.log('dist_' + d+ 'rect1 w=' + rect1.width)
        //}

        if (d < rect1.width) {
            tRet = true;
        }
        return tRet;
    }
    //////////////////////////////////////////////////////////////////////////////////
    Collide_2(pSprite) {
        
        this.collideRightToLeft = false;
        this.collideLeftToRight = false;
        this.collideUpToDown = false;
        this.collideDownToUp = false;

        var tRet = false;
        var rect1 = this.getRect();
        var rect2 = pSprite.getRect();

        // console.log("rect1.x1: " + rect1.x1 + " | rect1.x2: " + rect1.x2 + " | rect1.y1: " + rect1.y1 + " | rect1.y2: " + rect1.y2);
        // console.log("rect2.x1: " + rect2.x1 + " | rect2.x2: " + rect2.x2 + " | rect2.y1: " + rect2.y1 + " | rect2.y2: " + rect2.y2);

        if (rect1.x2 > rect2.x1) { //Izquierda a derecha
            // this.flw.pt.x = rect2.x1;
            console.log("HE ENTRADO 1")
            this.collideLeftToRight = true; //detener rect1 X
            tRet = true;
        }
        if (rect1.x1 < rect2.x2) { //Derecha a izquierda
            // this.flw.pt.x = rect2.x2;
            console.log("HE ENTRADO 2")
            this.collideRightToLeft = true; //detener rect1 X
            tRet = true;
        } else {
            tRet = false;
        }

        if (rect1.y2 > rect2.y1) { //Arriba hacia abajo
            // this.flw.pt.y = rect2.y1;
            console.log("HE ENTRADO 3")
            this.collideUpToDown = true; //detener rect1 Y
            tRet = true;
        }
        if (rect1.y1 < rect2.y2) { //Abajo hacia arriba
            // this.flw.pt.y = rect2.y2;
            console.log("HE ENTRADO 4")
            this.collideDownToUp = true; //detener rect1 Y
            tRet = true;
        } else {
            tRet = false;
        }

        return tRet;
    }
    getRect() {
        return { x1: this.GetX(), y1: this.GetY(), x2: this.GetX() + this.GetWidth(), y2: this.GetY() + this.GetHeight() };
    }
    //////////////////////////////////////////////////////////////////////////////////
    _centerPoint() {
        return { x: this.GetX(), y: this.GetY() };
    }
    //----------------------------------------------------------------------------------
    _getBoundingRect() {
        return { left: this.GetX() - this.GetWidth() / 2, top: this.GetY() - this.GetHeight() / 2, width: this.GetWidth(), height: this.GetHeight() };

    }

    //----------------------------------------------------------------------------------
    onMouseDown(e) {
        //var g=this.frames[this.current_frame].image;
        //console.log(this.Id);
        //return
        var m = GetMousePos(e.pageX, e.pageY);
        var rect = this._getBoundingRect();
        if (PointInRect(m.x, m.y, rect) == true) {
            this.flw.spin_velo = 0;
            console.log('>>>>>>>');
            console.log(m);
            console.log(rect);
            console.log('clicked' + this.Id)
        }
    }
    //----------------------------------------------------------------------------------
    LoadImages() {
        for (var i = 1; i <= this.num_frames; i++) {
            var tI = new clsImage(this._imgPath + "frame_" + i + this.pFileExtension, this.ctx, 0, this.Xoff, this.Yoff, this.scale, 1)
            tI.caption = this.Id;
            this.frames.push(tI);
            //console.log("_______" +tI.imagepath);

        }
        this.loaded = true;
    }
    //----------------------------------------------------------------------------------
    _DelayCheck() {
        this.cnt++
        if (this.cnt % 5 == 0) {
            return true;
        }
        return false;
    }
    //----------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------
    init() {
        this.LoadImages()
    }

    //----------------------------------------------------------------------------------
    GetX() {
        return this.flw.pt.x
    }
    GetY() {
        return this.flw.pt.y
    }
    GetWidth() {
        return (this.frames[this.current_frame].image.width * this.scale) + this.HitboxWidth;
    }
    GetHeight() {
        return (this.frames[this.current_frame].image.height * this.scale) + this.HitboxHeight;
    }
    //----------------------------------------------------------------------------------
    Draw() {
        if (this.loaded == false) { return }

        if (this.visible == false) { return };

        if (this._DelayCheck()) {
            // console.log("");
            if (this.state == 1) { this.current_frame++; };
            if (this.current_frame > this.endFrame) this.current_frame = this.stFrame;
        }
        //console.log("current frame=" + this.current_frame + "_   " + this.GetWidth());
        if (this.current_frame != undefined) {
            this.frames[this.current_frame].Draw(this.flw.pt, this.scale, this.spinning);
        }


    }
    //----------------------------------------------------------------------------------
    _loop() {
        if (this.loaded == false) { return }
        this.flw.Move();
        window.requestAnimationFrame(this._loop.bind(this));
    }
    //----------------------------------------------------------------------------------
    GoToAndStop(pFrame) {
        pFrame = pFrame - 1
        this.current_frame = pFrame;
    }

    GoToAndPlay() {

    }

    //----------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------




}