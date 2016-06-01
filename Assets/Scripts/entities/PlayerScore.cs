using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class PlayerScore : MonoBehaviour {
	public int startScore = 0;
	public Text scoreText;

	private PlayerAudio audioPlayer;
	private int score;

	// Use this for initialization
	void Start () {
		score = startScore;
		audioPlayer = GetComponent<PlayerAudio> ();
	}
	
	// Update is called once per frame
	void Update () {
		scoreText.text = score.ToString ();
	}

	public void IncScore(int inc){
		IncScore (inc, true);
	}

	public void IncScore (int inc, bool playSound){
		score += inc;
		if (playSound)
			audioPlayer.IncScore ();
	}

	public void DecScore(int dec){
		score += dec;
	}

	public int GetScore(){
		return score;
	}
}
