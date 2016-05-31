using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class PlayerScore : MonoBehaviour {
	public int startScore = 0;
	public Text scoreText;

	private int score;

	// Use this for initialization
	void Start () {
		score = startScore;
	}
	
	// Update is called once per frame
	void Update () {
		scoreText.text = score.ToString ();
	}

	public void IncScore(int inc){
		score += inc;
	}

	public void DecScore(int dec){
		score += dec;
	}

	public int GetScore(){
		return score;
	}
}
