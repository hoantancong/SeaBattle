
import { _decorator, Component, Node, instantiate, director } from 'cc';
import { constants } from './constants';
import { resourceUtil } from './framework/resourceUtil';
import { gameData } from './gameData';
import { DeployShipMap } from './gameplay/DeployShipMap';
import { roundBattle } from './gameplay/roundBattle';
import { gameLogic } from './logic/gameLogic';
import { winUI } from './ui/winUI';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = gameController
 * DateTime = Fri Mar 18 2022 12:50:01 GMT+0700 (Indochina Time)
 * Author = hoantancong
 * FileBasename = gameController.ts
 * FileBasenameNoExtension = gameController
 * URL = db://assets/script/gameController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('gameController')
export class gameController extends Component {
    // [1]
    //
    //
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    private selectedMap:Node | null = null;
    private roundBattle:Node | null = null;
    private winUI:Node | null = null;
    private loesUI:Node | null = null;
    start () {
        // [3]
        //show selected map
        gameData.isOnlineGame=false;
        this.preloadAssets();
        this.showSelectedMap();
    }
    private preloadAssets(){
        resourceUtil.preloadPrefab('game/roundBattle')
        resourceUtil.preloadPrefab('ui/winUI')
    }
    private showSelectedMap(){
        if(!this.selectedMap){
            //init
            resourceUtil.loadPrefab('game/deployShipNode',(prefab)=>{
                //init
                this.selectedMap = instantiate(prefab);
                this.selectedMap.getComponent(DeployShipMap).setUp(()=>{
                    this.startBattle();
                });
                this.selectedMap.parent = this.node;

            })
        }else{
            this.selectedMap.parent = this.node;
        }
    }
    private startBattle(){
        //1.generate friend map
        gameLogic.generateFriendMap();
        //2. show map
        if(!this.roundBattle){
            resourceUtil.loadPrefab('game/roundBattle',(prefab)=>{
                this.roundBattle = instantiate(prefab);
                this.roundBattle.getComponent(roundBattle).setupCallback(
                    ()=>{
                        this.showWinUI();
                    },
                    ()=>{
                        this.showLoseUI();
                    }
                )
                this.roundBattle.parent = this.node;
            })
        }else{
            this.roundBattle.parent = this.node;
        }
    }
    private showWinUI(){
        if(!this.winUI){
            resourceUtil.loadPrefab('ui/winUI',(prefab)=>{
                this.winUI = instantiate(prefab);
                this.winUI.getComponent(winUI).setUp(()=>{
                    //next round
                    this.winUI.removeFromParent();
                    this.nextRound();
                },
                ()=>{
                    director.loadScene(constants.MENU_SCENE);
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
                    this.loesUI.removeFromParent();
                    this.nextRound();
                },
                ()=>{
                    director.loadScene(constants.MENU_SCENE);
                })
                this.loesUI.parent = this.node;
            })
        }else{
            this.loesUI.parent = this.node;
        }
    }
    private nextRound(){
        this.showSelectedMap();
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
