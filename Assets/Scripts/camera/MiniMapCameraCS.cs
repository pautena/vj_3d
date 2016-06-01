using UnityEngine;
using System.Collections;

public class MiniMapCameraCS : MonoBehaviour {

	public GameObject player;
	private bool generalVision;

	// Use this for initialization
	void Start () {	
		generalVision = false;
	}
	
	// Update is called once per frame
	void Update () {
		if (!generalVision){
			GetComponent<Camera>().orthographicSize = 20;
			Vector3 playerPos = player.transform.position;
			Vector3 camPos = transform.position;
			transform.position = new Vector3(playerPos.x, 
				playerPos.y+30,
				playerPos.z);
		}
	}

	public void ToggleGeneralVision(int N) {
		generalVision = !generalVision;
		transform.position = new Vector3(10*(N+1)/2,30,10*(N+1)/2);
		GetComponent<Camera>().orthographicSize = 10*(N+1)/2;
	}
}
