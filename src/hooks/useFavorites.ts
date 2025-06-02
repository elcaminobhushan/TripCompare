import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('tripcompare_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tripcompare_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (packageId: string) => {
    if (!favorites.includes(packageId)) {
      setFavorites([...favorites, packageId]);
    }
  };

  const removeFavorite = (packageId: string) => {
    setFavorites(favorites.filter(id => id !== packageId));
  };

  const toggleFavorite = (packageId: string) => {
    if (favorites.includes(packageId)) {
      removeFavorite(packageId);
    } else {
      addFavorite(packageId);
    }
  };

  const isFavorite = (packageId: string) => {
    return favorites.includes(packageId);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite
  };
};