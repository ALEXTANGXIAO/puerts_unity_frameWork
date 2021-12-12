import {UnityEngine} from 'csharp'
import {$typeof} from 'puerts'
import {UIWindow} from 'Manager/UI/UIWindow'

export class LoginUI extends UIWindow{
    private m_text:UnityEngine.UI.Text;

    protected ScriptGenerator(){
        super.ScriptGenerator();
        this.m_text = this.gameObject.GetComponentInChildren($typeof(UnityEngine.UI.Text)) as UnityEngine.UI.Text;
    }

    protected OnCreate(){
        super.OnCreate();
        this.m_text.text = "Hello World";
    }

    protected OnUpdate(){
        super.OnUpdate();
        // console.log("OnUpdate")
    }
}