
import { _decorator, Component, Node, Prefab, instantiate, Vec3, Sprite, Label, TiledUserNodeData } from 'cc';
import { constants } from '../constants';
import { Utils } from '../framework/Utils';
import { gameData } from '../gameData';
import { gameLogic } from '../logic/gameLogic';
import { clientSocket } from '../network/clientSocket';
const { ccclass, property } = _decorator;

const GAME_STATE = {
    wait: 0,
    you: 1,
    friend: 2,
    end: 3
}
@ccclass('roundOnline')
export class  roundOnline extends Component {
    @property(Prefab)
    cellPrefab: Prefab | null = null;
    @property(Node)
    youMap: Node = null;
    @property(Node)
    friendMap: Node = null;
    @property(Label)
    statusLabel: Label | null = null;
    colNums: number = 8;
    rowNums: number = 8;
    //
    startX: number = -360;
    startY: number = 450;
    yourHitNumber: number = 0;
    friendHitNumber:number = 0;
    //win callback
    winCallback = null;
    loseCallback = null;
    yourCellList: Array<Node> = null;
    friendCellList: Array<Node> = null;
    //friend fired list
    friendFiredList: Array<string> = null;
    gameState = GAME_STATE.wait;
    start() {

    }
    onEnable() {
        if(gameData.isHost){
            this.gameState= GAME_STATE.you;
            this.statusLabel.string = constants.YOUR_TURN;
        }else{
            this.gameState= GAME_STATE.friend;
            this.statusLabel.string = constants.FRIEND_TURN;
        }

        this.yourHitNumber =gameData.numOfShipParts
        this.friendHitNumber =gameData.numOfShipParts
        if (!this.yourCellList) {
            this.generateYourmap();
        }
        if (!this.friendCellList) {
            this.generateFriendMap();
        }
        //re-arange
        let yourShipPartCount = 0;
        gameData.yourShipLocation.forEach(element => {
            console.log('Key:', element);
        });
        this.yourCellList.forEach(element => {
            //coloring it
            const uiColor = element.getComponent(Sprite)!;
            uiColor.color = constants.CELL_NORMAL_COLOR;
            if (yourShipPartCount <gameData.numOfShipParts) {
                if (gameData.yourShipLocation.find(e => e === element.name)) {
                    uiColor.color = constants.CELL_SELECTED_COLOR;
                    yourShipPartCount++;
                } else {
                    uiColor.color = constants.CELL_NORMAL_COLOR;
                }
            } else {
                uiColor.color = constants.CELL_NORMAL_COLOR;
            }
        });


        //friend
        let friendShipPartCount = 0;
        //re-create list
        this.friendFiredList = new Array();
        this.friendCellList.forEach(element => {
            element.on(Node.EventType.TOUCH_END, this.onTouchFriendMapCell, this, true);
            const uiColor = element.getComponent(Sprite)!;

            if (friendShipPartCount < gameData.numOfShipParts) {
                if (gameData.friendShipLocation.find(e => e === element.name)) {
                    uiColor.color = constants.CELL_SELECTED_COLOR;
                    friendShipPartCount++;
                } else {
                    uiColor.color = constants.CELL_NORMAL_COLOR;
                }
            } else {
                uiColor.color = constants.CELL_NORMAL_COLOR;
            }
        })


    }
    onDisable() {
        this.friendCellList.forEach(element => {
            element.off(Node.EventType.TOUCH_END, this.onTouchFriendMapCell, this, true);
        });
    }
    setupCallback(winCallback,loseCallback){
        this.winCallback = winCallback;
        this.loseCallback = loseCallback;
    }
    private generateYourmap() {
        //generate maps and show your pos
        this.yourCellList = new Array();
        for (let i = 0; i < this.colNums; i++) {
            for (let j = 0; j < this.rowNums; j++) {
                //init here
                let cell = instantiate(this.cellPrefab);
                cell.position = new Vec3(this.startX + 74 * (i + 1), this.startY - 74 * j);
                cell.name = i + '' + j;
                cell.parent = this.youMap;
                this.yourCellList.push(cell);


            }
        }
        this.youMap.setScale(new Vec3(0.7, 0.7, 1));
    }
    private generateFriendMap() {
        this.friendCellList = new Array();
        for (let i = 0; i < this.colNums; i++) {
            for (let j = 0; j < this.rowNums; j++) {
                //init here
                let cell = instantiate(this.cellPrefab);
                cell.name = i + '' + j;
                cell.position = new Vec3(this.startX + 74 * (i + 1), this.startY - 74 * j);
                //add event listener

                cell.parent = this.friendMap;
                this.friendCellList.push(cell);


            }
        }
    }
    private onTouchFriendMapCell(event) {
        if (this.gameState !== GAME_STATE.you)
            return;
        let cell: Node = event.target;
        console.log('move',cell.name);
        clientSocket._instance.clientRoundMove(cell.name);
        this.gameState=GAME_STATE.wait;
        //wait for server respond

        //
        // cell.off(Node.EventType.TOUCH_END, this.onTouchFriendMapCell, this, true);
        // const uiColor = cell.getComponent(Sprite)!;
        // if (gameLogic.shotCorrectTarget(cell.name)) {
        //     //correct
        //     console.log('fired', 'correct');
        //     uiColor.color = constants.CELL_SHIP_HIT_COLOR;
        //     this.yourHitNumber--;
        //     //change to friend turn

        //     if (this.yourHitNumber == 0) {
        //         //ship shink 
        //         this.gameState = GAME_STATE.end;
        //         this.winRound();
        //         return;
        //     }
        // } else {
        //     //incorrect
        //     //mark color it


        //     uiColor.color = constants.CELL_FIRED_COLOR;
        // }
        // this.friendTurn();

    }
    private friendTurn(){
        //
        //
        //
        // this.gameState = GAME_STATE.friend;
        // //
        // this.statusLabel.string = constants.FRIEND_TURN;
        // //take a move
        // setTimeout(() => {
        //     this.friendMove();
        // }, 1000);

        //
    }
    // private friendMove(){
    //     let nextMove;
    //     do{
    //         nextMove = gameLogic.generateRandomMove();
    //     }while (gameLogic.isExistMove(nextMove,this.friendFiredList));
    //     //do new move
    //     this.yourCellList.forEach(element => {
    //         if(element.name == nextMove){
    //             const uiColor = element.getComponent(Sprite)!;
    //             this.friendFiredList.push(nextMove);
    //             this.gameState = GAME_STATE.you;
    //             this.statusLabel.string = constants.YOUR_TURN;
    //             //check if friend hit your ship
    //             if(gameLogic.checkFriendHit(nextMove)){
    //                 uiColor.color = constants.CELL_SHIP_HIT_COLOR;
    //                 this.friendHitNumber--;
    //                 if (this.friendHitNumber == 0) {
    //                     //ship shink 
    //                     this.loseRound();
    //                 }
    //             }else{
    //                 uiColor.color = constants.CELL_FIRED_COLOR
    //             }
    //         }
    //     });

    // }
    public winRound() {
        console.log('Win ROUND');
        this.gameState= GAME_STATE.wait;
        this.statusLabel.string = constants.WIN_ROUND;
        setTimeout(() => {
            //show win board
            this.node.removeFromParent();
            if (this.winCallback) {
                this.winCallback();
            }
        }, 1000);
    }
    public loseRound(){
        console.log('lose ROUND');
        this.statusLabel.string = constants.LOSE_ROUND;
        setTimeout(() => {
            //show win board
            this.node.removeFromParent();
            if (this.loseCallback) {
                this.loseCallback();
            }
        }, 1000);
    }
    //online move()
    public clientMove(data){
        console.log("clientMove",data);
        if(data.clientID==constants.clientName){
            //this is my move
            //do this move
            this.takeYourMove(data.move);
            //
        }else{
            //this is friend move
            this.takeYourFriendMove(data.move);
        }
    }
    private takeYourMove(move:string){
        //take your move on friend board
        this.friendCellList.forEach(cell => {
            if(cell.name==move){
                cell.off(Node.EventType.TOUCH_END, this.onTouchFriendMapCell, this, true);
                const uiColor = cell.getComponent(Sprite)!;
                if (gameLogic.shotCorrectTarget(cell.name)) {
                    //correct
                    console.log('fired', 'correct');
                    uiColor.color = constants.CELL_SHIP_HIT_COLOR;
                    this.yourHitNumber--;
                    //change to friend turn
                    console.log('xxx',this.yourHitNumber);
                    if (this.yourHitNumber == 0) {
                        //ship shink 
                        this.gameState = GAME_STATE.end;
                        clientSocket._instance.clientWin();
                        return;
                    }
                } else {
                    //incorrect
                    //mark color it


                    uiColor.color = constants.CELL_FIRED_COLOR;
                }
                //
                clientSocket._instance.changeToFriendTurn();
                //
            }
        });
    }
    private takeYourFriendMove(nextMove){
        this.yourCellList.forEach(element => {
            if(element.name == nextMove){
                const uiColor = element.getComponent(Sprite)!;
                this.friendFiredList.push(nextMove);
                this.gameState = GAME_STATE.you;
                this.statusLabel.string = constants.YOUR_TURN;
                //check if friend hit your ship
                if(gameLogic.checkFriendHit(nextMove)){
                    uiColor.color = constants.CELL_SHIP_HIT_COLOR;
                    this.friendHitNumber--;
                    // if (this.friendHitNumber == 0) {
                    //     //ship shink 
                    //     this.loseRound();
                    // }
                }else{
                    uiColor.color = constants.CELL_FIRED_COLOR
                }
            }
        });
    }
    public clientChangeTurn(data){
        console.log('TURN',data);
        if(data==constants.clientName){
            //to your friend turn
            this.statusLabel.string = constants.FRIEND_TURN;
            this.gameState= GAME_STATE.friend;
        }else{
             //to your you turn
             this.statusLabel.string = constants.YOUR_TURN;
            this.gameState= GAME_STATE.you;
        }
    }
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
