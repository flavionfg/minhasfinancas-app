import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentosTable from './lancamentosTable'

import LacamentoService from '../../app/services/lancamentoService'
import localStorageService from '../../app/services/localstorageService'

class ConsultaLancamentos extends React.Component{

    state = {
        ano: '',
        mes: '',
        tipo: '',
        lancamentos : []
    }

    constructor(){
        super();
        this.service = new LacamentoService();
    }

    buscar = () => {
        
        const usuarioLogado = localStorageService.obterItem('_usuario_logado');

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            usuario: usuarioLogado.id
        }

        this.service.consultar(lancamentoFiltro)
                    .then( response => {
                    this.setState({ lancamentos: response.data }) //até a linha de cima ta ok
                    console.log("teste : " + response.data)
                }).catch( error => {
                    console.log(error.data)
                })
     }

    render(){

        const meses = [

            { label: 'Selecione...', value: ''},
            { label: 'Janeiro', value: 1 },
            { label: 'Fevereiro', value: 2 },
            { label: 'Marco', value: 3 },
            { label: 'Abril', value: 4 },
            { label: 'Maio', value: 5 },
            { label: 'Junho', value: 6 },
            { label: 'Julho', value: 7 },
            { label: 'Agosto', value: 8 },
            { label: 'Setembro', value: 9 },
            { label: 'Outrubro', value: 10 },
            { label: 'Novembro', value: 11 },
            { label: 'Dezembro', value: 12 },

        ]

        const tipos = [

            { label : 'Selecione...', value: '' },
            { label : 'Despesa', value: 'DESPESA' },
            { label : 'Receita', value: 'RECEITA' }

        ]

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
                            <LancamentosTable lancamentos={this.state.lancamentos} />
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos);