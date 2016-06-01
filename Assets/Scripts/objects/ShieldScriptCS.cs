using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class ShieldScriptCS : MonoBehaviour {
	public float speedRotation=200f;
	public GameObject shieldTexture;
	private AudioSource audioSource;

	// Use this for initialization
	void Start () {
		audioSource = GetComponent<AudioSource> ();
	}
	
	// Update is called once per frame
	void Update () {
		transform.Rotate(0, Time.deltaTime*speedRotation, 0 );
	}

	void OnTriggerEnter(Collider col){
		if (col.tag == "Player") {
			PlayerHealth playerHealth = col.gameObject.GetComponent<PlayerHealth> ();
			if (playerHealth.CanPickShield ()) {
				audioSource.Play ();

				Renderer[] renderers = GetComponentsInChildren<Renderer> ();
				for (int i = 0; i < renderers.Length; ++i) {
					renderers [i].enabled = false;
				}

				Destroy (gameObject,audioSource.clip.length);
				Destroy (shieldTexture);
				GameObject.Find ("ShieldImage").GetComponent<Image> ().color = Color.white;
				playerHealth.PickShield ();
			}

		}
	}
}
