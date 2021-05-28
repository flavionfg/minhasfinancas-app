import React from 'react'

import { withRouter } from 'react-router-dom'
import Card from '../components/card'
import FormGroup from '../components/form-group';

import UsuarioService from '../app/services/usuarioService'
import { mensagemSucesso , mensagemErro } from '../components/toastr'

class CadastroUsuario extends React.Component{

    state = {
        nome : '',
        email : '',
        senha : '',
        senhaRepeticao : ''
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    cadastrar = () => {
       const usuario = {
           nome: this.state.nome,
           email: this.state.email,
           senha: this.state.senha
       }

       this.service.salvar(usuario)
       .then(response => {
            mensagemSucesso('Usuario cadastrado com sucesso! Faça o login para acessar o sistema')
            this.props.history.push('/login')
       }).catch(error => {
           mensagemErro(error.response.data) 
       })
    }

    cancelar = () => {
        this.props.history.push('/login')
    }

    render(){
        return(
                <Card title="Cadastro de Usuario">
                   <div className="row">
                       <div className="col-lg-l2">
                           <div className="bs-component">
                               <FormGroup label="Nome: *" htmlFor="inputNome"> 
                                    <input type="text" 
                                            id="inputNome"
                                            className="form-control"
                                            name="nome" 
                                            onChange={e => this.setState({nome: e.target.value})}/>
                               </FormGroup>
                               <FormGroup label="Email:*" htmlFor="inputEmail">
                                    <input type="email"
                                            id="inputEmail"
                                            className="form-control"
                                            name="email"
                                            onChange={e => this.setState({email: e.target.value})}/>
                               </FormGroup>
                               <FormGroup label="Senha:*" htmlFor="inputSenha">
                                    <input type="password"
                                            id="inputSenha"
                                            className="form-control"
                                            name="senha"
                                            onChange={e => this.setState({senha: e.target.value})}/>
                               </FormGroup>
                               <FormGroup label="Repita a Senha:*" htmlFor="inputRepitaSenha">
                                    <input type="password"
                                            id="inputSenha"
                                            className="form-control"
                                            name="senha"
                                            onChange={e => this.setState({senhaRepeticao: e.target.value})}/>
                               </FormGroup>
                               <button onClick={this.cadastrar} type="button" className="btn btn-success">Salvar</button>
                               <button onClick={this.cancelar} type="button" className="btn btn-danger">Cancelar</button>
                           </div>
                       </div>
                   </div>
                </Card>
        )
    }
}

export default withRouter (CadastroUsuario)