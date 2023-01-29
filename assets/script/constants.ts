
import { _decorator, Component, Node, color, Color } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = constants
 * DateTime = Fri Mar 18 2022 12:45:42 GMT+0700 (Indochina Time)
 * Author = hoantancong
 * FileBasename = constants.ts
 * FileBasenameNoExtension = constants
 * URL = db://assets/script/constants.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('constants')
export class constants {
    public static CELL_SELECTED_COLOR:Color = color(150,130,120,255);
    public static CELL_FIRED_COLOR:Color = color(50,50,50,255)
    public static CELL_SHIP_HIT_COLOR:Color = color(220,80,90,255)
    public static CELL_NORMAL_COLOR:Color = color(220,220,220,255)
    public static WIN_ROUND:string = 'You win!';
    public static LOSE_ROUND:string = 'Lose win!';
    public static YOUR_TURN:string = 'Your turn!';
    public static FRIEND_TURN:string = 'Friend turn!';
    public static COL:number = 8;
    public static ROW:number = 8;
    public static clientName:string = 'client'+Math.floor(Math.random()*1000);
    //
    public static MENU_SCENE:string = 'menu';
    public static GAME_SCENE:string='game';
    public static ONLINE_GAME_SCENE='onlinegame';
    //online
    public static SERVER_CONNECTED_STR: string = 'Server connected';
    public static JOINED_FIND_OPPONENT_STR: string = 'Finding oponnents';
    public static ALL_PLAYER_JOINED_STR:string = 'All player join! Match start'
    public static WAIT_OTHER_DELOYING:string = 'Wait for other player deploying'
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
