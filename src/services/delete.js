import axios from "axios";
import { getOne } from "./get";

const API_URL = import.meta.env.VITE_API_URL;

const deleteBook = async (id) => {
  const book = await getOne(id);

  const confirmed = window.confirm(
    `Are you sure you want to delete "${book.title}"?`,
  );

  if (!confirmed) return;

  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export default deleteBook;
