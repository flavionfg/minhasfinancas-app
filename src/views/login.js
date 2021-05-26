import React from 'react'
import axios from 'axios'

import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'

class Login extends React.Component{

    state = {
        email: '',
        senha: '',
        mensagemErro: null
    }

    entrar = async () => {
        try{
            const response = await axios
            .post('http://localhost:8080/api/usuarios/autenticar', {
                email: this.state.email,
                senha: this.state.senha
            })
            console.log('responsta: ', response)
            console.log('requisicao encerrada')
        }catch(erro){
            console.log(erro.response)
        }
    }

    prepareCadastrar = () => {
        this.props.history.push('/cadastro-usuarios')
    }

    render(){
        return(

            <div className="row">
                <div className="col-md-6" style={ {position : 'relative', left: '300px'} }>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <span>{this.state.mensagemErro}</span>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup Label="Email: *" htmlFor="exampleInputEmail1">
                                                <input type="email"
                                                        value={this.state.email}
                                                        onChange={e => this.setState({email: e.target.value})}
                                                        className="form-control"
                                                        id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder="Digite o Email" />                       
                                            </FormGroup>
                                            <FormGroup Label="Senha: *" htmlFor="exampleInputPassword1">
                                                <input type="password"
                                                       value={this.state.senha}
                                                       onChange={e => this.setState({senha: e.target.value})}
                                                       className="form-control"
                                                       id="exampleInputPassword1"
                                                       placeholder="Password" />
                                            </FormGroup>
                                            <button onClick={this.entrar} className="btn btn-success">Entrar</button>
                                            <button onClick={this.prepareCadastrar} className="btn btn-danger">Cadastrar</button>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter ( Login )