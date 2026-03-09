// importuojame BookCard, nes čia rodysime visą sąrašą
import BookCard from "./BookCard";

// BookList komponentas – rodome visas knygas kaip korteles tinklelyje
function BookList({ books, toggleReserve, removeBookFromState }) {
  return (
    <div className="max-w-350 mx-auto px-4 py-6">
      <div
        className="grid gap-4 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-4 
        lg:grid-cols-5 
        xl:grid-cols-6"
      >
        {/* maps per books masyvą, kiekvienam book sukuriama BookCard */}
        {books.map((book) => (
          <BookCard key={book.id} book={book} toggleReserve={toggleReserve} onDelete={removeBookFromState} />
        ))}
      </div>
    </div>
  );
}

export default BookList;
