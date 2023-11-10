import styles from "./home.module.css";
import Header from "../header/header";

export default function Home() {
  return (
    <div>
      <Header currentPage="home" />
      <div className={styles.container}>
        <h1> GeekTrust Challange!</h1>
        <br />
        <p>
          {" "}
          There is a planet Lengaburu…in the distant distant galaxy of Tara B.
          After the recent war with neighbouring planet Falicornia, King Shan
          has exiled the Queen of Falicornia for 15 year
        </p>
        <p>
          Queen Al Falcone is now in hiding. But if King Shan can find her
          before the years are up, she will be exiled for another 15 years….
        </p>
        <p>
          {" "}
          King Shan has received intelligence that Al Falcone is in hiding in
          one of these 6 planets - DonLon, Enchai, Jebing, Sapir, Lerbin &
          Pingasor. However he has limited resources at his disposal & can send
          his army to only 4 of these planets.
        </p>
        <p>
          {" "}
          Choose 4 planets from avaliabel 6 and send space vechiles to the
          destined planets to find the Qeen{" "}
        </p>
        <h4>Konw more about planets and Space vehicles...</h4>
      </div>
    </div>
  );
}
