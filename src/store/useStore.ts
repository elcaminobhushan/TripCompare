import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favorites: string[];
  addFavorite: (packageId: string) => void;
  removeFavorite: (packageId: string) => void;
  toggleFavorite: (packageId: string) => void;
  isFavorite: (packageId: string) => boolean;
}

interface CompareState {
  compareList: string[];
  addToCompare: (packageId: string) => boolean;
  removeFromCompare: (packageId: string) => void;
  isInCompareList: (packageId: string) => boolean;
  clearCompareList: () => void;
}

// Favorites store
export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (packageId) => {
        if (!get().favorites.includes(packageId)) {
          set((state) => ({ favorites: [...state.favorites, packageId] }));
        }
      },
      removeFavorite: (packageId) => {
        set((state) => ({
          favorites: state.favorites.filter(id => id !== packageId)
        }));
      },
      toggleFavorite: (packageId) => {
        const isFavorite = get().favorites.includes(packageId);
        if (isFavorite) {
          get().removeFavorite(packageId);
        } else {
          get().addFavorite(packageId);
        }
      },
      isFavorite: (packageId) => {
        return get().favorites.includes(packageId);
      },
    }),
    {
      name: 'favorites-storage',
      version: 1,
    }
  )
);

// Compare store
export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      compareList: [],
      addToCompare: (packageId) => {
        if (!get().compareList.includes(packageId) && get().compareList.length < 3) {
          set((state) => ({ compareList: [...state.compareList, packageId] }));
          return true;
        }
        return false;
      },
      removeFromCompare: (packageId) => {
        set((state) => ({
          compareList: state.compareList.filter(id => id !== packageId)
        }));
      },
      isInCompareList: (packageId) => {
        return get().compareList.includes(packageId);
      },
      clearCompareList: () => set({ compareList: [] }),
    }),
    {
      name: 'compare-storage',
      version: 1,
    }
  )
);