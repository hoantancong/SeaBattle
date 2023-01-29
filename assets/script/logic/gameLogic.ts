
import { Vec2, _decorator } from 'cc';
import { constants } from '../constants';
import { gameData } from '../gameData';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = gameLogic
 * DateTime = Fri Mar 18 2022 12:48:52 GMT+0700 (Indochina Time)
 * Author = hoantancong
 * FileBasename = gameLogic.ts
 * FileBasenameNoExtension = gameLogic
 * URL = db://assets/script/logic/gameLogic.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('gameLogic')
export class gameLogic {
    //part of ship: 3,5....
    //ship map data
    // public static shipMap:Array<string> =[];
    // public static shipFriendMap:Array<string> =[];
    public static generateFriendMap(){
        let newList:Array<string> =[];
        let xy;
        for(let i = 0;i<gameData.numOfShipParts;i++){
            do{
                let x = Math.floor(Math.random()*constants.COL);
                let y = Math.floor(Math.random()*constants.ROW);
                xy = x+''+y;
            }while(newList.find(element => element=== xy));
            newList.push(xy);
        }
        return newList;

    }
    public static shotCorrectTarget(cellName:string){
        //return gameLogic.shipFriendMap.find(element =>element=== cellName)
        return gameData.friendShipLocation.find(element => element=== cellName);
        //return false;
    }
    public static generateRandomMove(){
        let col = Math.floor(Math.random()*constants.COL);
        let row = Math.floor(Math.random()*constants.ROW);
        return col+''+row;
    }
    public static isExistMove(move,list){
        //find and exist move before!
        return list.find(element => element===move);
    }
    public static checkFriendHit(move:string){
        return gameData.yourShipLocation.find(element => element=== move);
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
