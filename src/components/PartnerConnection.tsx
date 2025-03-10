import React, { useState } from "react";
import { useProfileStore, CoupleRequest } from "utils/profileStore";
import { HeartIcon } from "components/HeartIcon";

export function PartnerConnection() {
  const { userProfile, partnerProfile, incomingRequests } = useProfileStore();
  const [partnerEmail, setPartnerEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; message: string } | null>(null);
  
  const sendPartnerRequest = useProfileStore(state => state.sendPartnerRequest);
  const acceptPartnerRequest = useProfileStore(state => state.acceptPartnerRequest);
  const rejectPartnerRequest = useProfileStore(state => state.rejectPartnerRequest);
  
  const handleSendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);
    
    try {
      const response = await sendPartnerRequest(partnerEmail);
      setStatusMessage({
        type: response.success ? "success" : "error",
        message: response.message
      });
      
      if (response.success) {
        setPartnerEmail("");
      }
    } catch (error) {
      setStatusMessage({
        type: "error",
        message: "An error occurred while sending the request."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleAcceptRequest = async (request: CoupleRequest) => {
    try {
      await acceptPartnerRequest(request.id, request.requesterId);
      setStatusMessage({
        type: "success",
        message: "You've successfully connected with your partner!"
      });
    } catch (error) {
      setStatusMessage({
        type: "error",
        message: "An error occurred while accepting the request."
      });
    }
  };
  
  const handleRejectRequest = async (requestId: string) => {
    try {
      await rejectPartnerRequest(requestId);
      setStatusMessage({
        type: "success",
        message: "Request rejected."
      });
    } catch (error) {
      setStatusMessage({
        type: "error",
        message: "An error occurred while rejecting the request."
      });
    }
  };
  
  if (!userProfile) return null;
  
  // If user already has a partner
  if (userProfile.partnerId && partnerProfile) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100">
        <div className="flex items-center justify-center mb-5">
          <div className="relative">
            <div className="h-16 w-16 rounded-full bg-pink-100 flex items-center justify-center">
              {partnerProfile.photoURL ? (
                <img 
                  src={partnerProfile.photoURL} 
                  alt={partnerProfile.displayName} 
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <span className="text-2xl font-semibold text-pink-500">
                  {partnerProfile.displayName.charAt(0)}
                </span>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-400 h-4 w-4 rounded-full border-2 border-white"></div>
          </div>
        </div>
        
        <div className="text-center mb-5">
          <h3 className="text-xl font-semibold">{partnerProfile.displayName}</h3>
          <p className="text-gray-600">{partnerProfile.email}</p>
        </div>
        
        <div className="flex justify-center mb-5">
          <div className="px-4 py-2 bg-pink-50 rounded-full flex items-center">
            <HeartIcon className="w-5 h-5 text-pink-500 mr-2" filled />
            <span className="text-sm font-medium text-pink-700">Connected</span>
          </div>
        </div>
        
        <p className="text-center text-gray-600">
          You and {partnerProfile.displayName} are ready to strengthen your relationship through HeartSync's intimate questions and shared discoveries.
        </p>
      </div>
    );
  }
  
  // If user has incoming requests
  if (incomingRequests.length > 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100">
        <h3 className="text-xl font-semibold mb-4">Partner Request</h3>
        
        {statusMessage && (
          <div className={`p-4 rounded-lg mb-4 ${statusMessage.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-600"}`}>
            {statusMessage.message}
          </div>
        )}
        
        {incomingRequests.map((request) => (
          <div key={request.id} className="border border-pink-100 rounded-xl p-4 mb-4">
            <div className="flex items-center mb-3">
              <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                <span className="text-lg font-semibold text-pink-500">
                  {request.requesterName.charAt(0)}
                </span>
              </div>
              <div>
                <h4 className="font-medium">{request.requesterName}</h4>
                <p className="text-sm text-gray-600">{request.requesterEmail}</p>
              </div>
            </div>
            
            <p className="mb-4 text-gray-700">
              {request.requesterName} wants to connect with you on HeartSync.
            </p>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => handleAcceptRequest(request)}
                className="flex-1 py-2 px-4 bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium rounded-xl hover:from-pink-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all"
              >
                Accept
              </button>
              <button 
                onClick={() => handleRejectRequest(request.id)}
                className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
              >
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  // Default state - no partner, no requests
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100">
      <h3 className="text-xl font-semibold mb-4">Connect with Partner</h3>
      <p className="text-gray-600 mb-6">
        HeartSync works best when you're connected with your partner. Send them an invite to get started!
      </p>
      
      {statusMessage && (
        <div className={`p-4 rounded-lg mb-4 ${statusMessage.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-600"}`}>
          {statusMessage.message}
        </div>
      )}
      
      <form onSubmit={handleSendRequest}>
        <div className="mb-4">
          <label htmlFor="partnerEmail" className="block text-sm font-medium text-gray-700 mb-1">
            Partner's Email
          </label>
          <input
            id="partnerEmail"
            type="email"
            value={partnerEmail}
            onChange={(e) => setPartnerEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
            placeholder="Enter your partner's email"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium rounded-xl hover:from-pink-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
        >
          {isSubmitting ? (
            "Sending Invite..."
          ) : (
            <>
              <HeartIcon className="w-5 h-5 mr-2" /> Send Invitation
            </>
          )}
        </button>
      </form>
    </div>
  );
}