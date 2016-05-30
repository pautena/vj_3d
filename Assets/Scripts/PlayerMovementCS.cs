using UnityEngine;

public class PlayerMovementCS : MonoBehaviour{
	
	public static bool[,] north;     // is there a wall to north of cell i, j
	public static bool[,] east;
	public static bool[,] south;
	public static bool[,] west;
	public static int N;
	public static bool doorsOpen;

	public float incVelocity=6f;

	public float speed = 6f;
	public float RotateSpeed = 300f;

	private Vector3 movement;
	private Animator anim;
	private Rigidbody playerRigidbody;
	public Transform head;
	public Transform leftCamera;
	private int floorMask;
	private float camRayLength=100f;
	private float angle=0f;


	void Awake(){
		floorMask = LayerMask.GetMask ("Floor");
		anim = GetComponent<Animator> ();
		playerRigidbody = GetComponent<Rigidbody> ();
	}

	void FixedUpdate(){
		float v = BluetoothReceiver.getInstance().getYAxis();
	
		Move (0f,v);
		Animating (0f, v);
	}

	void Move(float h,float v){
		if (v != 0) {
			Vector3 forward = head.transform.forward;
			Vector3 movement = new Vector3 (forward.x, 0f, forward.z);


			float realSpeed = speed;
			if (v < 0f) {
				movement *= -1;
			}

			Debug.Log (BluetoothReceiver.getInstance ().getBtn1Pressed ());
			if (BluetoothReceiver.getInstance ().getBtn1Pressed ()) {
				realSpeed += incVelocity;
			}
			
			movement = movement.normalized * realSpeed * Time.deltaTime;
			playerRigidbody.MovePosition (movement);

			playerRigidbody.MovePosition (transform.position + movement);
		}
	}

	void Animating(float h, float v){
		bool walking = (h != 0f || v != 0f);
		anim.SetBool ("IsWalking", walking);
	}
}
