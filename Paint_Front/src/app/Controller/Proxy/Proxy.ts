import Konva from 'konva';
import { IShape } from 'src/app/View/shapes/IShape';
import { HttpService } from '../http/http.service';

export class Proxy{
    
    constructor(private shapes: Konva.Shape[], private http: HttpService){}

    public validateInstruction(instruction: string){
        //validation
        return true
        
    }

    public resolveInstruction(instruction: string): void{
        let action: string[] = instruction.split(' ');
        let shape = this.shapes[Number(action[1])];
        switch(action[0]){
            case "create":
                shape.visible(true);
                break

            case "delete":
                shape.visible(false);
                break;

            case "change":
                shape.x(Number(action[2]))
                shape.y(Number(action[3]))
                shape.width(Number(action[4]))
                shape.height(Number(action[5]))
                shape.rotation(Number(action[6]))
                shape.strokeWidth(Number(action[7]))
                shape.stroke(action[8])
                shape.fill(action[9])
        }
    }

    saveRequest() {
        this.http.postRequest("saveJson").subscribe();
        console.log("save");
    }

    loadRequest() {
        return this.http.postRequest("loadJson");
    }

    undoRequest() {
        return this.http.getRequest("undo");
    }

    redoRequest() {
        return this.http.getRequest("redo");
    }

    createShape(shape: IShape) {
        this.http.postRequest("create", shape).subscribe();
    }

    destroyShape(konv: string) {
        console.log(konv);
        this.http.postRequest("delete", konv).subscribe();
    }

    sendChange(konv: Konva.Shape) {
        this.http.postRequest("change",
        `${konv.id()} ${konv.x()} ${konv.y()} ${konv.width()} ${konv.height()} ` + 
        `${konv.rotation()} ${konv.strokeWidth()} ${konv.stroke()} ${konv.fill()}`).subscribe();
    }
    
}