import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './despesas.jpeg';
import './App.css';

type Despesa = {
  id: number;
  nome: string;
  valor: number;
}
const AZURE_APP_NAME = "app-spring-boot.azurewebsites.net";
const API_URL = `https://${AZURE_APP_NAME}/`;
const App = () => {


  const api = axios.create({
    baseURL: API_URL,
  });

  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [erros, setErros] = useState<boolean>(false);

  useEffect(() => {
    api
      .get("/despesas")
      .then((a) => {
        setDespesas(a.data);
      })
      .catch((e) => {
        console.log("Não foi possivel carrregar lista de despesas");
        setErros(true);
      });
  }, []);


  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
        <p>DESPESAS DO MÊS </p>

        {erros && <div>Erro de conexão com o backend</div>}
        <div style={{width: '700px'}}>
        {despesas &&<div style={{display:'flex', justifyContent:'space-between', width:'100%', color:'yellow'}}>
                <div>ID</div>
                <div> NOME</div>
                <div> VALOR</div>
              </div>}
        {despesas &&
          despesas.map((a) => (
            <>            
              <div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
                <div>{a.id.toString().padStart(5,'0')}</div>
                <div > {a.nome}</div>
                <div > {(Math.round(a.valor * 100) / 100).toFixed(2)}</div>

              </div>
            </>
          ))}
          </div>
      </header>
    </div>
  );
}

export default App;

