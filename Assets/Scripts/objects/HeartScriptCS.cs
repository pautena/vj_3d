using UnityEngine;
using System.Collections;

public class HeartScriptCS : PlayerCollisionScriptCS {
	public float speedRotation = 200f;
	public GameObject heartTexture;
	public float healthValue=20f;

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
		player.GetComponent<PlayerHealth> ().RestoreHealth (healthValue);


		audioSource.Play ();
		Renderer[] renderers = GetComponentsInChildren<Renderer> ();
		for (int i = 0; i < renderers.Length; ++i) {
			renderers [i].enabled = false;
		}
		Destroy (gameObject,audioSource.clip.length);
		Destroy (heartTexture);
	}
}
