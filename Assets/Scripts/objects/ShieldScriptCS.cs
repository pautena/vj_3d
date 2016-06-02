using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class ShieldScriptCS : PlayerCollisionScriptCS {
	public float speedRotation=200f;
	public GameObject shieldTexture;
	private AudioSource audioSource;

	// Use this for initialization
	void Start () {
		base.Start ();
		audioSource = GetComponent<AudioSource> ();
	}
	
	// Update is called once per frame
	void Update () {
		transform.Rotate(0, Time.deltaTime*speedRotation, 0 );
	}

	public override void OnPlayerCollision(){
		PlayerHealth playerHealth = player.GetComponent<PlayerHealth> ();
		if (playerHealth.CanPickShield ()) {
			audioSource.Play ();

			Renderer[] renderers = GetComponentsInChildren<Renderer> ();
			for (int i = 0; i < renderers.Length; ++i) {
				renderers [i].enabled = false;
			}

			Destroy (gameObject, audioSource.clip.length);
			Destroy (shieldTexture);
			GameObject.Find ("ShieldImage").GetComponent<Image> ().color = Color.white;
			playerHealth.PickShield ();
		} else
			isPicked = false;
	}
}
