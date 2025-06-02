import { useState, useEffect } from 'react';

export const useCompare = () => {
  const [compareList, setCompareList] = useState<string[]>(() => {
    const saved = localStorage.getItem('tripcompare_compare');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tripcompare_compare', JSON.stringify(compareList));
  }, [compareList]);

  const addToCompare = (packageId: string) => {
    // Limit compare list to 3 items
    if (!compareList.includes(packageId) && compareList.length < 3) {
      setCompareList([...compareList, packageId]);
      return true;
    }
    return false;
  };

  const removeFromCompare = (packageId: string) => {
    setCompareList(compareList.filter(id => id !== packageId));
  };

  const isInCompareList = (packageId: string) => {
    return compareList.includes(packageId);
  };

  const clearCompareList = () => {
    setCompareList([]);
  };

  return {
    compareList,
    addToCompare,
    removeFromCompare,
    isInCompareList,
    clearCompareList
  };
};