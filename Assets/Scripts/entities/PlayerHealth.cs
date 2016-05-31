using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class PlayerHealth : MonoBehaviour {

	public float initialLive=100f;
	public Slider healthSlider;
	public Image damageImage;
	public Image poisonImage;
	public Color flashColour;
	public float flashSpeed=5f;
	public float viberTime = 0.1f;
	public float poisonViberTime = 0.05f;
	public float poisonDamageTime=2f;
	public float poisonDamage=5f;
	public float poisonSpeed = 0.2f;
	public float backTime = 0.5f;
	public float backDamageSpeed = 6f;
	public Vector3 backDamageMovement = new Vector3(1.0f,0f,0f);
	public Transform head;
	public GameOverManager gameOverManager;

	private bool damaged=false;
	private float poisonAlpha = 0f;
	private bool poisonInvoke=false;
	private Rigidbody playerRigidbody;
	private float backTimeCount=0f;
	private PlayerMovementCS playerMovement;
	private PlayerScore playerScore;


	private float live;

	// Use this for initialization
	void Start () {
		live = initialLive;
		healthSlider.value = live/initialLive;
		playerRigidbody = GetComponent<Rigidbody> ();
		playerMovement = GetComponent<PlayerMovementCS> ();
		playerScore = GetComponent<PlayerScore> ();
	}
	
	// Update is called once per frame
	void Update () {

		if(damaged){
			damageImage.color = flashColour;
		}
		else{
			damageImage.color = Color.Lerp (damageImage.color, Color.clear, flashSpeed * Time.deltaTime);

			if (backTimeCount > 0f) {
				backTimeCount -= Time.deltaTime;
				Vector3 forward = head.transform.forward;
				Vector3 back = Quaternion.AngleAxis(head.eulerAngles.y,Vector3.up) *  backDamageMovement.normalized;
				playerRigidbody.MovePosition (transform.position + back *backDamageSpeed * Time.deltaTime);
				if (backTimeCount <= 0f)
					playerMovement.canMove = true;
			}
		}
		damaged = false;

		if (poisonAlpha > 0f) {
			poisonImage.color = new Color (poisonImage.color.r, poisonImage.color.g, poisonImage.color.b, poisonAlpha);
			poisonAlpha -= poisonSpeed * Time.deltaTime;

			if (!poisonInvoke) {
				Invoke ("PoisonDamage", poisonDamageTime);
				poisonInvoke = true;
			}
		}
	}

	public void TakeDamage(float damage){
		TakeDamage (damage, viberTime,true);
	}

	public void TakeDamage(float damage,float vt,bool animate){
		damaged=true;
		live -= damage;
		healthSlider.value = live/initialLive;

		if (live <= 0f) {
			Die ();
		}else if (animate) {
			playerMovement.canMove = false;
			backTimeCount = backTime;
		}
	
		/*
		Debug.Log ("back: " + back);
		playerRigidbody.MovePosition ( transform.position + back);*/

		BluetoothReceiver.getInstance ().viber (vt);
	}

	private void Die(){
		playerMovement.canMove = false;
		gameOverManager.GameOver (playerScore.GetScore());
	}

	private void PoisonDamage(){
		TakeDamage (poisonDamage, poisonViberTime,false);		
		poisonInvoke = false;
	}

	public void Poison(){
		if (poisonAlpha <= 0f) {
			poisonAlpha = 1f;
		}
	}

	public void OnParticleCollision(GameObject gameObject){
		if (gameObject.name == "Eff_Fire") {
			Poison ();
		}
	}
}
