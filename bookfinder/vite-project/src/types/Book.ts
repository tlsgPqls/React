export type Book = {
  title: string;
  publisher: string;
  datetime: string;
  authors: string[];
  thumbnail: string;
  url: string;
  isbn: string;
  contents: string;
};
export type ApiResponse<T> = {
  documents: T[];
  meta: {
    is_end: boolean;
  };
};
