import { identifierName } from '@angular/compiler';
import Konva from 'konva';
import { take } from 'rxjs';
import { IShape } from 'src/app/View/shapes/IShape';
import { HttpService } from '../http/http.service';

export class Proxy{
    
    constructor(public shapes: IShape[], private http: HttpService){}

    public startApp(){
        this.http.getRequest('startNewSession');
    }

    public validateInstruction(instruction: string): boolean{
        let action: string[] = instruction.split(' ');
        switch(action[0]){
            case "create":
                if(action.length != 2 || Number.isNaN(action[1]))
                    return false;
                    break;

            case "delete":
                if(action.length != 2 || Number.isNaN(action[1]))
                    return false;
                    break;
            
            case "change":
                if(action.length != 10 || Number.isNaN(action[1]) || Number.isNaN(action[2]) || Number.isNaN(action[3]) || Number.isNaN(action[4]) || Number.isNaN(action[5])  || Number.isNaN(action[6])  || Number.isNaN(action[7]))
                    return false
                    break;
            
            default: return false;
        }
        return true 
    }

    public resolveInstruction(instruction: string): void{
        let action: string[] = instruction.split(' ');
        let shape = this.shapes[Number(action[1])].konvaModel
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

    saveRequest(filePath: string, fileName: string, fileExtension: string): any {
        switch(fileExtension){
            case "xml":
                return this.http.postRequest("saveXml", `${filePath}/${fileName}.${fileExtension}`)
            case "json":
                return this.http.postRequest("saveJson", `${filePath}/${fileName}.${fileExtension}`)
            default:
                alert('Enter name and path');
        }
    }

    loadRequest(filePath: string, fileName: string, fileExtension: string): any{
        switch(fileExtension){
            case "xml":
                return this.http.postRequest("loadXml", `${filePath}/${fileName}.${fileExtension}`)
            case "json":
                return this.http.postRequest("loadJson", `${filePath}/${fileName}.${fileExtension}`)
        }
    }

    undoRequest() {
        return this.http.getRequest("undo");
    }

    redoRequest() {
        return this.http.getRequest("redo");
    }

    copyShape(shapeId: number){
        this.http.postRequest("copy", shapeId).pipe(take(1)).subscribe(e => {})
    }

    createShape(shape: IShape) {
        this.http.postRequest("create", shape).pipe(take(1)).subscribe(e => {})
    }

    destroyShape(shapeId: string) {
        this.http.postRequest("delete", shapeId).pipe(take(1)).subscribe(e => {})
    }

    sendChange(shapeId: number) {
        let shape = this.shapes[shapeId];
        this.http.postRequest("change",
        `${shape.id} ${shape.x} ${shape.y} ${shape.width} ${shape.height} ` + 
        `${shape.rotateAngle} ${shape.strokeWidth} ${shape.borderColor} ${shape.fillColor}`).pipe(take(1)).subscribe(e => {})
    }
    
}