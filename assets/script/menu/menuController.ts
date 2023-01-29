
import { _decorator, Component, Node, director, instantiate } from 'cc';
import { constants } from '../constants';
import { resourceUtil } from '../framework/resourceUtil';
import { clientSocket } from '../network/clientSocket';
import { networkLobbyUI } from '../ui/networkLobbyUI';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = menuController
 * DateTime = Fri Mar 18 2022 12:40:03 GMT+0700 (Indochina Time)
 * Author = hoantancong
 * FileBasename = menuController.ts
 * FileBasenameNoExtension = menuController
 * URL = db://assets/script/menu/menuController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('menuController')
export class menuController extends Component {


    start() {
        // preload
        director.preloadScene(constants.GAME_SCENE, (completedCount, totalCount) => {
        })
        director.preloadScene(constants.ONLINE_GAME_SCENE, (completedCount, totalCount) => {
        })
    }
    public loadGameScene() {
        director.loadScene(constants.GAME_SCENE);
    }
    public joinGame() {
        director.loadScene(constants.ONLINE_GAME_SCENE);

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
