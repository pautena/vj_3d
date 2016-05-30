using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class PlayerHealth : MonoBehaviour {

	public float initialLive=100f;
	public Slider healthSlider;


	private float live;

	// Use this for initialization
	void Start () {
		live = initialLive;
	}
	
	// Update is called once per frame
	void Update () {

		//Set HUD
		healthSlider.value = live/initialLive;
	}

	public void TakeDamage(float damage){
		live -= damage;
	}
}
