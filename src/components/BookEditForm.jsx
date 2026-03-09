// Importuojame useState ir useEffect hookus iš React
// useState naudojame local state valdymui (klaidų pranešimams)
// useEffect naudojame sinchronizuoti formos laukus su book prop
import { useState, useEffect } from "react";
// Importuojame useForm iš react-hook-form, kad valdytume formą ir validaciją
import { useForm } from "react-hook-form";
// Importuojame funkciją, kuri atnaujina knygą API pagal jos id
import updateData from "../services/update";

// book - objektas su knygos duomenimis, setFormShow - funkcija rodanti ar formą parodyti
function BookEditForm({ book, setFormShow }) {
  const [error, setError] = useState(""); // laikome klaidos pranešimą, jei update nepavyksta
  const { id, title } = book; // išskiriame id ir title iš book objekto

  // Konfigūruojame useForm hooką
  const {
    register, // funkcija, pririša inputus prie formos valdymo
    handleSubmit, // funkcija, apdoroja formos submit ir validaciją
    reset, // funkcija, kuri išvalo arba resetina formos laukus
    formState: { errors }, // objektas su validacijos klaidomis
  } = useForm({
    defaultValues: book, // formos pradinis užpildymas pagal gautą book objektą
  });

  // useEffect, kuris resetina formą, jei book objektas pasikeičia
  useEffect(() => {
    reset(book); // sinchronizuojame inputus su nauju book objektu
  }, [book]);

  // funkcija kuri vykdoma paspaudus Update mygtuką
  const formHandler = async (formData) => {
    try {
      // siunčiame update request į API su id ir formos duomenimis
      // price konvertuojame į Number, kad nebūtų string
      await updateData(id, { ...formData, price: Number(formData.price) });

      // po sėkmingo update uždarome formą
      setFormShow(false);
    } catch (err) {
      // jei įvyko klaida, ją rodome vartotojui
      setError(err.message);
    }
  };

  return (
    <div className="my-2 p-4 border rounded-lg shadow-md bg-white">
      {/* jei yra klaida, rodome ją virš formos */}
      {error && <p className="error">{error}</p>}
      <h2 className="font-bold mb-2 min-h-12">Edit book: {title}</h2>

      <form
        onSubmit={handleSubmit(formHandler)} // React Hook Form funkcija validacijai ir submit
        noValidate // išjungiame naršyklės default validaciją
        className="grid gap-4"
      >
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            className="w-full max-w-full border rounded-lg p-2"
            {...register("title", { required: "Title required", minLength: 3 })}
          />
          <p className="error">{errors.title?.message}</p>
        </div>

        <div>
          <label className="block mb-1 font-medium">Author</label>
          <input
            className="w-full max-w-full border rounded-lg p-2"
            {...register("author", { required: "Author required" })}
          />
          <p className="error">{errors.author?.message}</p>
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            className="w-full max-w-full border rounded-lg p-2"
            {...register("category", { required: "Category required" })}
          />
          <p className="error">{errors.category?.message}</p>
        </div>

        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            step="0.01"
            className="w-full max-w-full border rounded-lg p-2"
            {...register("price", { required: "Price required", min: 0.01 })}
          />
          <p className="error">{errors.price?.message}</p>
        </div>

        <div>
          <label className="block mb-1 font-medium">Cover URL</label>
          <input
            className="w-full max-w-full border rounded-lg p-2"
            {...register("cover", {
              required: "Cover URL required",
              pattern: {
                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i,
                message: "Invalid image URL",
              },
            })}
          />
          <p className="error">{errors.cover?.message}</p>
        </div>

        <div className="flex gap-2 flex-wrap mt-2">
          <button type="submit" className="button button-blue">
            Update
          </button>
          <button
            type="button"
            className="button button-emerald"
            onClick={() => setFormShow(false)} // uždarome formą be submit
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookEditForm;
