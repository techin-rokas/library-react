// React hook'ai: useState būsenai, useEffect efektams
import { useState, useEffect } from "react";
// App stiliai
import "./App.css";
// Komponentas, rodantis knygų sąrašą
import BookList from "./components/BookList";
// Servisas visų knygų gavimui
import { getAllData } from "./services/get";
// Servisas knygos atnaujinimui
import updateData from "./services/update";
// Komponentas naujai knygai pridėti
import AddBook from "./components/AddBook";
// React Router elementai puslapių maršrutavimui
import { Routes, Route } from "react-router";
// Viršutinė navigacijos juosta
import NavBar from "./components/NavBar";
// Apatinė puslapio juosta
import Footer from "./components/Footer";

function App() {
  // Būsenos kintamasis knygų sąrašui
  const [books, setBooks] = useState([]);

  // Funkcija visų knygų gavimui iš serverio
  const fetchBooks = async () => {
    const booksList = await getAllData(); // kviečiame GET servisą
    setBooks(booksList); // atnaujiname būseną su gautomis knygomis
  };

  // useEffect paleidžiamas komponento mount metu
  useEffect(() => {
    const getData = async () => {
      await fetchBooks(); // gauname knygas kai puslapis užsikrauna
    };
    getData();
  }, []); // tuščias dependecy array -> vyksta tik vieną kartą

  // Funkcija rezervacijos perjungimui (borrow/return)
  const toggleReserve = async (id) => {
    const book = books.find((b) => b.id === id); // randame knygą pagal id
    if (!book) return;

    const updatedBook = { reserved: !book.reserved }; // paruošiame pakeitimus

    try {
      await updateData(id, updatedBook); // siunčiame PUT request serveriui

      // atnaujiname vietinę būseną, kad UI persišvytų
      setBooks((prevBooks) =>
        prevBooks.map((b) =>
          b.id === id ? { ...b, reserved: !b.reserved } : b,
        ),
      );
    } catch (error) {
      console.error("Failed to update book:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={<BookList books={books} toggleReserve={toggleReserve} />}
          />

          <Route
            path="/addbook"
            element={<AddBook books={books} setBooks={setBooks} />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
