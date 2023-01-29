
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = networkConstants
 * DateTime = Tue Mar 22 2022 09:59:08 GMT+0700 (Indochina Time)
 * Author = hoantancong
 * FileBasename = networkConstants.ts
 * FileBasenameNoExtension = networkConstants
 * URL = db://assets/script/network/networkConstants.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('networkConstants')
export class networkConstants {
    //socket string
    public static SERVER_SAY_HELLO="server-say-hello";
    public static JOINED_FINDING_OPP="joined-find-opps";
    public static ALL_PLAYER_JOINED='all-player-joined';
    public static CLIENT_REGISTER_NAME='client-registered-name';
    public static EMIT_MAP_TO_SERVER = 'submit-map-to-server';
    public static GAMEMAP_SUBMITED='game-map-submited';
    public static ALL_GAMEMAP_SUBMITED='all-gamemap-submited';
    public static EMIT_ALLMAP_READY='all-roundmap-ready';
    public static EMIT_MAP_TO_OTHER='emit-map-to-other';
    public static EMIT_CLIENT_MOVE='client-round-move';
    public static EMIT_CHANGE_TURN='emit-change-to-friendturn';
    public static EMIT_CLIENT_RESTART_GAME='emit-client-restart-game';
    public static EMIT_CLIENT_WIN='emit_client_win';
    public static SERVER_SAY_ROUND_START='server-say-round-start';
    //client move => server => dispatch to all client
    public static SERVER_DO_CLIENT_MOVE='server-emit-client-move';
    public static SERVER_CHANGE_TURN='server-change-turn';
    public static SERVER_ALL_RESTART_READY='server-all-restart-ready';
    public static SERVER_RES_CLIENT_WIN='server-res-client-win';
    public static EMIT_CLIENT_RECIEVED_MAP='emit-client-received-map';
    public static SERVER_CHOOSE_HOST ='server-choose-host';

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
