// importuojame useState, nes mums reikia sekti, ar esame edit režime
import { useState } from "react";
// importuojame BookEditForm komponentą, kuris bus rodomas, kai vartotojas spaudžia "Edit"
import BookEditForm from "./BookEditForm";
// importuojame delete servisą, kad galėtume ištrinti knygą
import deleteBook from "../services/delete";

// Komponentas BookCard – vienos knygos kortelė
function BookCard({ book, toggleReserve }) {
  // editMode seka, ar kortelė šiuo metu redaguojama
  const [editMode, setEditMode] = useState(false);

  // iš book objektų išskiriame id, kad galėtume naudoti delete ar toggle funkcijoms
  const { id } = book;

  // funkcija ištrina knygą
  const handleDelete = async () => {
    try {
      // kviečiame servisą, kuris ištrina knygą pagal id
      await deleteBook(id);
      // po sėkmingo ištrynimo perkrauname puslapį, kad atspindėtų pakeitimą
      window.location.reload();
    } catch (err) {
      // jei įvyko klaida, tik atspausdiname ją konsolėje
      console.log(err.message);
    }
  };

  // jei editMode true, rodom BookEditForm komponentą vietoje kortelės
  if (editMode) {
    return <BookEditForm book={book} setFormShow={setEditMode} />;
  }
  // pagrindinis kortelės div'as
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative w-full aspect-2/3">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover"
        />
        {/* Jei knyga rezervuota, rodom overlay „Reserved“ */}
        {book.reserved && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center text-white font-bold text-lg pointer-events-none">
            Reserved
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col grow">
        <div>
          <h3 className="font-semibold text-lg line-clamp-2 min-h-14">
            {book.title}
          </h3>

          <p className="text-gray-600 text-sm">{book.author}</p>
          <p className="text-gray-500 text-sm">{book.category}</p>
        </div>

        <div className="mt-auto pt-3">
          <p className="font-bold mb-2">{book.price} €</p>

          {/* Toggle rezervacijos mygtukas: jei reserved, rodo Return, kitaip Borrow */}
          <button
            onClick={() => toggleReserve(book.id)}
            className={`button ${book.reserved ? "button-emerald" : "button-blue"}`}
          >
            {book.reserved ? "Return" : "Borrow"}
          </button>

          {/* Edit mygtukas – įjungia editMode */}
          <button
            onClick={() => setEditMode(true)}
            className="button button-emerald my-2"
          >
            Edit
          </button>

          {/* Delete mygtukas – kviečia handleDelete funkciją */}
          <button onClick={handleDelete} className="button button-red">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
