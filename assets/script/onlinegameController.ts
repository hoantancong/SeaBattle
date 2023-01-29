
import { _decorator, Component, Node, instantiate, Label, director } from 'cc';
import { constants } from './constants';
import { resourceUtil } from './framework/resourceUtil';
import { gameData } from './gameData';
import { DeployShipMap } from './gameplay/DeployShipMap';
import { roundOnline } from './gameplay/roundOnline';
import { gameLogic } from './logic/gameLogic';
import { clientSocket } from './network/clientSocket';
import { winUI } from './ui/winUI';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = onlinegameController
 * DateTime = Tue Mar 22 2022 09:33:16 GMT+0700 (Indochina Time)
 * Author = hoantancong
 * FileBasename = onlinegameController.ts
 * FileBasenameNoExtension = onlinegameController
 * URL = db://assets/script/onlinegameController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('onlinegameController')
export class onlinegameController extends Component {
    @property(Label)
    private lobbyStatus:Label | null = null;
    //
    private selectedMap:Node | null = null;
    private roundOnline:Node | null = null;
    private winUI:Node | null = null;
    private loesUI:Node | null = null;
    //
    
    //
    start() {
        gameData.resetData();
        gameData.isOnlineGame=true;
        setTimeout(() => {
            this.startConnectToServer();
        }, 500);

    }
    //
    private preloadAssets(){
        resourceUtil.preloadPrefab('game/roundOnline')
        resourceUtil.preloadPrefab('ui/winUI')
    }
    //
    public startConnectToServer(){
        clientSocket._instance.connectToServer(this.node.getComponent(onlinegameController));
    }
    //loby get status from server
    public setLobbyStatus(status:string){
        this.lobbyStatus.node.active=true;
        this.lobbyStatus.string = status;
    }
    public startOnlineMatch(){
        this.lobbyStatus.node.active=false;
        //show deploy map
        this.showSelectedMap();
    }
    public setClientHost(isHost:boolean){
        gameData.isHost=isHost;
    }
    //deploy map
    private showSelectedMap(){
        if(!this.selectedMap){
            //init
            resourceUtil.loadPrefab('game/deployShipNode',(prefab)=>{
                //init
                this.selectedMap = instantiate(prefab);
                this.selectedMap.getComponent(DeployShipMap).setUp(()=>{
                    this.clientMapCreated();
                });
                this.selectedMap.parent = this.node;

            })
        }else{
            this.selectedMap.parent = this.node;
        }
    }
    private clientMapCreated(){
        //sbmit your map and wait 2nd player

        clientSocket._instance.submitYourmapToserver(()=>{
             this.setLobbyStatus(constants.WAIT_OTHER_DELOYING);
        });
    }
    public startRound(){
        //1.generate friend map
        this.lobbyStatus.node.active=false;
        //
        gameLogic.generateFriendMap();
        //2. show map
        if(!this.roundOnline){
            resourceUtil.loadPrefab('game/roundOnline',(prefab)=>{
                this.roundOnline = instantiate(prefab);
                this.roundOnline.getComponent(roundOnline).setupCallback(
                    ()=>{
                        this.showWinUI();
                    },
                    ()=>{
                        this.showLoseUI();
                    }
                )
                this.roundOnline.parent = this.node;
            })
        }else{
            this.roundOnline.parent = this.node;
        }
    }
    //
    public clientWin(clientID:string){
        
        if(clientID==constants.clientName){
            //win
            if(this.roundOnline){
                this.roundOnline.getComponent(roundOnline).winRound();
            }
        }else{
            this.roundOnline.getComponent(roundOnline).loseRound();
        }
    }
    //
    private showWinUI(){
        if(!this.winUI){
            resourceUtil.loadPrefab('ui/winUI',(prefab)=>{
                this.winUI = instantiate(prefab);
                this.winUI.getComponent(winUI).setUp(()=>{
                    //next round
                    this.nextRound();
                },()=>{
                    //quit to menu
                    //exit connection
                    this.quitToMenu();
                })
                this.winUI.parent = this.node;
            })
        }else{
            this.winUI.parent = this.node;
        }
    }
    private showLoseUI(){
        if(!this.loesUI){
            resourceUtil.loadPrefab('ui/loseUI',(prefab)=>{
                this.loesUI = instantiate(prefab);
                this.loesUI.getComponent(winUI).setUp(()=>{
                    //next round

                    this.nextRound();
                },()=>{
                    //quit to menu
                    //exit connection
                    this.quitToMenu();
                })
                this.loesUI.parent = this.node;
            })
        }else{
            this.loesUI.parent = this.node;
        }
    }
    private quitToMenu(){
        clientSocket._instance.quitSocket();
        director.loadScene(constants.MENU_SCENE);
    }
    private nextRound(){
        gameData.isHost = true;
        this.lobbyStatus.string='Replay! Please wait your opponent';
        clientSocket._instance.replayMatch();
    }
    //network
    public clientMove(data){
        if(this.roundOnline){
            this.roundOnline.getComponent(roundOnline).clientMove(data);
        }
    }
    public clientChangeTurn(data){
        if(this.roundOnline){
            this.roundOnline.getComponent(roundOnline).clientChangeTurn(data);
        }
    }
    //
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
