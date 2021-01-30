using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player : MonoBehaviour
{
    // Start is called before the first frame update
    bool SpacePressed;
    float horizontal;
    bool hitTheGround;
    Rigidbody rb = null;
    void Start()
    {
        rb = GetComponent<Rigidbody>();
    }

    // Update is called once per frame
    void Update()
    {
        if(Input.GetKeyDown(KeyCode.Space) == true && hitTheGround == true)
        {
            SpacePressed = true;
            hitTheGround = false;
        }
        horizontal = Input.GetAxis("Horizontal");
    }

     /// <summary>
    /// This function is called every fixed framerate frame, if the MonoBehaviour is enabled.
    /// </summary>
    void FixedUpdate()
    {
        rb.velocity = new Vector3(horizontal,rb.velocity.y,0);
        if(SpacePressed){
            rb.AddForce(Vector3.up * 5.5f,ForceMode.VelocityChange);
            SpacePressed = false;
        }    
    }

    /// <summary>
    /// OnCollisionEnter is called when this collider/rigidbody has begun
    /// touching another rigidbody/collider.
    /// </summary>
    /// <param name="other">The Collision data associated with this collision.</param>
    void OnCollisionEnter(Collision other)
    {
        hitTheGround = true;
    }

    
}
