using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class WinManager : MonoBehaviour {

	public Text textTitle;
	public Text textPoints;
	public float winOverWaitTime=5f;
	public Transform player;
	public PlayerScore playerScore;
	public AudioSource levelAudioSource;

	private Animator animator;
	private AudioSource audioSource;
	private bool win;

	void Start(){
		win = false;
		animator = GetComponent<Animator> ();
		audioSource = GetComponent<AudioSource> ();
	}

	void Update(){
		GameObject[] balls = GameObject.FindGameObjectsWithTag ("Ball");
		if (balls.Length==1) {
			Win (playerScore.GetScore ());
		}
	}

	private void Win(int points){
		if (!win) {
			win = true;
			levelAudioSource.Stop ();
			player.position = new Vector3 (1000f, 1000f, 1000f);
			textTitle.text = "Nivell superat!";
			textPoints.text = "Puntuació: " + points;
			animator.SetTrigger ("GameOver");
			BluetoothReceiver.getInstance ().Disconnect ();
			audioSource.Play ();
			Invoke ("GoToStartScreen", winOverWaitTime);
		}
	}

	private void GoToStartScreen(){
		SceneManager.LoadScene ("Intro");
	}
}
