import { auth, provider } from "./FirebaseConfig";
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import Timer from "./Timer";
import "./app.css";

const App = () => {
  const [user, setuser] = useState(null);

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setuser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    setuser(null);
  };

  return (
    <div className="App">
      <div>
        {user ? (
          <>
            <div className="app-container">
              <Timer />
              <div className="logout">
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </>
        ) : (
          <button onClick={handleGoogleSignIn} className="sign-btn"> Sign In</button>
        )}
      </div>
    </div>
  );
};

export default App;
