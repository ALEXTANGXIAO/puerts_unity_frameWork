import { ILogicSys } from "core/BaseLogicSys";
import { Singleton } from "core/Singleton";
import { UISys } from "Manager/UI/UISys";


export class GameApp<T> extends Singleton<T>{

    constructor() {
        super();
    }

    public Init() {

    }

    private logicList = new Array<ILogicSys>();

    public AddLogicSys(logic: ILogicSys): boolean {
        for (let i = 0; i < this.logicList.length; i++) {
            if (this.logicList[i] == logic) {
                return false;
            }
        }
        this.logicList.push(logic);
        return true;
    }

    public ResigterSystem() {
        this.AddLogicSys(UISys.Instance(UISys));
    }

    //#region 生命周期
    public OnStart() {
        for (let logic of this.logicList) {
            logic.OnStart();
        }
    }

    public OnUpdate(): void {
        for (let logic of this.logicList) {
            logic.OnUpdate();
        }
    }

    public OnLateUpdate(): void {
        for (let logic of this.logicList) {
            logic.OnLateUpdate();
        }
    }

    public OnRoleLogout(): void {
        for (let logic of this.logicList) {
            logic.OnRoleLogout();
        }
    }

    public OnDestroy(): void {
        for (let logic of this.logicList) {
            logic.OnDestroy();
        }
    }
    //#endregion
}