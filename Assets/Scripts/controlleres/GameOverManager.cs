using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class GameOverManager : MonoBehaviour {
	public Text textTitle;
	public Text textPoints;
	public float gameOverWaitTime=5f;
	public Transform player;

	private bool gameOver;
	private Animator animator;

	void Start(){
		gameOver = false;
		animator = GetComponent<Animator> ();
	}

	public void GameOver(int points){
		if (!gameOver) {
			gameOver = true;
			player.position = new Vector3 (1000f, 1000f, 1000f);
			textTitle.text = "Game Over";
			textPoints.text = "Puntuació: " + points;
			animator.SetTrigger ("GameOver");
			BluetoothReceiver.getInstance ().Disconnect ();
			Invoke ("GoToStartScreen", gameOverWaitTime);
		}
	}

	private void GoToStartScreen(){
		SceneManager.LoadScene ("Intro");
	}
}
