using UnityEngine;
using System.Collections;

public class CanvasMovement : MonoBehaviour {

	public Transform head;
	private Vector3 offsetPosition;
	private Quaternion offsetRotation;

	// Use this for initialization
	void Start () {
		offsetPosition = transform.position - head.position;
		offsetRotation = transform.rotation;
	
	}
	
	// Update is called once per frame
	void LateUpdate () {
		Vector3 targetPos = head.position + offsetPosition;
		Vector3 angles = new Vector3(transform.eulerAngles.x, head.eulerAngles.y, transform.eulerAngles.z);

		transform.position = RotatePointAroundPivot (targetPos,head.position,angles);
		transform.rotation = head.rotation * offsetRotation;
	}

	private Vector3 RotatePointAroundPivot(Vector3 point ,Vector3 pivot ,Vector3 angles){
		Vector3 dir = point - pivot; // get point direction relative to pivot
		dir = Quaternion.Euler(angles) * dir; // rotate it
		point = dir + pivot; // calculate rotated point
		return point; // return it
	}
}
