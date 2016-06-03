using UnityEngine;
using System.Collections;

public class NoVrMovemnet : MonoBehaviour {

	private bool vrEnabled;
	public float speed = 20f;

	private float angle;
	public Transform player;


	// Use this for initialization
	void Start () {
		angle = 0f;
	}
	
	// Update is called once per frame
	void Update () {
		vrEnabled = BluetoothReceiver.getInstance ().isAndroidActive ();
		Debug.Log ("vrEnabled: " + vrEnabled + " yValue: " + Input.GetAxis ("Mouse Y"));
		if (!vrEnabled) {
			angle += Input.GetAxis ("Mouse X");
			transform.position = player.position;
			transform.rotation = Quaternion.Euler(new Vector3 (0f, angle * speed, 0f));
		}
	
	}
}
