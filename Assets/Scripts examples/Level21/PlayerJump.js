#pragma strict

public var jumpSpeed : float = 0.0f;

private var rb : Rigidbody2D;
private var ground : GameObject = null;
private var currentJumpSpeed : float = 0.0f;

function Start(){
	rb = GetComponent.<Rigidbody2D>();
}

function FixedUpdate () {
	currentJumpSpeed -= 1.5f;
	if (currentJumpSpeed > 0.0f){
		rb.AddForce(Vector2.up * currentJumpSpeed);
	}
}

function Update(){
	if (Input.GetButtonDown("Jump")){
		if (IsGrounded()) currentJumpSpeed = jumpSpeed;
	}
	else if (Input.GetButtonUp("Jump")){
		currentJumpSpeed = 0.0f;
	}
}

function OnCollisionEnter2D(col : Collision2D){
	if (col.gameObject.GetComponent.<Rigidbody2D>().isKinematic){
		for (var contact : ContactPoint2D in col.contacts){
			if (contact.normal.y > 0.8){
				ground = col.gameObject;
				break;
			}
		}
	}
}

function OnCollisionExit2D(col : Collision2D){
	if (col.gameObject == ground){
		ground = null;
	}
}

function IsGrounded(){
	return (ground != null);
}