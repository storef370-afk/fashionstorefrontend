function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-pink-600">Elvis Fashion Store</h1>
        <nav className="space-x-4">
          <a href="#" className="hover:text-pink-500">Home</a>
          <a href="#" className="hover:text-pink-500">Shop</a>
          <a href="#" className="hover:text-pink-500">Contact</a>
        </nav>
      </header>

      <main className="p-6 text-center">
        <h2 className="text-3xl font-semibold mb-4">Welcome to Elvis Fashion Store</h2>
        <p className="mb-8">We sell quality clothes, shoes, and unisex wears for adults and children.</p>
        <button className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700">
          Shop Now
        </button>
      </main>

      <footer className="bg-white text-center p-4 mt-10 shadow-inner">
        <p>© 2025 Elvis Fashion Store. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
