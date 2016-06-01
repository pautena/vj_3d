using UnityEngine;
using System.Collections;

public class HeartScriptCS : MonoBehaviour {
	public float speedRotation = 200f;
	public GameObject heartTexture;
	public float healthValue=20f;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		transform.Rotate(0, Time.deltaTime*speedRotation, 0 );
	}

	void OnTriggerEnter(Collider col){
		if (col.tag == "Player") {
			col.gameObject.GetComponent<PlayerHealth> ().RestoreHealth (healthValue);
			Destroy (gameObject);
			Destroy (heartTexture);
		}
	}
}
