
import { _decorator, Component, Node, Prefab, resources } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = resourceUtil
 * DateTime = Fri Mar 18 2022 14:06:53 GMT+0700 (Indochina Time)
 * Author = hoantancong
 * FileBasename = resourceUtil.ts
 * FileBasenameNoExtension = resourceUtil
 * URL = db://assets/script/framework/resourceUtil.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('resourceUtil')
export class resourceUtil {
    // [1]
    public static preloadPrefab(path:string){
        resources.preload(path,()=>{
            console.log(path,'preload success!');
        });
    }
    public static loadPrefab(path:string,callback){
        resources.load(path,(error,prefab)=>{
            if(!error){
                callback(prefab);
            }
        });
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
