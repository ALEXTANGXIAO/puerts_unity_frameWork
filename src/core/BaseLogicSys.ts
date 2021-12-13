export interface ILogicSys {
    OnInit(): boolean;
    OnStart(): void;
    OnUpdate(): void;
    OnLateUpdate(): void;
    OnRoleLogout(): void;
    OnPause(): void;
    OnResume(): void;
    OnDestroy(): void;
}

export class BaseLogicSys<T> implements ILogicSys {

    private static m_instance: any = null;
    public static Instance<T>(tp: { new(): T }): T {
        if (!this.m_instance) {
            this.m_instance = new tp();
        }
        return this.m_instance;
    }

    //#region 生命周期
    public OnInit(): boolean {

        return true;
    }

    public OnDestroy() {

    }

    public OnStart(): void {

    }

    public OnUpdate(): void {

    }

    public OnLateUpdate(): void {

    }

    public OnRoleLogout(): void {

    }

    public OnResume(): void {

    }

    public OnPause(): void {

    }
    //#endregion
}