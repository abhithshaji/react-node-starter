import { Routes, Route } from "react-router";

function App() {
  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={<h1>Vite-Node Starter Template</h1>}
        />
      </Routes>
    </main>
  );
}

export default App;
