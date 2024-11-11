import { useState, useEffect } from 'react';
import { Tier } from '../types/tier';

export const useTierStorage = () => {
  const [tiers, setTiers] = useState<Tier[]>([]);

  useEffect(() => {
    const savedTiers = localStorage.getItem("tiers");
    if (savedTiers) {
      setTiers(JSON.parse(savedTiers));
    }
  }, []);

  const saveTiers = (newTiers: Tier[]) => {
    setTiers(newTiers);
    localStorage.setItem("tiers", JSON.stringify(newTiers));
  };

  return { tiers, saveTiers };
};