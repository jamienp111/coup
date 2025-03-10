import React from "react";
import { HeartIcon } from "components/HeartIcon";
import { PrimaryButton } from "components/PrimaryButton";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();

  // Function to handle sign up/login button click
  const handleGetStarted = () => {
    // Will navigate to signup page when it's created in the future task
    console.log("Get started clicked");
    // This will be implemented in HEA-2
    // navigate("/signup");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-pink-50">
      {/* Header/Navigation */}
      <header className="py-6 px-8 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <HeartIcon className="h-8 w-8 text-pink-500" filled />
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-500">HeartSync</h1>
        </div>
        <nav>
          <button 
            onClick={handleGetStarted}
            className="text-pink-600 hover:text-pink-700 font-medium"
          >
            Log in
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col md:flex-row items-center justify-center px-8 py-12 md:py-20 max-w-7xl mx-auto">
        {/* Left Column - Text content */}
        <div className="md:w-1/2 md:pr-12 text-center md:text-left mb-12 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-800">
            Discover Your Relationship <span className="text-pink-500">Together</span>
          </h2>
          <p className="text-lg mb-8 text-gray-600 max-w-lg mx-auto md:mx-0">
            Answer questions about each other and discover your unique connection. With HeartSync, answers remain hidden until both partners respond, creating moments of genuine connection and surprise.
          </p>
          <PrimaryButton size="lg" onClick={handleGetStarted}>
              {user ? "Go to Profile" : "Get Started"}
            </PrimaryButton>
            {!user && (
              <button 
                onClick={() => navigate("/signup")} 
                className="px-6 py-3 border-2 border-gray-300 rounded-full text-gray-600 font-medium hover:border-pink-300 hover:text-pink-600 transition-all"
              >
                Sign Up
              </button>
            )}
        </div>

        {/* Right Column - Illustration */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-pink-200 opacity-70 animate-pulse"></div>
            <div className="absolute -bottom-8 -right-4 w-16 h-16 rounded-full bg-red-200 opacity-70 animate-pulse delay-300"></div>
            
            {/* Main illustration - mockup of the app */}
            <div className="bg-white rounded-3xl shadow-xl p-6 max-w-md relative z-10 animate-float">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                  <HeartIcon className="h-5 w-5 text-pink-500" filled />
                  <span className="font-medium text-gray-800">Question for you both</span>
                </div>
                <span className="text-sm text-gray-500">1 of 3</span>
              </div>
              
              <div className="bg-pink-50 rounded-2xl p-5 mb-6">
                <p className="text-gray-700 font-medium text-lg">What is your partner's idea of a perfect date night?</p>
              </div>
              
              <div className="flex space-x-4 mb-4">
                <div className="flex-1 bg-gray-100 rounded-xl p-4">
                  <div className="text-sm text-gray-500 mb-1">Your answer</div>
                  <div className="text-gray-400 italic">Waiting for you to answer...</div>
                </div>
                <div className="flex-1 bg-gray-100 rounded-xl p-4">
                  <div className="text-sm text-gray-500 mb-1">Partner's answer</div>
                  <div className="bg-gray-200 animate-pulse h-4 rounded w-3/4 mb-2"></div>
                  <div className="bg-gray-200 animate-pulse h-4 rounded w-1/2"></div>
                </div>
              </div>
              
              <button className="w-full py-3 rounded-xl bg-pink-100 text-pink-600 font-medium hover:bg-pink-200 transition-colors">
                Answer Now
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">How HeartSync Works</h3>
          
          <div className="grid md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="bg-pink-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-pink-500">1</span>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-gray-800">Select a Question</h4>
              <p className="text-gray-600">Choose from our curated questions or create your own to learn more about each other.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="text-center">
              <div className="bg-pink-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-pink-500">2</span>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-gray-800">Answer Separately</h4>
              <p className="text-gray-600">Each partner answers privately without seeing each other's responses.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="text-center">
              <div className="bg-pink-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-pink-500">3</span>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-gray-800">Discover Together</h4>
              <p className="text-gray-600">Once both answers are submitted, they're revealed simultaneously for you to enjoy together.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-pink-400 to-red-400 py-16 px-8 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <HeartIcon className="h-12 w-12 mx-auto mb-6 text-white opacity-75" filled />
          <h3 className="text-3xl font-bold mb-6">Ready to strengthen your connection?</h3>
          <p className="text-xl mb-8 opacity-90">Join thousands of couples discovering new dimensions of their relationships.</p>
          <PrimaryButton 
            onClick={handleGetStarted} 
            className="bg-white text-pink-500 hover:bg-gray-100 hover:text-pink-600"
          >
            Start Your Journey
          </PrimaryButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 px-8 text-center text-gray-500">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <HeartIcon className="h-5 w-5 text-pink-400" filled />
          <span className="font-medium text-gray-600">HeartSync</span>
        </div>
        <p>&copy; {new Date().getFullYear()} HeartSync. All rights reserved.</p>
      </footer>
    </div>
  );
}
