import { getToken } from "../seguranca/Autenticacao";

export const getProdutosAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/produto`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": getToken()
        }
    });
    const data = await response.json();
    return data.map(produto => ({
        ...produto,
        valor: parseFloat(produto.valor)  // Garantindo que valor é um número
    }));
};

export const getProdutoPorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/produto/${codigo}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": getToken()
        }
    });
    const data = await response.json();
    return {
        ...data,
        valor: parseFloat(data.valor)  // Garantindo que valor é um número
    };
};

export const deleteProdutoPorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/produto/${codigo}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "authorization": getToken()
        }
    });
    const data = await response.json();
    return data;
};

export const cadastrarProdutoAPI = async (metodo, objeto) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/produto`, {
        method: metodo,
        headers: {
            "Content-Type": "application/json",
            "authorization": getToken()
        },
        body: JSON.stringify(objeto)
    });
    const data = await response.json();
    return data;
};

export const atualizarEstoqueProdutoAPI = async (produtoId, quantidade) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/produto/${produtoId}/estoque`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "authorization": getToken()
        },
        body: JSON.stringify({ quantidade })
    });
    if (!response.ok) throw new Error('Erro ao atualizar estoque');
    return await response.json();
};
