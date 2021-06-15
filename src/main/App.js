import React from 'react';

import Rotas from './rotas'
import Navbar from '../components/navbar'
import ProvedorAutenticacao from './provedorAutenticao';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css'

import 'toastr/build/toastr.min.js'

import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import 'toastr/build/toastr.css'



class App extends React.Component {
  render(){
    return(
      <ProvedorAutenticacao>
        <Navbar />
        <div className="container">
            <Rotas />  
        </div>
      </ProvedorAutenticacao>
    )
  }
}

export default App;
