export class Coordinate{

    constructor(private x?: number, private y?: number){}

    setX(x: number){
        this.x = x;
    }

    setY(y: number){
        this.y = y;
    }

    setCoordinate(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    getX(){
        return this.x
    }

    getY(){
        return this.y
    }
}