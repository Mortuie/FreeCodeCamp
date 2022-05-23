import { AxiosInstance } from "axios";

export default class BooksV1 {
  constructor(private readonly axios: AxiosInstance) {}

  public getBookById(id: number) {
    return this.axios.get(`/v1/books/${id}`);
  }

  public getBooks(limit: number = 20, offset: number = 0) {
    return this.axios.get(`/v1/books`, {
      params: {
        limit,
        offset,
      },
    });
  }

  public createBook(
    title: string,
    description: string,
    image: string | null = null
  ) {
    if (!image)
      return this.axios.post("/v1/books", {
        title,
        description,
      });

    return this.axios.post("/v1/books", {
      image,
      title,
      description,
    });
  }
}
