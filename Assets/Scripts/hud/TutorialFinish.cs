using UnityEngine;
using System.Collections;
using UnityEngine.SceneManagement;

public class TutorialFinish : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void OnTriggerEnter(Collider col){
		Debug.Log ("OnTriggerEnter: " + col.tag);
		if (col.tag == "Player") {
			FinishTutorial ();
		}
	}

	private void FinishTutorial(){
		StartCoroutine (startStart ());
	}

	private IEnumerator startStart(){

		BluetoothReceiver.getInstance ().Disconnect ();
		float fadeTime = GameObject.Find ("EventManager").GetComponent<Fading> ().BeginFade (1);
		yield return new WaitForSeconds (fadeTime);


		SceneManager.LoadScene ("Intro");
	}
}
