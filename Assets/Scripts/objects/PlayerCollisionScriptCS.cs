using UnityEngine;
using System.Collections;

public abstract class PlayerCollisionScriptCS : MonoBehaviour {

	protected GameObject player;
	protected bool isPicked;

	// Use this for initialization
	public void Start () {
		isPicked = false;
		if (player == null) {
			player=GameObject.Find ("player");
		}
	}

	void OnCollisionEnter(Collision col){
		if (col.gameObject.tag == "Player"){
			OnPlayerCollision ();
		}
	}

	public void OnTriggerEnter(Collider col){
		if (col.gameObject.tag == "Player" && !isPicked){
			isPicked = true;
			OnPlayerCollision ();
		}
	}

	public abstract void OnPlayerCollision();
}
