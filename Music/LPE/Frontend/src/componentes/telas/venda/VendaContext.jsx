import React, { createContext, useState, useEffect } from 'react';
import { getVendasAPI, cadastrarVendaAPI, getVendaPorCodigoAPI, deleteVendaPorCodigoAPI } from '../../../servicos/VendaServico';
import { getProdutosAPI } from '../../../servicos/ProdutoServico';
import { getUsuario } from '../../../seguranca/Autenticacao';

export const VendaContext = createContext();

export const VendaProvider = ({ children }) => {
    const usuario = getUsuario(); // Obtém o usuário logado
    const [vendas, setVendas] = useState([]);
    const [vendaAtual, setVendaAtual] = useState({ 
        codigo: '', 
        data: new Date().toISOString().split('T')[0], 
        total: 0, 
        usuario: usuario.email, // Armazena apenas o email do usuário
        itens: [] // Inicializando itens como um array vazio
    });
    const [alerta, setAlerta] = useState({ status: '', message: '' });
    const [produtos, setProdutos] = useState([]);

    const fetchVendas = async () => {
        try {
            const fetchedVendas = await getVendasAPI();
            setVendas(fetchedVendas);
        } catch (error) {
            console.error('Failed to fetch vendas', error);
            setAlerta({ status: 'error', message: 'Erro ao carregar vendas.' });
        }
    };

    const fetchProdutos = async () => {
        try {
            const fetchedProdutos = await getProdutosAPI();
            setProdutos(fetchedProdutos);
        } catch (error) {
            console.error('Failed to fetch produtos', error);
            setAlerta({ status: 'error', message: 'Erro ao carregar produtos.' });
        }
    };

    useEffect(() => {
        fetchVendas();
        fetchProdutos();
    }, []);

    const cadastrarVenda = async (venda) => {
        try {
            console.log('Cadastrando venda:', JSON.stringify(venda, null, 2));
            await cadastrarVendaAPI(venda);
            setAlerta({ status: 'success', message: 'Venda cadastrada com sucesso!' });
            fetchVendas();
        } catch (error) {
            console.error('Failed to cadastrar venda', error);
            setAlerta({ status: 'error', message: 'Erro ao cadastrar venda.' });
        }
    };

    const editarVenda = async (codigo) => {
        try {
            const venda = await getVendaPorCodigoAPI(codigo);
            setVendaAtual({ ...venda, itens: venda.itens || [] }); // Garantindo que itens é sempre um array
        } catch (error) {
            console.error('Failed to fetch venda', error);
            setAlerta({ status: 'error', message: 'Erro ao carregar venda.' });
        }
    };

    const removerVenda = async (codigo) => {
        if (window.confirm('Deseja remover esta venda?')) {
            try {
                await deleteVendaPorCodigoAPI(codigo);
                setAlerta({ status: 'success', message: 'Venda removida com sucesso!' });
                fetchVendas();
            } catch (error) {
                console.error('Failed to delete venda', error);
                setAlerta({ status: 'error', message: 'Erro ao remover venda.' });
            }
        }
    };

    const adicionarItem = (produtoId, quantidade) => {
        const produto = produtos.find(p => p.codigo === parseInt(produtoId));
        const item = {
            produtoId: produto.codigo,
            quantidade: parseInt(quantidade),
            preco: produto.valor,
            total: produto.valor * parseInt(quantidade)
        };
        
        setVendaAtual(prevState => ({
            ...prevState,
            itens: [...prevState.itens, item],
            total: prevState.total + item.total
        }));
    };

    const atualizarItem = (index, quantidade) => {
        setVendaAtual(prevState => {
            const itens = [...prevState.itens];
            const item = itens[index];
            const novoTotal = item.preco * quantidade;
            item.quantidade = quantidade;
            item.total = novoTotal;
            return {
                ...prevState,
                itens,
                total: itens.reduce((acc, item) => acc + item.total, 0)
            };
        });
    };

    const removerItem = (index) => {
        setVendaAtual(prevState => {
            const itens = [...prevState.itens];
            const item = itens.splice(index, 1)[0];
            return {
                ...prevState,
                itens,
                total: prevState.total - item.total
            };
        });
    };

    return (
        <VendaContext.Provider value={{
            vendas, vendaAtual, setVendaAtual, cadastrarVenda, editarVenda, removerVenda, alerta, produtos, adicionarItem, atualizarItem, removerItem, fetchVendas
        }}>
            {children}
        </VendaContext.Provider>
    );
};
