import { useState } from "react";
import { useApi } from "../hooks";

const NewBook = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { Books } = useApi();

  const createNewBook = async () => {
    try {
      const { status, data } = await Books.createNewBook(title, description);

      console.log(status, data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      new Book
      <input
        type="text"
        placeholder="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={createNewBook}>Submit</button>
    </div>
  );
};

export default NewBook;
