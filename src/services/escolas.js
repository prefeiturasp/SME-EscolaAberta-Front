import { URL_API } from './base';

export async function listarEscolas(nomesc, tipoesc, dre, pagina) {
    var filtros = '';
    if (dre === undefined) dre = null;
    if (tipoesc === undefined) tipoesc = null;
    if (nomesc === undefined) nomesc = null;
    if (pagina === undefined) pagina = 1;

    filtros += 'search=' + nomesc;
    filtros += '&dre=' + dre;
    filtros += '&tipoesc=' + tipoesc;
    filtros += '&page=' + pagina;

    return fetch(`${URL_API}/escolas/?${filtros}`).then(
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