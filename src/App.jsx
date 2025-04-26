import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";

function App() {
  return (
    <CartContextProvider>
      <main className="bg-orange-600 min-h-screen flex flex-col">
        <Header />
        <Meals />
      </main>
    </CartContextProvider>
  )
}

export default App;