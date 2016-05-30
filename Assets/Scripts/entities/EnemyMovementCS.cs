using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;

public class EnemyMovementCS : MonoBehaviour {

	public static bool[,] north;     // is there a wall to north of cell i, j
	public static bool[,] east;
	public static bool[,] south;
	public static bool[,] west;
	public static int N;
	public static bool doorsOpen;

	float speed;
	private Image enemyDetector;
	private Canvas interfacePlayer;

	//0: Left, 1: Right, 2: Up, 3: Down
	private int direction;
	private bool makeDirection;
	private Vector3 startPosition;
	private Vector3 endPosition;
	//Time when the movement started
	private float startTime;
	//Total distance between the positions
	private float journeyLenght;

	private Transform target;
	private RectTransform imageRectTransform;
	private Image ownEnemyDetector;
	public int nearDistance;
	public int runDistance;
	public int attackDistance;

	//States
	private bool running;
	private bool walking;
	private bool attacking;
	private Animator anim;

	private bool delete;

	void Start () {
		GameObject player = GameObject.FindGameObjectWithTag("Player");
		target = player.transform;

		enemyDetector =  GameObject.Find("EnemyNearImage").GetComponent<Image>();
		interfacePlayer =  GameObject.Find("InterfacePlayer").GetComponent<Canvas>();

		ownEnemyDetector = (Image) GameObject.Instantiate(enemyDetector, new Vector3(0,0,0), Quaternion.Euler(0, 0, 0));
		ownEnemyDetector.transform.SetParent(interfacePlayer.transform);
		ownEnemyDetector.transform.localPosition = new Vector3(0,0,0);
		ownEnemyDetector.transform.localScale = new Vector3(1,1,1);
		ownEnemyDetector.transform.localRotation = Quaternion.Euler(0, 0, 0);

		imageRectTransform = ownEnemyDetector.GetComponent<RectTransform>();

		direction = -1;
		makeDirection = true;

		anim = GetComponentInChildren<Animator>();
		running = false;
		walking = true;
		attacking = false;
		SendMessage("Walk");
	}

	void Update () {

		//Set the rotation to follow the enemy
		setImageDetector();

		//Set animation depending on distance
		setAnimation();

		if (makeDirection) {
			makeDirection = false;
			startTime = Time.time;
			calculeNewDirection();
			startPosition = transform.position;
			float x = transform.position.x;
			float z = transform.position.z;
			x = x/10;
			z = z/10;

			Vector3 euler = transform.eulerAngles;
			switch (direction)	{
				case 0:
					endPosition = new Vector3 (10 * (x - 1), 0, 10 * z);
					transform.eulerAngles = new Vector3(euler.x, 90.0f,euler.z);
					break;
				case 1:
					endPosition = new Vector3(10*(x+1),0,10*z);
					transform.eulerAngles = new Vector3(euler.x, 270.0f,euler.z);
					break;
				case 2:
					endPosition = new Vector3(10*x,0,10*(z+1));
					transform.eulerAngles = new Vector3(euler.x, 180.0f,euler.z);
					break;
				case 3:
					endPosition = new Vector3(10*x,0,10*(z-1));
					transform.eulerAngles = new Vector3(euler.x, 0.0f,euler.z);
					break;
				default:
					break;
			}

			journeyLenght = Vector3.Distance(startPosition, endPosition);
		}

		//Distance moved
		float distCovered = (Time.time - startTime) * speed;
		//Fraction of journey covered
		float fracJourney = distCovered / journeyLenght;

		transform.position = Vector3.Lerp(startPosition, endPosition, fracJourney);
		if (transform.position == endPosition) makeDirection = true;
	}

	void setImageDetector(){
		float xRot = imageRectTransform.eulerAngles.x;
		float yRot = imageRectTransform.eulerAngles.y;
		imageRectTransform.LookAt(transform);
		imageRectTransform.eulerAngles.Set(xRot,yRot,-imageRectTransform.localEulerAngles.y);

		if (Vector3.Distance(target.position, transform.position) < nearDistance){
			ownEnemyDetector.color = new Color(1.0f,0.0f,0.0f,1-Vector3.Distance(target.position, transform.position)/nearDistance);
		}
		else {
			ownEnemyDetector.color = new Color(1.0f,0.0f,0.0f,0.0f);
		}
	}

	void setAnimation(){
		if (Vector3.Distance(target.position, transform.position) < attackDistance){
			if (!anim.GetBool("LowKick") && !anim.GetBool("HitStrike")){
				attacking = false;
			}
			if (!attacking) {
				running = false;
				walking = false;
				attacking = true;
				int r = Random.Range(0,2);
				if (r == 1) this.SendMessage("LowKick");
				else this.SendMessage("Strike");
			}
		}
		else if (Vector3.Distance(target.position, transform.position) < runDistance){
			if (!anim.GetBool("isRun")){
				running = false;
			}
			if (!running) {
				running = true;
				walking = false;
				attacking = false;
				this.SendMessage("Run");
			}
		}
		else {
			if (!anim.GetBool("isWalk")){
				walking = false;
			}
			if (!walking) {
				running = false;
				walking = true;
				attacking = false;
				this.SendMessage("Walk");
			}
		}
	}

	void calculeNewDirection() {
		int x =(int) transform.position.x;
		int z =(int) transform.position.z;
		x = x/10;
		z = z/10;

		List<int> posibilities = new List<int>();
		if (!west[x,z]) {
			//Check if there isn't a room on the other side
			if (!(north[x-1,z] && south[x-1,z] && west[x-1,z]))
				posibilities.Add(0);
		}
		if (!east[x,z]) {
			if (!(north[x+1,z] && south[x+1,z] && east[x+1,z]))
				posibilities.Add(1);
		}
		if (!north[x,z]) {
			if (!(north[x,z+1] && east[x,z+1] && west[x,z+1]))
				posibilities.Add(2);
		}
		if (!south[x,z]) {
			if (!(south[x,z-1] && east[x,z-1] && west[x,z-1]))
				posibilities.Add(3);
		}

		//set the direction if only 1 posibility
		if (posibilities.Count == 1) {
			direction = posibilities[0];
			return;
		}

		//set the direction towards the player
		if (running) {
			float x2 = target.position.x;
			float z2 = target.position.z;
			x2 = x2/10;
			z2 = z2/10;

			//Debug.Log("X "+x.ToString() + " X2 "+x2.ToString() + " Z "+z.ToString() + " Z2 "+z2.ToString());
			if (x < x2 && posibilities.Contains(1)) {
				direction = 1;
				return;
			}
			else if (x > x2 && posibilities.Contains(0)) {
				direction = 0;
				return;
			}
			else if (z < z2 && posibilities.Contains(2)) {
				direction = 2;
				return;
			}
			else if (z > z2 && posibilities.Contains(3)) {
				direction = 3;
				return;
			}
		}

		//unset moving back direction
		if (direction == 0 && posibilities.Contains(1)) posibilities.Remove(1);
		if (direction == 1 && posibilities.Contains(0)) posibilities.Remove(0);
		if (direction == 2 && posibilities.Contains(3)) posibilities.Remove(3);
		if (direction == 3 && posibilities.Contains(2)) posibilities.Remove(2);

		int index = Random.Range(0,posibilities.Count);
		int newDirection = posibilities[index];

		direction = newDirection;
	}

	void deleteDetector(){
		Destroy(ownEnemyDetector);
		Destroy(gameObject);
	}
}
