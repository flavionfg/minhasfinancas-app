import React from 'react';

class App extends React.Component {

  state = {
    nome : 'Flavio'
  }

  render(){
    return(
      <div>
          <label>Hello {this.state.nome} </label>
      </div>
    )
  }
}

export default App;
