import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentosTable from './lancamentosTable'
import LacamentoService from '../../app/services/lancamentoService'
import localStorageService from '../../app/services/localstorageService'

import * as messages from '../../components/toastr'

import {Dialog} from 'primereact/dialog';
import { Button } from 'primereact/button';

class ConsultaLancamentos extends React.Component{

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        showConfirmDialog: false,
        lancamentoDeletar: {},
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
                    this.setState({ lancamentos: response.data })
                }).catch( error => {
                    console.log(error.data)
                })
     }

     editar = (id) => {
        this.props.history.push(`/cadastro-lancamentos/${id}`)
     }

     abrirConfirmacao = (lancamento) => {
         this.setState({ showConfirmDialog : true, lancamentoDeletar: lancamento })
     }

     CancelarDelecao = () => {
        this.setState({ showConfirmDialog : false, lancamentoDeletar: {} })
     }

     deletar = () => {
         this.service.deletar(this.state.lancamentoDeletar) //no curso é passado lancamento.id, mas pra min não funcionou.
                .then(response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(this.lancamentoDeletar)
                lancamentos.splice(index, 1);
                this.setState( { lancamentos: lancamentos, showConfirmDialog: false} )
                 messages.mensagemSucesso('Lançamento deletado com sucesso!')
             }).catch(error => {
                 messages.mensagemErro('Ocorreu um erro ao tentar deletar o Lançamento')
             })
     }

     preparaFormularioCadastro = () => {
         this.props.history.push('/cadastro-lancamentos')
     }

    alterarStatus = (lancamento, status) => {
        this.service
            .alterarStatus(lancamento.id, status)
            .then( response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(lancamento);
                if(index !== -1){
                    lancamento['status'] = status;
                    lancamentos[index] = lancamento
                    this.setState({lancamento});
                }
                messages.mensagemSucesso("Status atualizado com sucesso!")
            })
    }

    render(){

        const meses = this.service.obterListaMeses();

        const tipos = this.service.obterListaTipos();

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.CancelarDelecao}
                        className="p-button-secondary" />
            </div>
        );

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
                            <button onClick={this.preparaFormularioCadastro} type="button" className="btn btn-danger">Cadastrar</button>

                        </div>

                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos}
                                              deletar={this.abrirConfirmacao}
                                              editar={this.editar}
                                              alterarStatus={this.alterarStatus} />
                        </div>
                    </div>
                </div>
                <div>
                <Dialog header="Confirmação" 
                        visible={this.state.showConfirmDialog} 
                        style={{ width: '50vw' }} 
                        footer={confirmDialogFooter}
                        modal={true}
                        onHide={() => this.setState({showConfirmDialog: false})}>
                    Confirma a exclusão deste lançamento?
                </Dialog>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos);