import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      {/* Tu peux mettre ici une Navbar ou un Header global */}
      <Outlet />
    </div>
  );
}

export default App;
