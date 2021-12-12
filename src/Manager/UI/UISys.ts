import {Singleton} from "../../core/Singleton"
import {UIManager} from "Manager/UI/UIManager"
export class UISys<T> extends Singleton<T>{
    public OnStart() {

	}

    public Update(delta: number) {
        UIManager.Instance(UIManager).Update(delta);
	}

    public Destroy() {

	}
}