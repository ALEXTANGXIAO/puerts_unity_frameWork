import {Singleton} from "../../core/Singleton"
import {UnityEngine} from 'csharp'
import {$typeof} from 'puerts'

export class ResourceMgr<T> extends Singleton<T>{
    constructor(){
        super();
    }

    public Load(name: string):UnityEngine.GameObject{
        let res = UnityEngine.Resources.Load(name);

        if(res == null){
            return null;
        }
``
        var gameObject = UnityEngine.GameObject.Instantiate(res);

        gameObject.name = name;

        return gameObject as UnityEngine.GameObject;
    }
}