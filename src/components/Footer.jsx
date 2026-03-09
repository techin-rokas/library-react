function Footer() {
  return (
    <footer className="bg-emerald-500 text-white py-4 mt-auto shadow-inner">
      <div className="container mx-auto px-4 flex flex-col items-center gap-1">
        <p className="text-sm md:text-base text-center">
          &copy; {new Date().getFullYear()} Created by Rokas
        </p>
      </div>
    </footer>
  );
}

export default Footer;
