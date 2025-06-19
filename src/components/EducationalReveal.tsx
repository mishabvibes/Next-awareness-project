// File: src/components/EducationalReveal.tsx
'use client';

import { useState } from 'react';
import { AlertTriangle, Shield, Eye, MapPin, Lock } from 'lucide-react';

interface Props {
  collectedData: any;
}

export default function EducationalReveal({ collectedData }: Props) {
  const [showFullData, setShowFullData] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-700 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Warning Header */}
        <div className="bg-red-600 text-white p-6 rounded-t-2xl text-center">
          <AlertTriangle className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">⚠️ YOU'VE BEEN PHISHED! ⚠️</h1>
          <p className="text-red-100 text-lg">
            This was a demonstration of how phishing attacks work
          </p>
        </div>

        <div className="bg-white rounded-b-2xl overflow-hidden">
          {/* What Just Happened */}
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Eye className="h-6 w-6 mr-2 text-red-600" />
              What Just Happened?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2">🎯 Social Engineering</h3>
                  <p className="text-sm text-red-700">
                    You were presented with a fake "$1,000 prize" - a common tactic used by scammers to create urgency and excitement.
                  </p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h3 className="font-semibold text-orange-800 mb-2">🧠 Psychological Manipulation</h3>
                  <p className="text-sm text-orange-700">
                    The fake countdown timer, testimonials, and "limited time offer" were designed to pressure you into quick decisions.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-800 mb-2">📱 Permission Harvesting</h3>
                  <p className="text-sm text-yellow-700">
                    The "location verification" was a trick to get you to grant location permissions voluntarily.
                  </p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-800 mb-2">📊 Data Collection</h3>
                  <p className="text-sm text-purple-700">
                    While you thought you were claiming a prize, your personal data was being collected and transmitted.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Collected Data */}
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <MapPin className="h-6 w-6 mr-2 text-red-600" />
              Data We Collected About You
            </h2>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-800 font-semibold mb-2">
                🚨 This information was collected and sent to our Discord channel:
              </p>
              <p className="text-red-700 text-sm">
                In a real attack, this data would be sold to criminals or used for identity theft, targeted advertising, or physical stalking.
              </p>
            </div>

            <button
              onClick={() => setShowFullData(!showFullData)}
              className="mb-4 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              {showFullData ? 'Hide' : 'Show'} Collected Data
            </button>

            {showFullData && collectedData && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    Location Data
                  </h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Latitude:</strong> {collectedData.latitude?.toFixed(6) || 'Denied'}</p>
                    <p><strong>Longitude:</strong> {collectedData.longitude?.toFixed(6) || 'Denied'}</p>
                    <p><strong>Accuracy:</strong> {collectedData.accuracy ? `±${collectedData.accuracy.toFixed(0)} meters` : 'N/A'}</p>
                    <p><strong>Timestamp:</strong> {new Date(collectedData.timestamp).toLocaleString()}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Personal Info</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Name:</strong> {collectedData.userName || 'Not provided'}</p>
                    <p><strong>IP Address:</strong> {collectedData.ip || 'Fetching...'}</p>
                    <p><strong>Language:</strong> {collectedData.language}</p>
                    <p><strong>Timezone:</strong> {collectedData.timezone}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 md:col-span-2">
                  <h4 className="font-semibold text-gray-800 mb-2">Device & Browser</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Platform:</strong> {collectedData.platform}</p>
                    <p><strong>Screen:</strong> {collectedData.screenResolution}</p>
                    <p><strong>User Agent:</strong> <span className="font-mono text-xs">{collectedData.userAgent}</span></p>
                    <p><strong>Referrer:</strong> {collectedData.referrer}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Protection Tips */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Shield className="h-6 w-6 mr-2 text-green-600" />
              How to Protect Yourself
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-gray-800">🚩 Red Flags to Watch For</h4>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>• Unexpected "prizes" or "winnings"</li>
                    <li>• Urgent time limits and pressure</li>
                    <li>• Requests for location or personal info</li>
                    <li>• Too-good-to-be-true offers</li>
                    <li>• Unprofessional websites with flashy designs</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-800">🔒 Browser Security</h4>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>• Always deny location requests from unknown sites</li>
                    <li>• Check the URL for suspicious domains</li>
                    <li>• Use private/incognito browsing for unknown links</li>
                    <li>• Keep your browser updated</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-800">✅ Best Practices</h4>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>• Think before you click</li>
                    <li>• Verify offers through official channels</li>
                    <li>• Never give personal info to win "prizes"</li>
                    <li>• Be skeptical of unsolicited offers</li>
                    <li>• Trust your instincts</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-800">📚 Learn More</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    Share this demo with friends and family to help them recognize phishing attempts. Education is the best defense!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-100 p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Lock className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm font-semibold text-gray-800">Educational Demo Only</span>
            </div>
            <p className="text-xs text-gray-600">
              Your data was collected only for demonstration purposes. Stay vigilant and protect your privacy online!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}