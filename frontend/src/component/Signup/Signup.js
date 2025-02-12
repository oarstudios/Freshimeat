import React, { useState } from "react";
import "./signup.css";
import eyeOpen from '../../assets/eyeOpen.png'
import eyeClose from '../../assets/eyeClose.png'
import google from '../../assets/google.png'

function Signup({ onClick }) {
  const [isSg, setIsSg] = useState(false);
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="signInMain" onClick={onClick}>
        <div className={`sg ${!isSg? "sgTop": "sgBottom"}`}>
            <h1>Sign In</h1>
            <div className="sgInput">
                <div className="pass">
                <input type="email" placeholder="Email" required/>

                </div>
                <p className="error">*Enter valid email</p>
            </div>
            <div className="sgInput">
                <div className="pass">
                    <input type={isOpen? "text": "password"} placeholder="Password" required/>
                    {isOpen ? <img src={eyeOpen} alt="eye" onClick={()=>setIsOpen(false)} /> : 
                    <img src={eyeClose} alt="eye" onClick={()=>setIsOpen(true)} />
                    }
                    
                </div>
                <p className="error">*Password should be at least 8 characters long</p>
            </div>
            <div className="sig">
                <button>Sign In</button>
                <button>
                    <img src={google} alt="google" />
                    Continue with Google
                </button>
            </div>
            <p>Don't have an account? <span onClick={()=>setIsSg(true)}>Sign Up</span></p>  
        </div>
        <div className={`sg ${isSg? "sgTop": "sgBottom"}`}>
            <h1>Sign Up</h1>
            <div className="sgInput">
                <div className="pass">
                <input type="text" placeholder="Username" required/>

                </div>
            </div>
            <div className="sgInput">
                <div className="pass">
                <input type="email" placeholder="Email" required/>

                </div>
                <p className="error">*Enter valid email</p>
            </div>
            <div className="sgInput">
                <div className="pass">
                    <input type={isOpen? "text": "password"} placeholder="Password" required/>
                    {isOpen ? <img src={eyeOpen} alt="eye" onClick={()=>setIsOpen(false)} /> : 
                    <img src={eyeClose} alt="eye" onClick={()=>setIsOpen(true)} />
                    }
                    
                </div>
                <p className="error">*Password should be at least 8 characters long</p>
            </div>
            <div className="sig">
                <button>Sign In</button>
                <button>
                    <img src={google} alt="google" />
                    Continue with Google
                </button>
            </div>
            <p>Already have an account? <span onClick={()=>setIsSg(false)}>Sign In</span></p>  
        </div>
    </div>
  );
}

export default Signup;
