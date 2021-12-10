using Puerts;
using UnityEngine;

public class GameApp : UnitySingleton<GameApp>
{
    public enum DEV_MODE
    {
        FWK,
        DEV,
        PRO
    }

    public DEV_MODE Mode = DEV_MODE.FWK;

    void Start()
    {
        PuertsMgr.Instance.Init();
    }

    void Update()
    {

    }

    void OnDestroy()
    {
        PuertsMgr.Instance.DeInit();
    }
}


#if UNITY_EDITOR
[UnityEditor.CustomEditor(typeof(GameApp))]
class JavaScriptLauncherEditor : UnityEditor.Editor
{
    public override void OnInspectorGUI()
    {
        base.DrawDefaultInspector();
        if (UnityEngine.GUILayout.Button("重置调试目录"))
        {
            (target as PuertsMgr).DebuggerRoot = System.IO.Path.Combine(UnityEngine.Application.streamingAssetsPath, "scripts").Replace("\\", "/");
            UnityEditor.SceneManagement.EditorSceneManager.SaveOpenScenes();
            UnityEditor.EditorUtility.SetDirty(target);
        }
        if (UnityEngine.GUILayout.Button("重启"))
        {
            if (UnityEngine.Application.isPlaying)
            {
                //main.Restart();
            }
        }
    }
}
#endif