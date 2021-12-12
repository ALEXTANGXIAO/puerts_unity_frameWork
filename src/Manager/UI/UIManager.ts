import {Singleton} from "../../core/Singleton"
import { ResourceMgr } from "Manager/Resource/ResourceMgr";
import {UnityEngine} from 'csharp'
import {UIWindow} from 'Manager/UI/UIWindow'
import {System} from 'csharp'
import {$typeof} from 'puerts'


export enum UI_Layer {
    Bottom,
    Mid,
    Top,
    System,
}

export class UIManager<T> extends Singleton<T>{
    public canvas: UnityEngine.RectTransform

    private bottom: UnityEngine.Transform
    private mid: UnityEngine.Transform
    private top: UnityEngine.Transform
    private system: UnityEngine.Transform
    private uiid:number;
    // private listWindows:System.Collections.Generic.List$1<UIWindow> = new System.Collections.Generic.List$1<UIWindow>();

    constructor(){
        super();
        // console.log("UIManager")
        // let gameObject = new UnityEngine.GameObject('UIRoot');
        // UnityEngine.GameObject.DontDestroyOnLoad(gameObject);

        let CanvasGameObject =  ResourceMgr.Instance(ResourceMgr).Load("UI/Canvas");
        UnityEngine.GameObject.DontDestroyOnLoad(CanvasGameObject);

        let EventSystem = ResourceMgr.Instance(ResourceMgr).Load("UI/EventSystem");
        UnityEngine.GameObject.DontDestroyOnLoad(EventSystem);
        
        this.canvas = CanvasGameObject.transform as UnityEngine.RectTransform;
        this.bottom = this.canvas.Find("Bottom");
        this.mid = this.canvas.Find("Mid");
        this.top = this.canvas.Find("Top");
        this.system = this.canvas.Find("System");
    }

    public ShowWindow<T extends UIWindow>(c: new () => T):T{
        let window = new c as T;
        let typeName = "LoginUI";
        if (!this.CreateWindowByType(window, typeName)){
            {
                return null;
            }
        }
        // this.listWindows.Add(window);
        window.Show();
        return window as T;
    }

    private CreateWindowByType(window:UIWindow,typeName: string):boolean {
        let resPath = "UI/" + typeName;
        let gameObject = ResourceMgr.Instance(ResourceMgr).Load(resPath);
        if(gameObject == null){
            UnityEngine.Debug.LogError("CreateWindowByType failed, " + typeName + resPath);
            return false;
        }
        gameObject.name = typeName;
        this.uiid++;
        window.Uiid = this.uiid;
        gameObject.transform.SetParent(this.bottom);
        let rectTransform = gameObject.transform as UnityEngine.RectTransform;

        rectTransform.localPosition = new UnityEngine.Vector3(0, 0, 0);
        rectTransform.localRotation = UnityEngine.Quaternion.identity;
        rectTransform.localScale = UnityEngine.Vector3.one;
        rectTransform.SetInsetAndSizeFromParentEdge(UnityEngine.RectTransform.Edge.Left, 0, 0);
        rectTransform.SetInsetAndSizeFromParentEdge(UnityEngine.RectTransform.Edge.Top, 0, 0);
        rectTransform.anchorMin = UnityEngine.Vector2.zero;
        rectTransform.anchorMax = UnityEngine.Vector2.one;

        if (!window.Create(gameObject))
        {
            UnityEngine.Debug.LogError("window create failed, typeName: "+ typeName);
            if (gameObject != null)
            {
                UnityEngine.Object.Destroy(gameObject);
            }
            return false;
        }
        return true;
    }

    public Init(){
        
    }

    private OnStart() {

	}

    private Update(delta: number) {
        
	}

    private Destroy() {

	}
}