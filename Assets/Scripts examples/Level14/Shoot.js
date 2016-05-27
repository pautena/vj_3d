#pragma strict

public var projectile : Rigidbody2D;
public var bulletSpeed : float = 15.0f;
public var rateOfFire : float = 1.0f;
public var initDelay : float = 1.0f;

private var counter : float = 0.0f;

function Start () {
	rateOfFire = Random.Range(0.2f,0.6f);
	initDelay = Random.Range(1.0f,3.0f);
	counter = -initDelay;
}

function Update () {
	counter += Time.deltaTime;
	GetComponent.<Renderer>().material.color.g = 1-((1/rateOfFire)-counter)/(1/rateOfFire);
	if (counter >= 1/rateOfFire){
		GetComponent.<Renderer>().material.color = Color.red;
		counter = 0;
		var bullet : Rigidbody2D =
			Rigidbody2D.Instantiate(projectile,
			transform.position, transform.rotation);
		bullet.velocity = transform.right*bulletSpeed;
		Physics2D.IgnoreCollision(bullet.GetComponent.<Collider2D>(),
			GetComponent.<Collider2D>());
	}
}

function OnDrawGizmos(){
	Gizmos.color = Color.red;
	Gizmos.DrawRay(transform.position, transform.right*5);
}