import { URL_API } from './base';

export async function listarEscolas() {
    const escolas = await fetch(`${URL_API}/escolas`);
    return await escolas.json();
}

export async function listarTiposEscola() {
    const tipos = await fetch(`${URL_API}/tipo_escola`);
    return await tipos.json();
}

export async function listarDREs() {
    const dres = await fetch(`${URL_API}/diretorias`);
    return await dres.json();
}