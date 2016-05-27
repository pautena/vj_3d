using UnityEngine;
using System.Collections;

public class PlayerController : MonoBehaviour {
	private Rigidbody rb ; 

	void Start(){
		rb = GetComponent<Rigidbody> ();
	}

	void FixedUpdate(){
		float moveHoritzontal = Input.GetAxis ("Horizontal");
		float moveVertical = Input.GetAxis ("Vertical");

		Vector3 movement = new Vector3 (moveHoritzontal,0.0f,moveVertical);
		rb.AddForce (movement);
	}
}
