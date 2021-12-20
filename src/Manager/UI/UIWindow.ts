import { UnityEngine } from 'csharp'
import { $typeof } from 'puerts'
import { UIManager } from 'Manager/UI/UIManager'

export class UIWindow {
    public Uiid: number;
    protected m_name: string;
    protected m_go: UnityEngine.GameObject;
    protected m_transform: UnityEngine.RectTransform;
    protected m_parent: UIWindow;
    protected m_canvas: UnityEngine.Canvas;
    protected m_visible: boolean;
    protected m_destroyed: boolean = true;
    public IsDestroyed: boolean = false;

    public get gameObject(): UnityEngine.GameObject {
        return this.m_go;
    }

    public get transform(): UnityEngine.RectTransform {
        return this.m_transform;
    }

    public get name(): string {
        if (this.m_name == null) {
            this.m_name = this.constructor.name;
        }
        return this.m_name;
    }

    public Create(gameObject: UnityEngine.GameObject): boolean {
        if (!this.CreateBase(gameObject)) {
            return false;
        }

        if (this.m_canvas != null) {
            this.m_canvas.overrideSorting = true;
        }

        this.ScriptGenerator();
        this.RegisterEvent();
        this.OnCreate();
        return true;
    }

    protected CreateBase(gameObject: UnityEngine.GameObject): boolean {
        if (!this.m_destroyed) {
            return false;
        }

        if (gameObject == null) {
            return false;
        }

        this.m_destroyed = false;

        this.m_go = gameObject;

        this.m_transform = gameObject.transform as UnityEngine.RectTransform; //.GetComponent($typeof(UnityEngine.RectTransform));

        this.m_canvas = gameObject.GetComponent($typeof(UnityEngine.Canvas)) as UnityEngine.Canvas;

        return true;
    }

    public Show(visible: boolean = true) {
        if (this.m_destroyed || this.gameObject == null) {
            return;
        }
        if (this.m_visible != visible) {
            this.m_visible = visible;
            if (visible) {
                this.gameObject.SetActive(true);
                this.OnVisible();
            }
            else {
                this.Hide();
                if (this.gameObject == null) {
                    UnityEngine.Debug.LogError("ui bug, hiden destory gameobject: " + this.m_name);
                }
                else {
                    this.gameObject.SetActive(false);
                }
            }
        }
    }

    public CloseWindow() {
        this.gameObject.SetActive(false);
    }

    public Close() {
        UIManager.Instance(UIManager).CloseWindow(this);
    }

    protected ScriptGenerator() {

    }

    protected RegisterEvent() {

    }

    protected OnCreate() {

    }

    public Update(): boolean {
        if (!this.m_visible || this.m_destroyed) {
            return false;
        }

        if (this.m_go.activeSelf == false) {
            return false;
        }

        this.OnUpdate();

        return true;
    }

    protected OnUpdate() {

    }

    public Hide() {

    }

    protected OnVisible() {

    }

    protected OnDestroy() {

    }
}