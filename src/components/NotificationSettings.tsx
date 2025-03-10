import React, { useState } from "react";
import { useProfileStore } from "utils/profileStore";
import { UserProfile } from "utils/profileStore";

interface Props {
  profile: UserProfile | null;
}

export function NotificationSettings({ profile }: Props) {
  const [preferences, setPreferences] = useState(profile?.notificationPreferences || {
    newQuestion: true,
    partnerAnswer: true,
    coupleRequest: true
  });
  const [isSaving, setIsSaving] = useState(false);
  const updateNotificationPreferences = useProfileStore((state) => state.updateNotificationPreferences);
  
  const handleTogglePreference = (key: keyof UserProfile['notificationPreferences']) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const handleSave = async () => {
    if (!profile) return;
    
    setIsSaving(true);
    try {
      await updateNotificationPreferences(preferences);
    } catch (error) {
      console.error("Error updating notification preferences:", error);
    } finally {
      setIsSaving(false);
    }
  };
  
  if (!profile) return null;
  
  const hasChanges = JSON.stringify(preferences) !== JSON.stringify(profile.notificationPreferences);
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100">
      <h3 className="text-xl font-semibold mb-4">Notification Settings</h3>
      <p className="text-gray-600 mb-6">
        Choose what notifications you want to receive.
      </p>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-800">New Questions</h4>
            <p className="text-sm text-gray-500">When new questions are available</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={preferences.newQuestion}
              onChange={() => handleTogglePreference('newQuestion')}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-800">Partner Answers</h4>
            <p className="text-sm text-gray-500">When your partner answers a question</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={preferences.partnerAnswer}
              onChange={() => handleTogglePreference('partnerAnswer')}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-800">Couple Requests</h4>
            <p className="text-sm text-gray-500">When you receive a new couple request</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={preferences.coupleRequest}
              onChange={() => handleTogglePreference('coupleRequest')}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
          </label>
        </div>
      </div>
      
      {hasChanges && (
        <div className="mt-6">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full py-2 px-4 bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium rounded-xl hover:from-pink-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isSaving ? "Saving..." : "Save Preferences"}
          </button>
        </div>
      )}
    </div>
  );
}