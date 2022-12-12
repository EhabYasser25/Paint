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
        alert(action)
        let shape = this.shapes[Number(action[1])];
        switch(action[0]){

            case "delete":
                shape.destroy();
                break;
            
            case "move":
                shape.x(Number(action[2]));
                shape.y(Number(action[3]));
                break;

            case "color":
                shape.stroke(action[2]);
                shape.fill(action[3]);
                break;
            
            case "resize":
                shape.width(Number(action[2]));
                shape.height(Number(action[3]));
                break;

        }
    }

    saveRequest() {
        this.http.postRequest("save").subscribe();
    }

    loadRequest() {
        return this.http.postRequest("load");
    }

    createShape(shape: IShape) {
        this.http.postRequest("create", shape).subscribe();
    }

    destroyShape(konv: string) {
        
        this.http.postRequest("delete", konv).subscribe();
    }

    sendChange(konv: Konva.Shape) {
        this.http.postRequest("change",
        `${konv.id()} ${konv.x()} ${konv.y()} `  + 
        `${konv.width()} ${konv.height()} ${konv.stroke()} ${konv.fill()}`).subscribe();
    }
    
}