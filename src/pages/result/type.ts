export type ITrackList = {
  isLoading: boolean;
  isHasMore: boolean | null;
  limit: number;
  items: Itrack[];
};

export type Itrack = {
  artistName: string;
  trackName: string;
  trackPrice: number;
  artworkUrl60: string;
  trackId: number;
  primaryGenreName: string;
  previewUrl: string;
};
