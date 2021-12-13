using System;
using System.Collections;
using System.IO;
using Boo.Lang;
using UnityEngine;
using UnityEngine.Networking;

	class DownLoadMgr:Singleton<DownLoadMgr>
	{
		public List<string> list = new List<string>();

		public DownLoadMgr()
		{
			list.Add("bootstrap.js.bytes");
			list.Add("bundle.js.bytes");
			list.Add("webapi.js.bytes");
		}

		public string url = "https://tcloud-1258327636.cos.ap-guangzhou.myqcloud.com/uploads/2021/12/13/";

		internal event Action<string> OnDownloadCompleteEvent;
		internal event Action OnDownloadProgressEvent;
		public IEnumerator DownLoad(string desFileName)
		{
			string url1 = url + desFileName;

			UnityWebRequest request = UnityWebRequest.Get(url1);
			yield return request.Send();
			if (request.isDone)
			{
				int packLength = 1024 * 20;
				byte[] data = request.downloadHandler.data;
				int nReadSize = 0;
				byte[] nbytes = new byte[packLength];
				using (FileStream fs = new FileStream(Application.streamingAssetsPath +"/hotfix/" + desFileName, FileMode.Create))
				using (Stream netStream = new MemoryStream(data))
				{
					nReadSize = netStream.Read(nbytes, 0, packLength);
					while (nReadSize > 0)
					{
						fs.Write(nbytes, 0, nReadSize);
						nReadSize = netStream.Read(nbytes, 0, packLength);
						double dDownloadedLength = fs.Length * 1.0 / (1024 * 1024);
						double dTotalLength = data.Length * 1.0 / (1024 * 1024);
						string ss = desFileName + string.Format("已下载 {0:F}M / {1:F}M", dDownloadedLength, dTotalLength);
						//if (OnDownloadProgressEvent != null)
						//{
						//	OnDownloadProgressEvent.Invoke(ss);
						//}
						Debug.Log(ss);
						yield return null;
					}

				}
			}

			if (OnDownloadCompleteEvent != null)
			{
				Debug.Log("download  finished");
				//OnDownloadCompleteEvent.Invoke();
			}
		}
	}
