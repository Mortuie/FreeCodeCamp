import { Container } from "../layout";
import { Button, Input } from "../components";
import { useState } from "react";
import { useApi } from "../hooks";

const NewBook = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const { BooksV1 } = useApi();

  // const _newBook = () => Promise<void>;
  // const _newBook = () => {
  //   if (image.length === 0) {
  //     return BooksV1.createBook(title, description);
  //   } else {
  //     return BooksV1.createBook(title, description, image);
  //   }
  // };

  return (
    <Container>
      <div className="flex flex-col m-auto">
        <div className="text-2xl text-center mb-3">New Book</div>

        <div className="flex flex-col m-auto w-64 rounded-lg shadow-2xl bg-white p-3">
          <Input
            placeholder="Title"
            className="mt-6 mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Input
            placeholder="Description"
            className="mb-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Input
            placeholder="Image (Optional)"
            className="mb-4"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          {/* <Button buttonText="List Book" secondary onClick={_newBook} /> */}
        </div>
      </div>
    </Container>
  );
};

export default NewBook;
