import { URL_API } from './base';

export async function listarEscolas(nomesc, tipoesc, dre, pagina) {
    var filtros = '';
    if (dre === undefined) dre = '';
    if (tipoesc === undefined) tipoesc = '';
    if (nomesc === undefined) nomesc = '';
    if (pagina === undefined) pagina = '1';

    filtros += '&dre=' + dre;
    filtros += '&tipoesc=' + tipoesc;

    return fetch(`${URL_API}/escolas/?search=${nomesc}${filtros}&page=${pagina}`).then(
        escolas => escolas.json()
    )
}

export async function listarTiposEscola() {
    return fetch(`${URL_API}/tipo_escola`).then(
        tipos => tipos.json()
    )
}

export async function listarDREs() {
    return fetch(`${URL_API}/diretorias`).then(
        dres => dres.json()
    )
}