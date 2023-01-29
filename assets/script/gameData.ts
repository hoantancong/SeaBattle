
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = gameData
 * DateTime = Mon Mar 21 2022 09:55:59 GMT+0700 (Indochina Time)
 * Author = hoantancong
 * FileBasename = gameData.ts
 * FileBasenameNoExtension = gameData
 * URL = db://assets/script/gameData.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('gameData')
export class gameData {
    public static numOfShipParts: number = 3;
    public static youMap:Array<string> =[];
    public static friendMap:Array<string> =[];
    public static yourMoveList:Array<string> =[];
    public static friendMoveList:Array<string> =[];
    public static yourShipLocation:Array<string> =[];
    public static friendShipLocation:Array<string> =[];
    public static isHost:boolean =false;
    public static isOnlineGame:boolean =false
    public static resetData(){
        gameData.youMap = new Array();
        gameData.friendMap = new Array();
        gameData.yourMoveList = new Array();
        gameData.friendMoveList = new Array();
        gameData.yourShipLocation = new Array();
        gameData.friendShipLocation = new Array();

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
