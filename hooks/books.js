import axios from "axios";

export const fetchBooks = async () => {
  try {
    const { data } = await axios.get("/api/admin/book");
    return data?.books || [];
  } catch (error) {
    console.error("🚀 ~ fetchBooks ~ error:", error);
    return [];
  }
};
export const fetchBookById = async () => {
  try {
    const { data } = await axios.get("/api/admin/book");
    return data?.books || [];
  } catch (error) {
    console.error("🚀 ~ fetchBooks ~ error:", error);
    return [];
  }
};
