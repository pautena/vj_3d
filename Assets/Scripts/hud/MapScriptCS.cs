using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class MapScriptCS : MonoBehaviour {

	public mazeGenCS gen;
	public int N_mini=2;
	public MiniMapCameraCS miniMapCamera;
	public GameObject elementsHUD;
	private bool pause = false;
	private Image background;
	private AudioSource audioSource;

	// Use this for initialization
	void Start () {
		background = GetComponent<Image> ();
		audioSource = GetComponent<AudioSource> ();
	}
	
	// Update is called once per frame
	void Update () {
		if (BluetoothReceiver.getInstance ().GetBtn3Down ()) {
			pause = !pause;
			audioSource.Play ();

			if (pause) {
				Time.timeScale = 0;
				miniMapCamera.ToggleGeneralVision (gen.N);
			} else {
				miniMapCamera.ToggleGeneralVision (N_mini);
				Time.timeScale = 1;

			}

			foreach (Transform child in transform) {
				child.gameObject.SetActive (pause);
			}

			float alpha;
			if (pause)
				alpha = 1f;
			else
				alpha = 0f;
			background.color = new Color (background.color.r,background.color.g,background.color.b,alpha);
			elementsHUD.active = !pause;
		}

		if (BluetoothReceiver.getInstance ().GetBtn2Down () && pause) {
			Time.timeScale = 1;
			StartCoroutine(StartScreen ());
		}

	}

	private IEnumerator StartScreen(){
		float fadeTime = GameObject.Find ("EventManager").GetComponent<Fading> ().BeginFade (1);
		BluetoothReceiver.getInstance ().Disconnect ();
		yield return new WaitForSeconds (fadeTime);
		SceneManager.LoadScene ("Intro");
	}
}
