using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class LevelControllerCS : MonoBehaviour {
	public static int N;

	public Text pointsCanvas;
	public Text livesCanvas;
	public Image keyCanvas;
	public Image shieldCanvas;
	public Image smokeCanvas;
	public RawImage mapCanvas;
	public int points;
	public int lives;

	public int timePowerUp;
	public Camera cameraPlayer;
	public Camera cameraMap;

	public float timeSmoke;
	private float smokeCounter;
	private bool smoked;

	private bool keyCollected;

	private bool paused;

	void Start () {
		pointsCanvas.text = points.ToString();
		livesCanvas.text = lives.ToString();

		smokeCounter = 0;

		keyCollected = false;
		paused = false;
	}

	void Update () {
		if (smoked) {
			smokeCounter += Time.deltaTime;
			float transparency = (timeSmoke-smokeCounter)/timeSmoke;
			smokeCanvas.color = new Color(0,1,0,transparency);
			if (smokeCounter > timeSmoke) {
				smokeCounter = 0;
				smoked = false;
			}
		}

		if (keyCollected) {
			Destroy(GameObject.Find("Door_B"));
			Destroy(GameObject.Find("Door_C"));
		}

		//Pause the game and set the map
		if (Input.GetKeyDown("tab")){
			if (!paused) {
				Time.timeScale = 0;
				mapCanvas.color = new Color(1,1,1,1);
				GameObject.Find("PanelMap").GetComponent<Image>().color = new Color(0,0,0,1);
			}
			else {
				mapCanvas.color = new Color(1,1,1,0);
				GameObject.Find("PanelMap").GetComponent<Image>().color = new Color(0,0,0,0);
				Time.timeScale = 1;
			}
			paused = !paused;
			cameraMap.SendMessage("toggleGeneralVision",N);
		}
	}

	void collectedBall(){
		points += 1;
		pointsCanvas.text = points.ToString();
	}

	void collectedKey(){
		keyCollected = true;
		PlayerMovementCS.doorsOpen = keyCollected;
		keyCanvas.color = Color.white;
	}

	void collectedShield(){
		shieldCanvas.color = Color.white;
		GameObject.Find("Player_Old").SendMessage("collectedShield");
	}

	void losedShield(){
		shieldCanvas.color = new Color(0,0,0,0);
	}

	void collectedLive(){
		lives += 1;
		livesCanvas.text = lives.ToString();
	}

	void decreaseLives(){
		lives -= 1;
		livesCanvas.text = lives.ToString();
	}

	void killedEnemy (){
		Debug.Log("Killed Enemy");
	}

	void setCameraFOV(int fov){
		cameraPlayer.fieldOfView = fov;
	}

	void smokeHit(){
		smokeCounter = 0;
		smoked = true;
		smokeCanvas.color = new Color(0,1,0,1);
	}
}
