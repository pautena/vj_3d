using UnityEngine;
using System.Collections;

public class BluetoothReceiver : MonoBehaviour {

	private static BluetoothReceiver receiver;
	public static BluetoothReceiver getInstance(){
		return receiver;
	}

	private AndroidJavaObject jo;
	private bool btn1,btn2,btn3,btn4,buttonJoystick;
	private bool downBtn1,downBtn2,downBtn3,downBtn4,downButtonJoystick;
	private int xAxis,yAxis;
	public int minToMove=150;

	// Use this for initialization
	void Start () {
		receiver = this;

		Debug.Log ("Call native android code...");

		AndroidJavaClass jc = new AndroidJavaClass ("angelshack.com.bluetoothlibrary.ArduinoBluetoothAdapter"); 

		Debug.Log (jc);
		string helloWorld = jc.CallStatic<string> ("getHelloWorld");

		jo = jc.CallStatic<AndroidJavaObject> ("initialize");
		Debug.Log (helloWorld);
		jo.Call ("connectHC06");

		bool isConnected = jo.Call<bool> ("isConnected");
		Debug.Log ("isConnected: " + isConnected);
	}
	
	// Update is called once per frame
	void Update () {
		if (jo != null) {
			bool auxBtn1 = jo.Call<bool> ("button1Pressed");
			bool auxBtn2 = jo.Call<bool> ("button2Pressed");
			bool auxBtn3 = jo.Call<bool> ("button3Pressed");
			bool auxBtn4 = jo.Call<bool> ("button4Pressed");
			bool auxButtonJoystick = jo.Call<bool> ("buttonJoystickPressed");

			SetButtonDown (auxBtn1, auxBtn2, auxBtn3, auxBtn4, auxButtonJoystick);
			btn1 = auxBtn1;
			btn2 = auxBtn2;
			btn3 = auxBtn3;
			btn4 = auxBtn4;
			buttonJoystick = auxButtonJoystick;

			xAxis = Mathf.Abs (1024 - jo.Call<int> ("getXJoystick"));
			yAxis = jo.Call<int> ("getYJoystick");
		}

	}

	public void SetButtonDown(bool a1, bool a2, bool a3, bool a4, bool aj){
		if(!btn1 && a1) downBtn1=true;
		else downBtn1=false;

		if(!btn2 && a2) downBtn2=true;
		else downBtn2=false;

		if(!btn3 && a3) downBtn3=true;
		else downBtn3=false;

		if(!btn4 && a4) downBtn4=true;
		else downBtn4=false;

		if(!buttonJoystick && aj) downButtonJoystick=true;
		else downButtonJoystick=false;
	}

	public void Disconnect(){
		if (isAndroidActive ()) {
			jo.Call ("disconnectHC06");
		}
	}

	public bool isAndroidActive(){
		return jo != null;
	}

	private void viber(){
		if (isAndroidActive ())
			jo.Call ("viber");
		else
			Debug.Log ("VIBER! (Android not active");
	}

	public void viber(float time){
		if (isAndroidActive ()) {
			viber ();
			StartCoroutine(ExecuteAfterTime (time));
		}else
			Debug.Log ("VIBER! (Android not active");
	}

	IEnumerator ExecuteAfterTime(float time){
		yield return new WaitForSeconds(time);
		viber();
	}
	
	public bool GetBtn1(){
		if (isAndroidActive ())
			return btn1;
		else
			return Input.GetButton ("Fire1");
	}

	public bool GetBtn2(){
		if (isAndroidActive ())
			return btn2;
		else
			return Input.GetButton ("Fire2");
	}

	public bool GetBtn3(){
		if (isAndroidActive ())
			return btn3;
		else
			return Input.GetButton ("Fire3");
	}

	public bool GetBtn4(){
		if (isAndroidActive ())
			return btn4;
		else
			return Input.GetButton ("Fire4");
	}

	public bool GetButtonJoystick(){
		if (isAndroidActive ())
			return buttonJoystick;
		else
			return Input.GetButton ("Fire5");
	}

	public bool GetBtn1Down(){
		if (isAndroidActive ())
			return downBtn1;
		else
			return Input.GetButtonDown ("Fire1");
	}

	public bool GetBtn2Down(){
		if (isAndroidActive ())
			return downBtn2;
		else
			return Input.GetButtonDown ("Fire2");
	}

	public bool GetBtn3Down(){
		if (isAndroidActive ())
			return downBtn3;
		else
			return Input.GetButtonDown ("Fire3");
	}

	public bool GetBtn4Down(){
		if (isAndroidActive ())
			return downBtn4;
		else
			return Input.GetButtonDown ("Fire4");
	}

	public bool GetButtonJoystickDown(){
		if (isAndroidActive ())
			return downButtonJoystick;
		else
			return Input.GetButtonDown ("Fire5");
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

