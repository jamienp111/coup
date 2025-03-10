import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserGuardContext } from "app";
import { useProfileStore } from "utils/profileStore";
import { HeartIcon } from "components/HeartIcon";
import { PartnerConnection } from "components/PartnerConnection";
import { NotificationSettings } from "components/NotificationSettings";

export default function Profile() {
  const { user } = useUserGuardContext();
  const { userProfile, isLoading, error, initializeProfile, updateProfile, uploadProfileImage } = useProfileStore();
  const [displayName, setDisplayName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Initialize profile when component mounts
  useEffect(() => {
    if (user) {
      initializeProfile(user);
    }
    
    // Cleanup listener when component unmounts
    return () => {
      useProfileStore.getState().cleanup();
    };
  }, [user, initializeProfile]);
  
  // Update local state when profile data changes
  useEffect(() => {
    if (userProfile) {
      setDisplayName(userProfile.displayName);
    }
  }, [userProfile]);
  
  const handleNameChange = async () => {
    if (!userProfile || displayName === userProfile.displayName) {
      setIsEditing(false);
      return;
    }
    
    setIsSaving(true);
    try {
      await updateProfile({ displayName });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating display name:", error);
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userProfile) return;
    
    setUploadProgress(0);
    try {
      await uploadProfileImage(file);
      setUploadProgress(100);
      setTimeout(() => setUploadProgress(null), 1000);
    } catch (error) {
      console.error("Error uploading profile image:", error);
      setUploadProgress(null);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 flex flex-col items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <HeartIcon className="h-12 w-12 text-pink-400" filled />
          <p className="mt-4 text-pink-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center">
          <HeartIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link 
            to="/"
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium rounded-xl inline-block"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }
  
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
        <nav className="flex space-x-6">
          <Link to="/questions" className="text-gray-600 hover:text-pink-600 font-medium">
            Questions
          </Link>
          <Link to="/profile" className="text-pink-600 font-medium">
            Profile
          </Link>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-6 py-8 max-w-5xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Your Profile</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100">
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <div 
                    className="h-24 w-24 rounded-full bg-pink-100 flex items-center justify-center cursor-pointer overflow-hidden"
                    onClick={handleProfilePictureClick}
                  >
                    {userProfile?.photoURL ? (
                      <img 
                        src={userProfile.photoURL} 
                        alt={userProfile.displayName} 
                        className="h-24 w-24 object-cover"
                      />
                    ) : (
                      <span className="text-3xl font-semibold text-pink-500">
                        {userProfile?.displayName.charAt(0)}
                      </span>
                    )}
                    
                    {uploadProgress !== null && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="h-12 w-12 rounded-full border-4 border-pink-200 border-t-pink-500 animate-spin"></div>
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-full flex items-center justify-center transition-all cursor-pointer">
                    <span className="text-white opacity-0 group-hover:opacity-100 text-sm font-medium">
                      Change
                    </span>
                  </div>
                  
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
                
                <div className="mt-4 text-center">
                  {isEditing ? (
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                      />
                      <button
                        onClick={handleNameChange}
                        disabled={isSaving}
                        className="ml-2 p-2 text-pink-600 hover:text-pink-700"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => {
                          setDisplayName(userProfile?.displayName || "");
                          setIsEditing(false);
                        }}
                        className="ml-1 p-2 text-gray-600 hover:text-gray-700"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <h3 className="text-xl font-semibold">{userProfile?.displayName}</h3>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="ml-2 text-gray-400 hover:text-pink-500"
                      >
                        ✏️
                      </button>
                    </div>
                  )}
                  <p className="text-gray-600">{userProfile?.email}</p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="font-medium text-gray-800 mb-3">Account</h4>
                <div className="space-y-2">
                  <Link 
                    to="/change-password" 
                    className="block text-gray-600 hover:text-pink-600 transition-colors"
                  >
                    Change Password
                  </Link>
                  <button 
                    className="block text-red-600 hover:text-red-700 transition-colors w-full text-left"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Partner Connection */}
          <div className="md:col-span-2 space-y-6">
            <PartnerConnection />
            <NotificationSettings profile={userProfile} />
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