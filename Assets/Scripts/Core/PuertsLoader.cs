using System.IO;
using Puerts;
using UnityEngine;


public class PuertsLoader:ILoader
{
    public string DebugRoot { get; private set; }
    public string LocalScriptFolder { get; private set; }

    public PuertsLoader(string localScriptFolder, string debugRoot)
    {
        this.DebugRoot = debugRoot;

        this.LocalScriptFolder = localScriptFolder;
    }
    public bool FileExists(string filepath)
    {
        if (filepath.StartsWith("puerts/")) return true;
#if UNITY_EDITOR
        return System.IO.File.Exists(System.IO.Path.Combine(LocalScriptFolder, filepath));
#else
		return true;
#endif
    }
    public string GetScriptDebugPath(string filepath)
    {
        if (filepath.StartsWith("puerts/"))
        {
            return Path.Combine(Application.dataPath, "Puerts/Src/Resources", filepath).Replace("\\", "/") + ".txt";
        }
        return System.IO.Path.Combine(DebugRoot, filepath).Replace("\\", "/");
    }

    public string ReadFile(string filepath, out string debugpath)
    {
        debugpath = GetScriptDebugPath(filepath);
        if (filepath.StartsWith("puerts/"))
        {
            var asset = UnityEngine.Resources.Load<UnityEngine.TextAsset>(filepath);
            return asset.text;
        }
        return File.ReadAllText(Path.Combine(LocalScriptFolder, filepath));
    }

    public void Close() { }
}
