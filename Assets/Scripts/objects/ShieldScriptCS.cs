using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class ShieldScriptCS : MonoBehaviour {
	public float speedRotation=200f;
	public GameObject shieldTexture;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		transform.Rotate(0, Time.deltaTime*speedRotation, 0 );
	}

	void OnTriggerEnter(Collider col){
		Debug.Log ("OnTriggerEnter: " + col.tag);
		if (col.tag == "Player") {
			PlayerHealth playerHealth = col.gameObject.GetComponent<PlayerHealth> ();
			if (playerHealth.CanPickShield ()) {
				Destroy (gameObject);
				Destroy (shieldTexture);
				GameObject.Find ("ShieldImage").GetComponent<Image> ().color = Color.white;
				playerHealth.PickShield ();
			}

		}
	}
}
