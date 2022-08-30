import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Error from "./Error";
import useSelectCoins from "../hooks/useSelectCoins";
import { coins } from "../data/coins";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  margin-top: 30px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

const Form = ({setCoins}) => {
  const [cryptos, setCryptos] = useState([]);
  const [error, setError] = useState(false);

  const [coin, SelectCoin] = useSelectCoins("Elige tu Moneda", coins);
  const [cryptocoin, SelectCryptocoin] = useSelectCoins(
    "Elige tu Criptomoneda",
    cryptos
  );

  useEffect(() => {
    const consultingAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const response = await fetch(url);
      const result = await response.json();

      const arrayCryptos = result.Data.map((crypto) => {
        const object = {
          id: crypto.CoinInfo.Name,
          name: crypto.CoinInfo.FullName,
        };

        return object;
      });

      setCryptos(arrayCryptos);
    };
    consultingAPI();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([coin, cryptocoin].includes("")) {
      setError(true);
      return;
    }
    setError(false)
    setCoins({
        coin, 
        cryptocoin
    })
  };

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form onSubmit={handleSubmit}>
        <SelectCoin />
        <SelectCryptocoin />

        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  );
};

export default Form;
