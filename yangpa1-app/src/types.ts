export default interface SaleData {
  mal_id: number;
  url: string;
  title: string;
  type: string;
  duration: string;
  score: number;
  background: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
}
