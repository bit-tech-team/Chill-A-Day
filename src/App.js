import "./App.css";
import Music from "./components/Music/Music";
import Coffie from "./components/Coffie/Coffie";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import Banner from "./components/Banner/Banner";
import Controls from "./components/Controls/Controls";
function App() {
  return (
    <div className="container">
      <div className="spotify_section">
        <Music/>
      </div>
      <div className="coffie_section">
        <Coffie/>
      </div>
      <div className="banner_section">
        <Banner/>
      </div>
      <div className="info_section">
        <About/>
      </div>
      <div className="buttons_section">
        <Controls/>
      </div>
      <div className="footer_section">
        <Footer />
      </div>
    </div>
  );
}

export default App;
