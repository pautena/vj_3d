using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class GameOverManager : MonoBehaviour {
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
			Debug.Log ("GameOver");
			textPoints.text = "Puntuació: " + points;
			animator.SetTrigger ("GameOver");
			Invoke ("GoToStartScreen", gameOverWaitTime);
		}
	}

	private void GoToStartScreen(){
		SceneManager.LoadScene ("Intro");
	}
}
