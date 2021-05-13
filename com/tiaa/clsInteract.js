class clsInteract {
    constructor(pParent) {
        this.Doc = pParent.Doc;
        this.parent = pParent;

        //pc
        // this.Doc.addEventListener('keypress', this._keypressed.bind(this));
        // this.Doc.addEventListener('mousemove', this._mousemove.bind(this));
        this.Doc.addEventListener('keydown', this._keydown.bind(this));
        this.Doc.addEventListener('keyup', this._keyup.bind(this));

        //mobile
        this.Doc.addEventListener('touchstart', this._touchStart.bind(this));
        this.Doc.addEventListener('touchend', this._touchEnd.bind(this));
        this.Doc.addEventListener('touchmove', this._touchJump.bind(this));

    }
    ////////////////////////////////////
    ////PC 
    // _keypressed(e) {
    //     // console.log('_______keypress  == ' + e.keyCode);
    //     var tEvent = new Event('__KEYPRESS_CUSTOM', e);
    //     var new_event = new e.constructor(tEvent.type, e)
    //     this.Doc.dispatchEvent(new_event);
    // }
    /*    
    _mousemove(e) {
        var tP = GetMousePos(e.x, e.y);
        var t = tP.x + " / " + tP.y;
        Print(t);
    }
    */
    ////////////////////////////////////
    ////PC
    _keydown(e) {
        var tEvent = new Event('__KEYDOWN_CUSTOM', e);
        var new_event = new e.constructor(tEvent.type, e)
        this.Doc.dispatchEvent(new_event);
        // console.log(e.touches[0].clientX);
    }
    _keyup(e) {
        var tEvent = new Event('__KEYUP_CUSTOM', e);
        var new_event = new e.constructor(tEvent.type, e)
        this.Doc.dispatchEvent(new_event);
    }

    ////MOBILE
    _touchStart(e) {
        var tEvent = new Event('__TOUCHSTART_CUSTOM', e);
        var new_event = new e.constructor(tEvent.type, e)
        this.Doc.dispatchEvent(new_event);
        // console.log(e.touches[0].clientX);
    }
    _touchEnd(e) {
        var tEvent = new Event('__TOUCHEND_CUSTOM', e);
        var new_event = new e.constructor(tEvent.type, e)
        this.Doc.dispatchEvent(new_event);
    }
    _touchJump(e) {
        var tEvent = new Event('__TOUCHJUMP_CUSTOM', e);
        var new_event = new e.constructor(tEvent.type, e)
        this.Doc.dispatchEvent(new_event);
    }
    ////////////////////////////////////
}