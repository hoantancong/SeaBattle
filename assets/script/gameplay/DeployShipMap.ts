
import { _decorator, Component, Node,  Prefab, instantiate, Vec3, Sprite, color, Color } from 'cc';
import { constants } from '../constants';
import { gameData } from '../gameData';
import { gameLogic } from '../logic/gameLogic';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = DeployShipMap
 * DateTime = Fri Mar 18 2022 12:53:30 GMT+0700 (Indochina Time)
 * Author = hoantancong
 * FileBasename = DeployShipMap.ts
 * FileBasenameNoExtension = DeployShipMap
 * URL = db://assets/script/gameplay/DeployShipMap.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('DeployShipMap')
export class DeployShipMap extends Component {
    @property(Prefab)
    cellPrefab:Prefab | null = null;

    startX:number = -360;
    startY:number = 450;
    @property(Node)
    finishButton:Node | null = null;
    //num of ship part
    shipPartCount:number = 0;
    //
    finishCallback = null;
    cellList:Array<Node> = null;
    start () {
     
        // [3]
    
    }
    //
    onEnable(){
        //reset data
        gameData.resetData();
        this.shipPartCount = 0;
        this.finishButton.active=false;
        if(!this.cellList){
            this.generateMap();
        }
        this.cellList.forEach(element => {
            const uiColor = element.getComponent(Sprite)! ;
            uiColor.color = constants.CELL_NORMAL_COLOR
            element.on(Node.EventType.TOUCH_END,this.onTouchCell,this,true);
        });
    }
    onDisable(){
        this.cellList.forEach(element => {
            element.off(Node.EventType.TOUCH_END,this.onTouchCell,this,true);
        });
    }

    //
    setUp(callback){
        this.finishCallback = callback;
    }
    generateMap(){
        this.cellList = new Array();
        for(let i = 0;i<constants.COL;i++){
            for(let j = 0;j<constants.ROW;j++){
                //init here
                let cell = instantiate(this.cellPrefab);
                cell.name = i+''+j;
                cell.position = new Vec3(this.startX+74*(i+1),this.startY-74*j);
                cell.parent = this.node;
                this.cellList.push(cell);
            }
        }
    }
    private onTouchCell(event){
        if(this.shipPartCount<gameData.numOfShipParts){
            let cell:Node = event.target;
            cell.off(Node.EventType.TOUCH_END,this.onTouchCell,this,true);
            //set color
            //gameLogic.shipMap.push(cell.name);
            gameData.yourShipLocation.push(cell.name);
            const uiColor = cell.getComponent(Sprite)! ;
            uiColor.color = constants.CELL_SELECTED_COLOR;

            this.shipPartCount++;
            if(this.shipPartCount==gameData.numOfShipParts){
                //show button
                this.finishButton.active=true;
            }
        }

    
    }
    public onFinishMap(){
        this.node.removeFromParent();
        if(this.finishCallback){
            setTimeout(() => {
                this.finishCallback();
            }, 500);

        }
    }
    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
