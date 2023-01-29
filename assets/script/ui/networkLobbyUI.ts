
import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = networkLobbyUI
 * DateTime = Mon Mar 21 2022 12:19:38 GMT+0700 (Indochina Time)
 * Author = hoantancong
 * FileBasename = networkLobbyUI.ts
 * FileBasenameNoExtension = networkLobbyUI
 * URL = db://assets/script/ui/networkLobbyUI.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('networkLobbyUI')
export class networkLobbyUI extends Component {
    @property(Label)
    status:Label | null = null;
    setStatus(content){
        this.status.string = content;
    }
    setUp(nextCallback){
    
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
