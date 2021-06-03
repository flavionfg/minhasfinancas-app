import React from 'react';

import Rotas from './rotas'
import Navbar from '../components/navbar'

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css'

import {Button} from 'primereact/button';

import 'toastr/build/toastr.min.js'

import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import 'toastr/build/toastr.css'



class App extends React.Component {
  render(){
    return(
      <>
        <Navbar />
        <Button label="Click" icon="pi pi-check" iconPos="right" />
        <div className="container">
            <Rotas />  
        </div>
      </>
    )
  }
}

export default App;
