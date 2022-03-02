import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../hooks";

const NewBook = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const { Books } = useApi();

  const createNewBook = async () => {
    try {
      const { status, data } = await Books.createNewBook(title, description);

      if (status === 200) {
        navigate("/");
      } else {
        console.log(data);
      }
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
