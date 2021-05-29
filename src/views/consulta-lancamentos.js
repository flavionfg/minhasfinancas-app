import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../components/card'
import FormGroup from '../components/form-group'


class ConsultaLancamentos extends React.Component{

    render(){
        return(
            <Card title="Consulta Lancaçmentos">
                <div className="row">
                    <div className="cold-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text" 
                                        class="form-control" 
                                        id="exampleInputEmail"
                                        aria-describedby="emailHelp"
                                        placeholder="Digite o Ano"/>
                            </FormGroup>
                            <FormGroup htmlFor="inputMes" label="Mês: ">

                            </FormGroup>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos);