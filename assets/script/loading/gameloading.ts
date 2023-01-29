
import { _decorator, Component, Node, Label, ProgressBar, director,string } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = gameloading
 * DateTime = Thu Mar 17 2022 12:24:12 GMT+0700 (Indochina Time)
 * Author = hoantancong
 * FileBasename = gameloading.ts
 * FileBasenameNoExtension = gameloading
 * URL = db://assets/script/loading/gameloading.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('gameloading')
export class gameloading extends Component {
    @property(Label)
    loadingLbl: Label | null = null;
    @property(ProgressBar)
    loadingProgressBar: ProgressBar | null = null;
    @property({type:string})
    nextSceneName: string | null = 'menu'
    //test
    start () {
        // [3]
        director.preloadScene(this.nextSceneName,(completedCount,totalCount)=>{
            let progress = completedCount/totalCount;
            this.loadingProgressBar.progress = progress;
        },
        ()=>{
            director.loadScene(this.nextSceneName);
        })
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
