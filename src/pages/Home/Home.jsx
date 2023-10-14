//imports
import "./Home.sass";
import Maps from "../../components/maps/Maps";
import HeaderForm from "../../components/headerForm/HeaderForm";

const Home = () => {


  return (
    <main className="main-container">
      <section className="main-home-top">
        <h1>IP Address Tracker</h1>
        <HeaderForm />
        {/* <div className="main-home-results">
          <div className="res">
            <h3>IP ADDRESS</h3>
            <p>{dadoArrived ? dadoArrived.ip : "---"}</p>
          </div>
          <div className="res">
            <h3>LOCATION</h3>
            <p>192.212.172.101</p>
          </div>
          <div className="res">
            <h3>TIMEZONE</h3>
            <p>192.212.172.101</p>
          </div>
          <div className="res">
            <h3>ISP</h3>
            <span>apenas um teste 1</span>
          </div>
        </div> */}
      </section>

      <Maps />
    </main>
  );
};

export default Home;
