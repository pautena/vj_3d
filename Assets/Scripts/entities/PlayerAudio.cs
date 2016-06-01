using UnityEngine;
using System.Collections;

public class PlayerAudio : MonoBehaviour {

	public float audioWalkVelocity = 1f;
	public float audioRunVelocity = 2f;

	public AudioClip[] hurtClips;
	public AudioClip dieClip;

	private AudioSource audioManager;
	private AudioSource audioWalk;

	// Use this for initialization
	void Start () {
		audioWalk = GetComponents<AudioSource> () [0];
		audioManager = GetComponents<AudioSource> () [1];	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	public void PlayHurtSound(){
		audioManager.clip = hurtClips[Random.Range (0, hurtClips.Length-1)];
		audioManager.Play ();
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
}
