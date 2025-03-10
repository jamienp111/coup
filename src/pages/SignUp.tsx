import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { firebaseAuth } from "app";
import { HeartIcon } from "components/HeartIcon";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "utils/firebase";

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Create the user account
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      
      // Update the user's profile
      await updateProfile(userCredential.user, {
        displayName: displayName
      });
      
      // Create a user profile document in Firestore
      await setDoc(doc(firestore, "profiles", userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: email,
        displayName: displayName,
        photoURL: null,
        partnerId: null,
        createdAt: new Date().toISOString(),
        notificationPreferences: {
          newQuestion: true,
          partnerAnswer: true,
          coupleRequest: true
        }
      });
      
      // Navigate to profile page
      navigate("/profile");
    } catch (err: any) {
      console.error("Signup error:", err);
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please try signing in instead.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. Please use at least 6 characters.");
      } else {
        setError("Failed to create your account. Please try again.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 flex flex-col">
      {/* Header */}
      <header className="py-6 px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <HeartIcon className="h-8 w-8 text-pink-500" filled />
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-500">
            HeartSync
          </h1>
        </Link>
        <div className="space-x-4">
          <Link to="/login" className="text-pink-600 hover:text-pink-700 font-medium">
            Sign In
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md border border-pink-100">
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-pink-50 rounded-full mb-4">
              <HeartIcon className="h-10 w-10 text-pink-500" filled />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Create an Account</h2>
            <p className="text-gray-600">
              Join HeartSync to strengthen your relationship
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-6">
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                placeholder="Create a password"
                required
                minLength={6}
              />
              <p className="mt-1 text-xs text-gray-500">Password must be at least 6 characters</p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium rounded-xl hover:from-pink-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-pink-600 hover:text-pink-700 font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} HeartSync. All rights reserved.</p>
      </footer>
    </div>
  );
}