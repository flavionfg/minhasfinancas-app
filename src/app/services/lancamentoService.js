import ApiService from '../apiservice'

export default class LacamentoService extends ApiService {

    constructor(){
        super('/api/lancamentos')
    }

    consultar(lancamentoFiltro){
        
        let params = `?ano=&{lancamentoFiltro.ano}`

        if(lancamentoFiltro.tipo){
            params = `${params}&mes=${lancamentoFiltro.tipo}`
        }

        if(lancamentoFiltro.mes){
            params = `${params}&tipo=${lancamentoFiltro.mes}`
        }

        if(lancamentoFiltro.status){
            params = `${params}&status=${lancamentoFiltro.status}`
        }

        return this.get(params)
    }
}