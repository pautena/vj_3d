using UnityEngine;
using System.Collections;

public class CameraCardboardFollow : MonoBehaviour {
	public Transform target;

	private Vector3 offsetCamera;
	private float x,y,z;

	// Use this for initialization
	void Start () {
		offsetCamera =transform.position -  target.position;

		x = transform.eulerAngles.x;
		y = transform.eulerAngles.y;
		z = transform.eulerAngles.z;
	}

	// Update is called once per frame
	void Update () {
		//Move camera
		Vector3 targetCamPos = target.position + offsetCamera;
		Vector3 angles = new Vector3(x, target.eulerAngles.y, z);
		transform.position = RotatePointAroundPivot (targetCamPos, target.position, angles);
	}

	private Vector3 RotatePointAroundPivot(Vector3 point ,Vector3 pivot ,Vector3 angles){
		Vector3 dir = point - pivot; // get point direction relative to pivot
		dir = Quaternion.Euler(angles) * dir; // rotate it
		point = dir + pivot; // calculate rotated point
		return point; // return it
	}
}