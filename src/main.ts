if (!PRODUCTION) {
	require('addons/source-map-support.unity.js');
	console.STACK_REMAP = (path) => {
		let r = path.replace('Assets/StreamingAssets/scripts/webpack:///', '');
		r = r.replace('webpack-internal:///./', '');
		return r;
	};
}

import { UIManager } from "./Manager/UI/UIManager";
import { UnityEngine } from 'csharp'
import { LoginUI } from 'UI/LoginUI'
import { GameApp } from 'Manager/GameApp';
import { UISys } from "Manager/UI/UISys";

interface IScriptLauncher {
	JS_start(): void;
	JS_fixedUpdate(delta: number): void;
	JS_lateUpdate(delta: number): void;
	JS_update(delta: number): void;
	JS_finalize(): void;
}

export default function main(lancher: IScriptLauncher) {
	return new JavaScriptApplication(lancher);
}

class JavaScriptApplication {
	private static $inst: JavaScriptApplication;
	public static get inst(): JavaScriptApplication { return this.$inst; }
	constructor(readonly launcher: IScriptLauncher) {
		JavaScriptApplication.$inst = this;
		launcher.JS_start = this.start.bind(this);
		launcher.JS_fixedUpdate = this.fixedUpdate.bind(this);
		launcher.JS_update = this.update.bind(this);
		launcher.JS_lateUpdate = this.lateUpdate.bind(this);
		launcher.JS_finalize = this.finalize.bind(this);
		console.log(`已启动 JavaScript 虚拟机`);
		this.initialize();
	}

	private initialize() {
		var gamApp = GameApp.Instance(GameApp);
		gamApp.AddLogicSys(UISys.Instance(UISys));
		UIManager.Instance(UIManager);
		console.log(`initialize`);
	}

	private start() {
		console.log(`start`);
		GameApp.Instance(GameApp).OnStart();

		var loginUI = UIManager.Instance(UIManager).ShowWindow<LoginUI>(LoginUI);
	}

	private fixedUpdate(delta: number) {

	}

	private update(delta: number) {
		WebAPI.tick();
		GameApp.Instance(GameApp).OnUpdate();
	}

	private lateUpdate(delta: number) {
		GameApp.Instance(GameApp).OnLateUpdate();
	}

	private finalize() {
		WebAPI.finalize();
		GameApp.Instance(GameApp).OnDestroy();
		console.log(`关闭 JavaScript 虚拟机`);
	}
}
