import { getToken } from "../seguranca/Autenticacao";

export const getVendasAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/venda`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": getToken()
        }
    });
    const data = await response.json();
    return data;
};

export const getVendaPorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/venda/${codigo}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": getToken()
        }
    });
    const data = await response.json();
    return data;
};

export const deleteVendaPorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/venda/${codigo}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "authorization": getToken()
        }
    });
    if (!response.ok) throw new Error('Erro ao deletar venda');
    return await response.json();  // Assume that your API returns something on DELETE
};

export const cadastrarVendaAPI = async (venda) => {
    console.log('Enviando venda para API:', JSON.stringify(venda, null, 2));
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/venda`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": getToken()
        },
        body: JSON.stringify(venda)
    });
    const data = await response.json();
    if (!response.ok) {
        console.error('Erro ao salvar venda:', data);
        throw new Error('Erro ao salvar venda');
    }
    console.log('Venda cadastrada com sucesso:', data);
    return data;
};
