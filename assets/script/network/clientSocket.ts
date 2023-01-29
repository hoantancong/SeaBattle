
import { _decorator, Component, game, Label, director } from 'cc';
import { constants } from '../constants';
import { gameData } from '../gameData';
import { onlinegameController } from '../onlinegameController';
import { configs } from './configs';
import { networkConstants } from './networkConstants';
import io from 'socket.io-client/dist/socket.io.js';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = clientSocket
 * DateTime = Mon Mar 21 2022 11:45:37 GMT+0700 (Indochina Time)
 * Author = hoantancong
 * FileBasename = clientSocket.ts
 * FileBasenameNoExtension = clientSocket
 * URL = db://assets/script/network/clientSocket.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('clientSocket')
export class clientSocket extends Component {
    public static _instance: clientSocket | null = null;
    public socket;
    start() {
        if (clientSocket._instance == null) {
            director.addPersistRootNode(this.node);
            clientSocket._instance = this;
        }
    }
    public connectToServer(game:onlinegameController) {

        let play = (socketio) => {
            this.socket = socketio.connect(configs.SERVER_NAME);
            this.onListenFromServer(game);
        }
        //
        play(io);
    }
    //send to server
    private sendToServer(connectionName: string, data: any) {
        this.socket.emit(connectionName, data);
    }
    private onListenFromServer(game:onlinegameController) {
        const startRound = (data)=>{
            console.log('all player start',data);
            game.setLobbyStatus(constants.ALL_PLAYER_JOINED_STR);
            game.startOnlineMatch();
        }
        this.socket.on(networkConstants.SERVER_SAY_HELLO, (data) => {
            game.setLobbyStatus(constants.SERVER_CONNECTED_STR);
            this.sendToServer(networkConstants.CLIENT_REGISTER_NAME, constants.clientName);
            //-> reg name
        })
        //
        //1. this is host
        this.socket.on(networkConstants.JOINED_FINDING_OPP, (data) => {
            console.log('You are host of:' + data.isHost);
            gameData.isHost = data.isHost;
            game.setLobbyStatus(constants.JOINED_FIND_OPPONENT_STR);
        })
        //2. all start
        this.socket.on(networkConstants.ALL_PLAYER_JOINED, (data) => {
            startRound(data);
        })
        this.socket.on(networkConstants.EMIT_MAP_TO_OTHER,(data)=>{
            gameData.friendShipLocation = data;
            this.sendToServer(networkConstants.EMIT_CLIENT_RECIEVED_MAP,null);
        })
        this.socket.on(networkConstants.SERVER_SAY_ROUND_START,()=>{
            game.startRound();
        })
        this.socket.on(networkConstants.SERVER_DO_CLIENT_MOVE,(data)=>{
            game.clientMove(data);
        })
        this.socket.on(networkConstants.SERVER_CHANGE_TURN,(data)=>{
            game.clientChangeTurn(data);
        })
        this.socket.on(networkConstants.SERVER_ALL_RESTART_READY,(hostName)=>{
            startRound({hostName:hostName});
            
        })
        this.socket.on(networkConstants.SERVER_RES_CLIENT_WIN,(clientID)=>{
            game.clientWin(clientID);
        })
        this.socket.on(networkConstants.SERVER_CHOOSE_HOST,(isHost)=>{
            game.setClientHost(isHost);
        })
        //3. recieve friend map

        //
    }
    //submit your map to server
    public submitYourmapToserver(callback){
        let mapList = new Array();
        mapList.push(gameData.yourShipLocation);
        if(gameData.friendShipLocation&&gameData.friendShipLocation.length!=0){
            mapList.push(gameData.friendShipLocation);
        }
        
        this.sendToServer(networkConstants.EMIT_MAP_TO_SERVER,mapList);
        callback();
    }
    public clientRoundMove(move:string){
        this.sendToServer(networkConstants.EMIT_CLIENT_MOVE,move);
    }
    public changeToFriendTurn(){
        this.sendToServer(networkConstants.EMIT_CHANGE_TURN,null);
    }
    public clientWin(){
        this.sendToServer(networkConstants.EMIT_CLIENT_WIN,null);
    }
    //
    public replayMatch(){
        //if player is host last game-> change to guess vice versa
        this.sendToServer(networkConstants.EMIT_CLIENT_RESTART_GAME,null)
    }
    //quit
    public quitSocket(){
        this.socket.disconnect();
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
