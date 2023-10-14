import "./HeaderForm.sass";
import Arrow from "../../assets/images/icon-arrow.svg";
import Msg from "../msg/Msg";

import { useState, useEffect } from "react";

const HeaderForm = () => {
  ///////////////////////////-- MSG --////////////////////////////////
  const [msgType, setMsgType] = useState("");
  const [message, setMessage] = useState("");
  const [isVisibleMsg, setIsVisible] = useState(false);

  useEffect(() => {
    const delay = 3000;
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [isVisibleMsg]);

  ///////////////////////////-- API --////////////////////////////////
  const [ip, setIp] = useState("");
  const [userIp, steUserIp] = useState("");
  const [checkedIP, setCheckedIP] = useState("");
  const [apiRes, setApiRes] = useState([]);
  const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/; // Define o padrão do IP

  ///////////////////////////--  Take the user IP --////////////////////////////////
  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        steUserIp(data.ip);
      })
      .catch((error) => {
        console.error("Erro ao obter o endereço IP:", error);
      });
  }, []);

  ///////////////////////////--  API IP ADRESS TRACKER --////////////////////////////////
  useEffect(() => {
    fetch(
      `https://geo.ipify.org/api/v2/country?apiKey=at_30Dnnp30ALHFgjEb2NKITwor0iUXb&ipAddress=${checkedIP}`
    )
      .then((res) => res.json())
      .then((data) => {
        setApiRes(data);
        console.log(data);
      })
      .catch((err) => console(`ERRO AQUI Ó ------------> ${err}`));
  }, [checkedIP]);

  //////////////////////////-- CHECK IF IT IS VALID TO SEND --/////////////////////////////

  const checkIp = (e) => {
    e.preventDefault();
    setMessage("");
    setMsgType("");
    setIsVisible(false);

    if (!ipPattern.test(ip)) {
      setMsgType("error");
      setMessage("Invalid IP. Use the format 123.123.123.123");
      setIsVisible(true);

      return;
    }

    setMessage("IP has been verified");
    setMsgType("success");
    setIsVisible(true);
    submit();
  };

  ///////////////////-- Submitting API Requisition --///////////////////////
  const submit = () => {
    setCheckedIP(ip);
    setIp("");
  };

  return (
    <>
      <Msg mensagemType={msgType} mensagem={message} isVisible={isVisibleMsg} />

      <form onSubmit={(e) => checkIp(e)}>
        <input
          className="input-txt"
          type="text"
          value={ip}
          onChange={(newIp) => setIp(newIp.target.value)}
          placeholder="Search for any IP addres or domain"
        ></input>
        <button type="submit">
          <img src={Arrow} alt="Arrow icon (>)" />
        </button>
        <small>{`This is your IP:${userIp}`}</small>
      </form>

      <div className="main-home-results">
        <div className="res">
          <h3>IP ADDRESS</h3>
          <p>{apiRes.ip ? apiRes.ip : `${checkedIP}`}</p>
        </div>
        <div className="res">
          <h3>LOCATION</h3>
          <p>
            {apiRes.location ? `${apiRes.location.region}, ` : "No location"}
            {apiRes.location ? apiRes.location.country : ""}
          </p>
        </div>
        <div className="res">
          <h3>TIMEZONE</h3>
          <p>
            {apiRes.location ? `UTC ${apiRes.location.timezone}` : "UTC -00:00"}
          </p>
        </div>

        <div className="res">
          <h3>ISP</h3>
          <span>{apiRes.isp ? apiRes.isp : "No isp"}</span>
        </div>
      </div>
    </>
  );
};

export default HeaderForm;
