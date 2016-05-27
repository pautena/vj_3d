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
		btn1 = jo.Call<bool> ("button1Pressed");
		btn2 = jo.Call<bool> ("button2Pressed");
		btn3 = jo.Call<bool> ("button3Pressed");
		btn4 = jo.Call<bool> ("button4Pressed");
		buttonJoystick = jo.Call<bool> ("buttonJoystickPressed");

		xAxis = Mathf.Abs(1024-jo.Call<int>("getXJoystick"));
		yAxis = jo.Call<int>("getYJoystick");
	}

	public void viber(){
		jo.Call ("viber");
	}

	public void viber(float time){
		viber();
		ExecuteAfterTime (time);
	}

	IEnumerator ExecuteAfterTime(float time){
		yield return new WaitForSeconds(time);
		viber();
	}
	
	public bool getBtn1Pressed(){
		return btn1;
	}

	public bool getBtn2Pressed(){
		return btn2;
	}

	public bool getBtn3Pressed(){
		return btn3;
	}

	public bool getBtn4Pressed(){
		return btn4;
	}

	public bool getButtonJoystickPressed(){
		return buttonJoystick;
	}

	public int getXAxis(){
		int aux = xAxis - 512;
		if (Mathf.Abs (aux) < minToMove)
			return 0;
		return aux;
	}

	public int getYAxis(){
		int aux = yAxis - 512;
		if (Mathf.Abs (aux) < minToMove)
			return 0;
		return aux;
	}
		
}

