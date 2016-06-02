using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class TUtorialEnemy : MonoBehaviour {
	private PlayerHealth playerHealth;
	public float damage=100f;

	private AudioSource audioDie;
	private Image enemyDetector;
	private Image ownEnemyDetector;

	// Use this for initialization
	void Start () {
		enemyDetector =  GameObject.Find("EnemyNearImage").GetComponent<Image>();
		playerHealth = GameObject.Find ("player").GetComponent<PlayerHealth> ();
		audioDie = GetComponent<AudioSource> ();

		ownEnemyDetector = (Image) GameObject.Instantiate(enemyDetector, new Vector3(0,0,0), Quaternion.Euler(0, 0, 0));
		//ownEnemyDetector.transform.SetParent(interfacePlayer.transform);
		ownEnemyDetector.transform.localPosition = new Vector3(0,0,0);
		ownEnemyDetector.transform.localScale = new Vector3(1,1,1);
		ownEnemyDetector.transform.localRotation = Quaternion.Euler(0, 0, 0);
	}


	void OnTriggerEnter (Collider col){
		if (col.gameObject.tag == "Player"){
			if (!playerHealth.IsUsingShield()) playerHealth.TakeDamage(damage);


			Renderer[] renderers = GetComponentsInChildren<Renderer> ();
			for (int i = 0; i < renderers.Length; ++i) {
				renderers [i].enabled = false;
			}
			audioDie.Play ();
			Invoke ("deleteDetector", audioDie.clip.length);
			GameObject.Find("LevelGenerator").SendMessage("respawnEnemy");
		}
	}

	void deleteDetector(){
		Destroy(ownEnemyDetector);
		Destroy(gameObject);
	}
}
