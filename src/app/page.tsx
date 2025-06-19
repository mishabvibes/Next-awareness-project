'use client';

import { useEffect, useState } from 'react';
import FakeRewardInterface from '@/components/FakeRewardInterface';
import EducationalReveal from '@/components/EducationalReveal';

export default function Home() {
  const [showEducational, setShowEducational] = useState(false);
  const [collectedData, setCollectedData] = useState<any>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500">
      {!showEducational ? (
        <FakeRewardInterface 
          onDataCollected={(data) => {
            setCollectedData(data);
            // Show educational content after 3 seconds
            setTimeout(() => setShowEducational(true), 3000);
          }}
        />
      ) : (
        <EducationalReveal collectedData={collectedData} />
      )}
    </main>
  );
}