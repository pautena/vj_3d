#pragma strict

public var startSmokeTime : int;
private var startSmokeCounter : int;
private var particles : ParticleSystem;


function Start () {
	particles = GetComponent.<ParticleSystem>();
	startSmokeCounter = 0;
}

function Update () {
	++startSmokeCounter;
	if (startSmokeCounter > startSmokeTime) {
		startSmokeCounter = 0;
		particles.Play();
	}
}