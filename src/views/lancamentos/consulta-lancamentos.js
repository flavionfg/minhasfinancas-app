import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentosTable from './lancamentosTable'

import LacamentoService from '../../app/services/lancamentoService'
import localStorageService from '../../app/services/localstorageService'

import * as messages from '../../components/toastr'

class ConsultaLancamentos extends React.Component{

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        lancamentos : []
    }

    constructor(){
        super();
        this.service = new LacamentoService();
    }

    buscar = () => {
        
        if(!this.state.ano){
            messages.mensagemErro('o preenchimento do campo Ano é obrigatório.')
            return false;
        }

        const usuarioLogado = localStorageService.obterItem('_usuario_logado');

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service.consultar(lancamentoFiltro)
                    .then( response => {
                    this.setState({ lancamentos: response.data }) //até a linha de cima ta ok
                }).catch( error => {
                    console.log(error.data)
                })
     }

     editar = (id) => {
         console.log('editando o lancamento ' , id)
     }

     deletar = (id) => {
         console.log('deletando o lancamento ', id)
     }

    render(){

        const meses = this.service.obterListaMeses();

        const tipos = this.service.obterListaTipos();

        return(
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="cold-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text" 
                                        className="form-control" 
                                        value={this.state.ano}
                                        onChange={e => this.setState({ ano: e.target.value })}
                                        id="exampleInputEmail"
                                        placeholder="Digite o Ano"/>

                            </FormGroup>
                            <FormGroup htmlFor="inputMes" label="Mês: ">
                                <SelectMenu id="inputMes" 
                                            value={this.state.mes}
                                            onChange={e => this.setState({ mes: e.target.value })}
                                            className="form-control" 
                                            lista={meses} />
                            </FormGroup>

                            <FormGroup htmlFor="inputDescricao" label="Descrição: ">
                                     <input type="text"     
                                            id="inputDescricao" 
                                            value={this.state.descricao}
                                            onChange={e => this.setState({ descricao: e.target.value })}
                                            className="form-control" 
                                            placeholder="Digite uma descrição" />
                            </FormGroup>

                            <FormGroup htmlFor="inputTipo" label="Tipo Lancamento: ">
                                <SelectMenu id="inputTipo" 
                                            value={this.state.tipo}
                                            onChange={e => this.setState({ tipo: e.target.value })}
                                            className="form-control" 
                                            lista={tipos} />
                            </FormGroup>

                            <br/>

                            <button onClick={this.buscar} type="button" className="btn btn-success">Buscar</button>
                            <button type="button" className="btn btn-danger">Cadastrar</button>

                        </div>

                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos}
                                              deleteAction={this.deletar}
                                              editAction={this.editar} />
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos);