import { Advertisment } from '../../types.ts';
import { useAppSelector } from '../store/store.ts';

export function useFilteredAdvertisements(advertisements: Advertisment[]) {
  const { keyword } = useAppSelector((state) => state.advertisement);

  let filteredAdvertisements = advertisements;

  if (keyword) {
    filteredAdvertisements = filteredAdvertisements.filter((ad) => {
      return ad.name.toLowerCase().includes(keyword.toLowerCase());
    });
  }

  return filteredAdvertisements;
}
