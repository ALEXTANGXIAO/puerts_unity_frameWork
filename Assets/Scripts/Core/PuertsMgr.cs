using System;
using Puerts;
using UnityEngine;

public class PuertsMgr : UnitySingleton<PuertsMgr>
{
	#region 属性
	public delegate void JavaScriptMain(PuertsMgr instance);
	private JsEnv m_JsEnv;
	private bool m_Init;
	public PuertsLoader Loader { get; private set; }
	public string DebuggerRoot = System.IO.Path.Combine(Application.streamingAssetsPath, "scripts");
	public int DebuggerPort = 5556;

	public JsEnv JsEnv
	{
		get
		{
			return m_JsEnv;
		}
	}

	public Action JS_start;
	public Action<float> JS_update;
	public Action<float> JS_fixedUpdate;
	public Action<float> JS_lateUpdate;
	public Action JS_finalize;

	#endregion

	public void Init()
	{
		if (m_Init)
		{
			return;
		}

		m_Init = true;

		if (GameApp.Instance.Mode == GameApp.DEV_MODE.FWK)
		{
			Loader = new PuertsLoader(System.IO.Path.Combine(Application.streamingAssetsPath, "scripts"), DebuggerRoot);
		}
		else if (GameApp.Instance.Mode == GameApp.DEV_MODE.DEV)
		{
			Loader = new PuertsLoader(System.IO.Path.Combine(Application.streamingAssetsPath, "scripts"), DebuggerRoot);
		}
		else if (GameApp.Instance.Mode == GameApp.DEV_MODE.PRO)
		{

		}


		RunScript();
	}

	async void RunScript()
	{
		m_JsEnv = new JsEnv(Loader, DebuggerPort);

		this.RegisterClasses(m_JsEnv);

		if (GameApp.Instance.WaitForDebugger)
		{
			await JsEnv.WaitDebuggerAsync();
		}

		//var a = AssetBundleManager.Instance.GetAssetCache("puerts_scripts", "bootstrap.js.bytes");

		var javascript = m_JsEnv.Eval<JavaScriptMain>("require('bootstrap.js.bytes');", Loader.GetScriptDebugPath("anonymous"));

		if (javascript != null)
		{
			javascript(PuertsMgr.Instance);
		}

		JS_start();
	}

	protected virtual void RegisterClasses(Puerts.JsEnv env)
	{
		env.UsingAction<int>();
		env.UsingAction<float>();
		env.UsingAction<string>();
		env.UsingAction<bool>();
		env.UsingFunc<int>();
		env.UsingFunc<float>();
		env.UsingFunc<string>();
		env.UsingFunc<bool>();
		env.UsingAction<string, string>();
		env.UsingAction<Vector3>();
		env.UsingFunc<Vector3>();
		env.UsingAction<UnityEngine.SceneManagement.Scene, UnityEngine.SceneManagement.LoadSceneMode>();
		env.UsingAction<UnityEngine.SceneManagement.Scene, UnityEngine.SceneManagement.Scene>();
	}

	public void DeInit()
	{
		if (m_JsEnv != null)
		{
			m_JsEnv.Dispose();
		}

		m_Init = false;
	}

	#region 生命周期
	protected void Update()
	{
		if (JsEnv != null)
		{
			JsEnv.Tick();
		}
		if (JS_update != null)
		{
			JS_update(Time.unscaledDeltaTime);
		}
	}

	protected void FixedUpdate()
	{
		if (JS_fixedUpdate != null)
		{
			JS_fixedUpdate(Time.fixedUnscaledDeltaTime);
		}
	}

	protected void LateUpdate()
	{
		if (JS_lateUpdate != null)
		{
			JS_lateUpdate(Time.unscaledDeltaTime);
		}
	}
	protected void OnDestroy()
	{
		if (JS_finalize != null)
		{
			JS_finalize();
		}
		if (Loader != null)
		{
			Loader.Close();
		}
		if (JsEnv != null)
		{
			JsEnv.Dispose();
		}
	}
	#endregion
}
