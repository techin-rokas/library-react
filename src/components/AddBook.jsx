// importuojame useForm iš react-hook-form, kad valdytume formos duomenis, validaciją ir submit
import { useForm } from "react-hook-form";
// funkcija, kuri siunčia POST užklausą į API, kad sukurtų naują knygą
import postData from "../services/post";
// hookas, leidžiantis programiškai pereiti į kitą puslapį (navigaciją)
import { useNavigate } from "react-router";

// komponentas gauna:
// books - dabartinių knygų masyvą
// setBooks - funkciją, kuria galime atnaujinti knygų masyvą
function AddBook({ books, setBooks }) {
  // useNavigate hookas naudojamas po sėkmingo įrašo nukreipti vartotoją atgal į "/"
  const navigate = useNavigate();
  const {
    register, // funkcija pririša inputus prie formos valdymo
    handleSubmit, // funkcija, kuri apdoroja formos submit
    reset, // funkcija, kuri išvalo arba resetina formos laukus
    formState: { errors }, // objektas su formos validacijos klaidomis
  } = useForm({
    mode: "onBlur", // validacija vyksta, kai laukas praranda fokusą
    reValidateMode: "onChange", // klaidų pervertinimas, kai keičiasi inputas
  });

  // gauname visas unikalias kategorijas iš books masyvo, kad galėtume jas naudoti <select>
  const categories = [...new Set(books.map((b) => b.category))];

  // funkcija kuri vykdoma paspaudus "Add Book"
  const submitHandler = async (formData) => {
    const newBook = {
      ...formData, // paimame visus formos laukus
      price: Number(formData.price), // užtikriname, kad price būtų skaičius
      reserved: false, // nauja knyga prasideda kaip nepriskirta (ne rezervuota)
    };

    try {
      // siunčiame POST užklausą į serverį ir gauname sukurtą knygą su id
      const createdBook = await postData(newBook);

      // atnaujiname books masyvą vietoje, kad nauja knyga iš karto atsirastų sąraše
      setBooks((prev) => [...prev, createdBook]);

      // išvalome formą, kad inputai būtų tušti
      reset();

      // nukreipiame vartotoją atgal į pagrindinį puslapį
      navigate("/");
    } catch (error) {
      // klaidos atveju parodome konsolėje
      console.error("Failed to add book:", error);
    }
  };

  return (
    <div className="flex justify-center mt-10 px-4">
      <form
        // React Hook Form metodas, kuris validuoja formą ir kviečia submitHandler
        onSubmit={handleSubmit(submitHandler)}
        // išjungiame naršyklės default validaciją, kad naudotume tik mūsų
        noValidate
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-4xl grid gap-4 md:grid-cols-2"
      >
        <h2 className="text-2xl font-semibold text-center mb-4 md:col-span-2">
          Add New Book
        </h2>

        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Enter book title"
            {...register("title", {
              required: "Title required",
              minLength: { value: 3, message: "Min 3 characters" },
              maxLength: { value: 100, message: "Max 100 characters" },
            })}
          />
          <p className="error">{errors.title?.message}</p>
        </div>

        <div>
          <label className="block mb-1 font-medium">Author</label>
          <input
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Enter author name"
            {...register("author", {
              required: "Author required",
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Only letters and spaces allowed",
              },
            })}
          />
          <p className="error">{errors.author?.message}</p>
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            {...register("category", { required: "Category required" })}
          >
            <option value="">Select category</option>

            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <p className="error">{errors.category?.message}</p>
        </div>

        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            step="0.01"
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Enter price"
            {...register("price", {
              required: "Price required",
              min: { value: 0.01, message: "Price must be > 0" },
            })}
          />
          <p className="error">{errors.price?.message}</p>
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Cover URL</label>
          <input
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Enter cover image URL"
            {...register("cover", {
              required: "Cover URL required",
              pattern: {
                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i,
                message: "Invalid URL",
              },
            })}
          />
          <p className="error">{errors.cover?.message}</p>
        </div>

        <button
          type="submit"
          className="button button-emerald md:col-span-2 md:max-w-xs md:w-full md:mx-auto"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBook;
