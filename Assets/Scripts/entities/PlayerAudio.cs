using UnityEngine;
using System.Collections;

public class PlayerAudio : MonoBehaviour {

	public float audioWalkVelocity = 1f;
	public float audioRunVelocity = 2f;

	public AudioClip[] hurtClips;
	public AudioClip dieClip;
	public AudioClip scoreClip;

	private AudioSource audioManager;
	private AudioSource audioWalk;
	private AudioSource audioPoison;
	private AudioSource shieldActivated;

	private bool audioPoisonPaused;
	private bool isHurt;

	// Use this for initialization
	void Start () {
		isHurt = false;
		audioPoisonPaused = false;
		audioWalk = GetComponents<AudioSource> () [0];
		audioManager = GetComponents<AudioSource> () [1];
		audioPoison = GetComponents<AudioSource> () [2];	
		shieldActivated = GetComponents<AudioSource> () [3];	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	public void PlayHurtSound(){
		audioManager.clip = hurtClips[Random.Range (0, hurtClips.Length-1)];
		audioManager.Play ();
		Invoke ("HurtFinish", audioManager.clip.length);
	}

	private void HurtFinish(){
		isHurt = false;
	}

	public void PlayWalk(){
		if (!audioWalk.isPlaying)
			audioWalk.Play ();
	}

	public void StopWalk(){
		if (audioWalk.isPlaying)
			audioWalk.Stop ();
	}

	public void Run(){
		audioWalk.pitch = audioRunVelocity;
	}

	public void Walk(){
		audioWalk.pitch = audioWalkVelocity;
	}

	public void Die(){
		audioManager.clip = dieClip;
		audioManager.Play ();
	}

	public void StartPoison(){
		audioPoison.Play ();
	}

	public void StopPoison(){
		audioPoison.Stop ();
	}

	public void IncScore(){
		if (!isHurt) {
			audioManager.clip = scoreClip;
			audioManager.Play ();
		}
	}

	public void ActiveShield(){
		shieldActivated.Play ();
		if (audioPoison.isPlaying) {
			audioPoisonPaused = true;
			audioPoison.Pause ();
		}
	}

	public void DisableShield(float poisonAlpha){
		shieldActivated.Stop ();
		if (audioPoisonPaused && poisonAlpha>0f) {
			audioPoison.UnPause ();
		}
		audioPoisonPaused = false;
	}
}
