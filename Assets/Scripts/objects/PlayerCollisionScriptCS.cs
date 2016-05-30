using UnityEngine;
using System.Collections;

public abstract class PlayerCollisionScriptCS : MonoBehaviour {

	protected GameObject player;

	// Use this for initialization
	void Start () {
		if (player == null) {
			player=GameObject.Find ("player");
		}
	}

	void OnCollisionEnter(Collision col){
		if (col.gameObject.tag == "Player"){
			OnPlayerCollision ();
		}
	}

	void OnTriggerEnter(Collider col){
		if (col.gameObject.tag == "Player"){
			OnPlayerCollision ();
		}
	}

	public abstract void OnPlayerCollision();
}
