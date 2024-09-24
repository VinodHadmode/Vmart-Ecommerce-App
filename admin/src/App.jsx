import Navbar from "./Components/Navbar"
import Sidebar from "./Components/Sidebar"

function App() {

  return (
    <div className="bg-gray-50 min-h-screen">
      <>
        <Navbar />
        <hr />
        <div className="flex">
          <Sidebar />
          <div className="w-full p-8">
            {/* Main content for the admin panel will go here */}
          </div>
        </div>
      </>
    </div>
  )
}

export default App
