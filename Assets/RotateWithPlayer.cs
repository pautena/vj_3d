using UnityEngine;
using System.Collections;

public class RotateWithPlayer : MonoBehaviour {

	public Transform head;
	private Vector3 originalRotation;

	

	// Use this for initialization
	void Start () {
		originalRotation = transform.eulerAngles;
	}
	
	// Update is called once per frame
	void Update () {
		Vector3 rotation = originalRotation;
		rotation.y = head.eulerAngles.y;
		transform.rotation = Quaternion.Euler(rotation);
	}
}
