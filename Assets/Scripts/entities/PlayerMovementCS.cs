using UnityEngine;
using UnityEngine.UI;

public class PlayerMovementCS : MonoBehaviour{
	
	public static bool[,] north;     // is there a wall to north of cell i, j
	public static bool[,] east;
	public static bool[,] south;
	public static bool[,] west;
	public static int N;
	public static bool doorsOpen;

	public float incVelocity=6f;
	public float runDecreaseVelocity=4f;

	public float speed = 6f;
	public float RotateSpeed = 300f;
	public float runTime = 20f;

	public Slider runSlider;

	private Vector3 movement;
	private Animator anim;
	private Rigidbody playerRigidbody;
	public Transform head;
	public Transform leftCamera;
	private int floorMask;
	private float camRayLength=100f;
	private float angle=0f;
	private float runCounter;
	private bool run=false;
	public bool canMove=true;

	void Awake(){
		floorMask = LayerMask.GetMask ("Floor");
		anim = GetComponent<Animator> ();
		playerRigidbody = GetComponent<Rigidbody> ();
		runCounter = runTime;
	}

	void FixedUpdate(){
		float v = BluetoothReceiver.getInstance().getYAxis();
		float h = BluetoothReceiver.getInstance().getXAxis();
	
		Move(h,v);
		Animating(h,v);
	}

	void Move(float h,float v){
		if (canMove && (v != 0 || h!=0)) {
			Vector3 forward = head.transform.forward;
			Vector3 movement = Quaternion.AngleAxis(head.eulerAngles.y,Vector3.up) * new Vector3 (h,0f,v);

			float realSpeed = speed;

			//Run script
			if (BluetoothReceiver.getInstance ().getBtn1Pressed () && runCounter > 0) {
				runCounter -= Time.deltaTime * runDecreaseVelocity;
				realSpeed += incVelocity;
				run = true;
			} else
				run = false;

			movement = movement.normalized * realSpeed * Time.deltaTime;
			playerRigidbody.MovePosition (movement);

			playerRigidbody.MovePosition (transform.position + movement);
		}
		//Update run status
		if (!run && runCounter < runTime) 
			runCounter += Time.deltaTime;
		runSlider.value = runCounter / runTime;
	}

	public float GetRunCounter(){
		return runCounter;
	}

	public float getRunTime(){
		return runTime;
	}

	void Animating(float h, float v){
		bool walking = (h != 0f || v != 0f);
		anim.SetBool ("IsWalking", walking);
	}
}
