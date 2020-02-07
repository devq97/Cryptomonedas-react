import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/UseCriptomoneda";
import axios from 'axios';

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  
  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = () => {

  const [listaCripto, guardarCriptomonedas] = useState([]);

  const MONEDAS = [
    { codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
    { codigo: 'MXN', nombre: 'Peso Mexicano'},
    { codigo: 'EUR', nombre: 'Euro'},
    { codigo: 'GBP', nombre: 'Libra Esterlina'},
    { codigo: 'COP', nombre: 'Peso Colombiano'}
  ];

  const [moneda, SelectMonedas] = useMoneda('Elige tu Moneda', '', MONEDAS);
  const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listaCripto);

  useEffect(() => {
    const consultarAPI = async () => {
      const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

      const resultado = await axios.get(url);
      guardarCriptomonedas(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  return (
    <form>
      <SelectMonedas />
      <SelectCripto/>
      <Boton
        type="submit"
        value="Calcular"
      />
    </form>
  )
};

export default Formulario;