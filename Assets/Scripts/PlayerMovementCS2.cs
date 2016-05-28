using UnityEngine;
using System.Collections;

public class PlayerMovementCS2 : MonoBehaviour {
	public static bool[,] north;     // is there a wall to north of cell i, j
	public static bool[,] east;
	public static bool[,] south;
	public static bool[,] west;
	public static int N;
	public static bool doorsOpen;

	public Rigidbody rb;

	public float normalSpeed;
	public float fastSpeed;

	//0: Left, 1: Right, 2: Up, 3: Down
	private int direction;
	private bool makeMovement;
	private Vector3 startPosition;
	private Vector3 endPosition;
	private bool dontMove;
	//Time when the movement started
	private float startTime;
	//Total distance between the positions
	private float journeyLenght;
	private Vector3 auxEnd;
	private Vector3 auxStart;
	private bool changedDirection;
	private int oldDirection;

	private float speed;

	public int runTime;
	private float runCounter;

	// Use this for initialization
	void Start () {
		rb = GetComponent<Rigidbody> ();
		dontMove = false;
		changedDirection = false;
		direction = -1;
		makeMovement = true;
		doorsOpen = false;

		speed = normalSpeed;

		runCounter = runTime;
	}

	void Update () {

		float percent = 450*(runCounter)/runTime;
		GameObject.Find("ProgressRun").SendMessage("SetFillerSize",percent);

		//Right button
		if (Input.GetMouseButton(1)){
			startPosition = transform.position;
			startTime = Time.time;
			journeyLenght = Vector3.Distance(startPosition, endPosition);
			if (runCounter < runTime) runCounter += Time.deltaTime;
			return;
		}

		//Left button
		if (Input.GetMouseButton(0)){
			if (runCounter > 0) {
				runCounter -= Time.deltaTime * 4;
				if (speed != fastSpeed) {
					speed = fastSpeed;
					startPosition = transform.position;
					startTime = Time.time;
					journeyLenght = Vector3.Distance(startPosition, endPosition);
				}
			}
			else {
				if (speed != normalSpeed) {
					speed = normalSpeed;
					startPosition = transform.position;
					startTime = Time.time;
					journeyLenght = Vector3.Distance(startPosition, endPosition);
				}
			}
		}
		else {
			if (speed != normalSpeed) {
				speed = normalSpeed;
				startPosition = transform.position;
				startTime = Time.time;
				journeyLenght = Vector3.Distance(startPosition, endPosition);
			}

			if (runCounter < runTime) runCounter += Time.deltaTime;
		}

		MovePlayer (GameObject.Find ("Head").transform.forward);
	}

	private void MovePlayer(Vector3 forward){
		Vector3 movement = new Vector3 (forward.x, 0f, forward.z);
		movement = movement.normalized * speed * Time.deltaTime;
		Debug.Log("pre transform: "+transform.position);
		rb.MovePosition (movement);
		Debug.Log("post transform: "+transform.position+", valid: "+checkIfValid (transform.position));
	}

	int getOnlyDirection(){
		int direction;
		float angle = Quaternion.Angle(Quaternion.Euler(new Vector3(0,0,0)),transform.rotation);
		if (0.0 <= angle && angle < 45.0) {
			direction = 2;
		}
		else if (45.0 <= angle && angle < 135.0) {
			if (transform.eulerAngles.y < 180) direction = 1;
			else direction = 0;
		}
		else {//if (135.0 <= angle && angle < 225.0) {
			direction = 3;
		}
		return direction;
	}

	bool checkIfValid(Vector3 position){
		int x = Mathf.FloorToInt(position.x/10);
		int z = Mathf.FloorToInt(position.z/10);

		Debug.Log ("matrix pos-> x: "+x+", z:"+z);

		switch (direction) {
			case 3:
				if (!west[x,z]) {
					//Check if there isn't a room on the other side
					if (doorsOpen) return true;

					if (!(north[x-1,z] && south[x-1,z] && west[x-1,z]))
						return true;
					else return false;
				}
				break;
			case 1:
				if (!east[x,z]) {
					if (doorsOpen) return true;
					if (!(north[x+1,z] && south[x+1,z] && east[x+1,z]))
						return true;
					else return false;
				}
				break;
			case 0:
				if (!north[x,z]) {
					//Check if there isn't a room on the other side
					if (doorsOpen) return true;

					if (!(north[x,z+1] && east[x,z+1] && west[x,z+1]))
						return true;
					else return false;
				}
				break;
			case 2:
				if (!south[x,z]) {
					//Check if there isn't a room on the other side
					if (doorsOpen) return true;

					if (!(south[x,z-1] && east[x,z-1] && west[x,z-1]))
						return true;
					else return false;
				}
				break;
			default:
				break;
		}
		return false;
	}
}
