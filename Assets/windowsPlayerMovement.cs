using UnityEngine;
using UnityEngine.UI;

public class windowsPlayerMovement : MonoBehaviour {

	public float incVelocity=6f;
	public float runDecreaseVelocity=4f;

	public float speed = 6f;
	public float RotateSpeed = 300f;
	public float runTime = 20f;
	public float divPoisoned=2f;


	public Slider runSlider;

	private Vector3 movement;
	private Animator anim;
	private Rigidbody playerRigidbody;
	public Transform head;
	public Transform leftCamera;
	public Transform mainCamera;
	private int floorMask;
	private float camRayLength=100f;
	private float angle=0f;
	private float runCounter;
	private bool run=false;
	public bool canMove=true;
	private PlayerAudio playerAudio;
	private PlayerHealth playerHealth;
	private float lastAngle=0f;
	private MouseLook m_MouseLook;

	// Use this for initialization
	void Start () {
		runCounter = runTime;
	}
	
	// Update is called once per frame
	void Update () {
		float realSpeed = speed;

		//Run script
		if (Input.GetKey (KeyCode.LeftShift) && runCounter > 0) {
			runCounter -= Time.deltaTime * runDecreaseVelocity;
			realSpeed += incVelocity;
			run = true;
		} else {
			run = false;
		}

		//Update run status
		if (!run && runCounter < runTime)
			runCounter += Time.deltaTime;
		runSlider.value = runCounter / runTime;
	}
}
