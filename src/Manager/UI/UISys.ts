import { UIManager } from "Manager/UI/UIManager"
import { BaseLogicSys } from "core/BaseLogicSys";
export class UISys<T> extends BaseLogicSys<T>{
    public OnStart() {
        UIManager.Instance(UIManager).OnStart();
    }

    public OnUpdate() {
        UIManager.Instance(UIManager).OnUpdate();
    }

    public OnDestroy() {
        UIManager.Instance(UIManager).OnDestroy();
    }
}