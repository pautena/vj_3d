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
		StartCoroutine(StartLevel ());

	}

	private IEnumerator StartLevel(){
		if (level == 1) {
			fullScreenMessage.gameObject.SetActive (true);
			fullScreenMessage.text = "Nivell 1";
		}

		BluetoothReceiver.getInstance ().Disconnect ();
		float fadeTime = GameObject.Find ("EventManager").GetComponent<Fading> ().BeginFade (1);
		yield return new WaitForSeconds (fadeTime);

		if (level == 1) {//Tutorial 1
			SceneManager.LoadScene ("Tutorial1");
		} else if (level == 2) {//Tutorial 2
			SceneManager.LoadScene ("Tutorial2");
		} else if (level == 3) {//Tutorial 3
			SceneManager.LoadScene ("Tutorial3");
		}else if (level == 4) {//facil
			SceneManager.LoadScene ("Level1");
		}else if (level == 5) {//dificil
			SceneManager.LoadScene ("Level2");
		}
	}
}
