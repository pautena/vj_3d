using UnityEngine;
using System.Collections;

public class BluetoothReceiver : MonoBehaviour {

	private static BluetoothReceiver receiver;
	public static BluetoothReceiver getInstance(){
		return receiver;
	}

	private AndroidJavaObject jo;
	private bool btn1,btn2,btn3,btn4,buttonJoystick;
	private int xAxis,yAxis;
	public int minToMove=150;

	// Use this for initialization
	void Start () {
		receiver = this;

		Debug.Log ("Call native android code...");

		AndroidJavaClass jc = new AndroidJavaClass("angelshack.com.bluetoothlibrary.ArduinoBluetoothAdapter"); 

		Debug.Log (jc);
		string helloWorld= jc.CallStatic<string>("getHelloWorld");

		jo = jc.CallStatic<AndroidJavaObject> ("initialize");
		Debug.Log (helloWorld);
		jo.Call ("connectHC06");

		bool isConnected = jo.Call<bool> ("isConnected");
		Debug.Log ("isConnected: " + isConnected);
	}
	
	// Update is called once per frame
	void Update () {
		if (jo != null) {
			btn1 = jo.Call<bool> ("button1Pressed");
			btn2 = jo.Call<bool> ("button2Pressed");
			btn3 = jo.Call<bool> ("button3Pressed");
			btn4 = jo.Call<bool> ("button4Pressed");
			buttonJoystick = jo.Call<bool> ("buttonJoystickPressed");

			xAxis = Mathf.Abs (1024 - jo.Call<int> ("getXJoystick"));
			yAxis = jo.Call<int> ("getYJoystick");
		}

	}

	public bool isAndroidActive(){
		return jo != null;
	}

	public void viber(){
		if (isAndroidActive ())
			jo.Call ("viber");
		else
			Debug.Log ("VIBER! (Android not active");
	}

	public void viber(float time){
		if (isAndroidActive ()) {
			viber ();
			ExecuteAfterTime (time);
		}else
			Debug.Log ("VIBER! (Android not active");
	}

	IEnumerator ExecuteAfterTime(float time){
		yield return new WaitForSeconds(time);
		viber();
	}
	
	public bool getBtn1Pressed(){
		if (isAndroidActive ())
			return btn1;
		else
			return Input.GetButton ("Fire1");
	}

	public bool getBtn2Pressed(){
		if (isAndroidActive ())
			return btn2;
		else
			return Input.GetButton ("Fire2");
	}

	public bool getBtn3Pressed(){
		if (isAndroidActive ())
			return btn3;
		else
			return Input.GetButton ("Fire3");
	}

	public bool getBtn4Pressed(){
		if (isAndroidActive ())
			return btn4;
		else
			return Input.GetButton ("Fire4");
	}

	public bool getButtonJoystickPressed(){
		if (isAndroidActive ())
			return buttonJoystick;
		else
			return Input.GetButton ("Fire5");
	}

	public int getXAxis(){
		if (isAndroidActive ()) {
			int aux = xAxis - 512;
			if (Mathf.Abs (aux) < minToMove)
				return 0;
			return aux;
		} else {
			return (int)Input.GetAxis ("Horizontal");
		}
	}

	public int getYAxis(){
		if (isAndroidActive ()) {
			int aux = yAxis - 512;
			if (Mathf.Abs (aux) < minToMove)
				return 0;
			return aux;
		} else {
			return (int)Input.GetAxis ("Vertical");
		}
	}
		
}

