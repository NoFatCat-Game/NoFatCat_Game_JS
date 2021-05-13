class clsFollow {
    constructor() {
        this.verbose = 0;
        this.pt = new clsPoint(0, 0, 0, 0)
        this._velocity = 0;//Math.random()*5;
        this.friction = -0.01; //-0.01;
        this.rotationFriction = -0.001;
        this._velomax = 20;
        this._rotation = 0;
        this.rotationVelo = 0;
        this.rotation_dir = 0;
        this.spin_velo = 0;
        this._velo_x = 0;
        this._velo_y = 0;

        this.ignoreGraphicRotation = 0; //0 == rotar gràfics || 1 == no rotar gràfics

        this.floorY = 600;
        this.floorX = 0;

        this.gravity = 0;

        this.angle = 6; //arriba

    }
    ///////////////////////////////////////////////
    jump(pDirection) {
        if (pDirection == "right") {
            this.angle = 6.4;
        } else if (pDirection == "left") {
            this.angle = 5.6;
        }

        this._rotation = (45) * (3.14 / 180) * this.angle; //45º * (pi / 180º) * //2= 90º (hacia abajo) //6=270º  (hacia arriba)

        if (height < 500) {
            this._velomax = (height * 0.013); /* 7 * 228 */
            this._velocity = (height * 0.013); /* 7 * 228 */
        } else {
            this._velomax = (height * 0.01); /* 7 * 228 */
            this._velocity = (height * 0.01); /* 7 * 228 */
        }

    }
    ///////////////////////////////////////////////
    setVelocity(pVelo) {
        if (pVelo < 0) pVelo = 0;
        if (pVelo > this._velomax) pVelo = this._velomax;

        this._velocity = pVelo;
        this._velo_x = this._velocity * Math.cos(this._rotation);
        this._velo_y = this._velocity * Math.sin(this._rotation);

        // console.log('Velo_ '+this._velocity);
    }
    ////////////////////////////////////////////////
    increaseVelocity() {
        // console.log('Velocitiy Increase');
        this.setVelocity(this._velocity + 1);
    }
    decreaseVelocity() {
        this.setVelocity(this._velocity - 1);
    }
    displaceLeft() {

    }
    ////////////////////////////////////////////////
    rotateRight() {
        if (this.verbose == 1) {
            console.log('rotateLeft inc rot=' + this.rotation);
        };
        this.rotationVelo = this.rotationVelo + 0.02;
        this.rotation_dir = 0;
        if (this.rotationVelo > 0.1) { this.rotationVelo = 0.1 }
    }
    rotateLeft() {
        if (this.verbose == 1) {
            console.log('rotateRight inc rot=' + this.rotation);
        };
        this.rotation_dir = 1;
        this.rotationVelo = this.rotationVelo + 0.02;
        if (this.rotationVelo > 1) { this.rotationVelo = 1 }
    }
    ///////////////////////////////////////////////
    setRotation() {
        this.rotationVelo = this.rotationVelo + this.rotationFriction;
        if (this.rotationVelo < 0) { this.rotationVelo = 0 };

        if (this.rotation_dir == 0) {
            this._rotation = this._rotation + this.rotationVelo;
        } else {
            this._rotation = this._rotation - this.rotationVelo;
        }
    }
    ///////////////////////////////////////////////
    Move() {
        //console.log("hi")
        //console.log('pt.rot='+this.pt.rotation);
        if (this.IsOutsideX() == true) {
            //console.log('fuerraaaaa');
        }
        /*  if (this.IsOutsideY() == true) {
             //console.log('fuerraaaaa');
         } */
        // console.log(this._velocity);
        this.setVelocity(this._velocity + this.friction);
        this.setRotation();

        this.pt.x = this.pt.x + this._velo_x;
        this.pt.y = this.pt.y + this._velo_y + this.gravity;

        if (this.pt.y > this.floorY) {
            this.pt.y = this.floorY;
        }

        if (this.ignoreGraphicRotation == 0) { //NO ignorar la rotació dels "gràfics" si és 0
            this.pt.rotation = this._rotation;
        }

        this.pt.spin = this.pt.spin + this.spin_velo;
    }
    ///////////////////////////////////////////////
    IsOutsideX() {
        // if (this._velo_x > 0) {
        if (this.pt.x > width) {
            this.pt.x = 0;
            return true;
        }
        // } else {
        else if (this.pt.x < 0) {
            this.pt.x = width;
            return true;
        };
        // };
        return false;
    }
    //////////////////////////////////////////////////////////
    IsOutsideY() {
        if (this._velo_y > 0) {
            if (this.pt.y > height) {
                this.pt.y = 0;
                return true;
            };
        } else {
            if (this.pt.y < 0) {
                this.pt.y = height;
                return true;
            };
        };
        return false;
    }

}