
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = winUI
 * DateTime = Fri Mar 18 2022 22:49:39 GMT+0700 (Indochina Time)
 * Author = hoantancong
 * FileBasename = winUI.ts
 * FileBasenameNoExtension = winUI
 * URL = db://assets/script/ui/winUI.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('winUI')
export class winUI extends Component {
    restartCallback = null;
    quitCallback = null;
    setUp(restartCallback,quitCallback) {
        this.restartCallback = restartCallback;
        this.quitCallback = quitCallback;
    }

    public onRestart(){
        if(this.restartCallback){
            this.node.removeFromParent();
            this.restartCallback();
        }
    }
    public onQuitToMenu(){
        if(this.quitCallback){
            this.node.removeFromParent();
            this.quitCallback();
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
