using UnityEngine;
using System.Collections;
using UnityEngine.SceneManagement;
using System;
using UnityEngine.UI;

public class ClickLevel : OnClick {

	public int level;
	public Text fullScreenMessage;

	// Use this for initialization
	void Start () {
		base.Start ();
	}


	public override void OnClickFunc(){
		Debug.Log ("Load level: " + level+", time: "+Time.time);
		StartCoroutine(StartLevel ());

	}

	private IEnumerator StartLevel(){
		if (level == 1) {
			fullScreenMessage.gameObject.SetActive (true);
			fullScreenMessage.text = "Nivell 1";
		}

		float fadeTime = GameObject.Find ("EventManager").GetComponent<Fading> ().BeginFade (1);
		yield return new WaitForSeconds (fadeTime);

		Debug.Log ("End wait, time: "+Time.time);

		if (level == 1) {
			SceneManager.LoadScene ("Level1");
		}
	}
}
