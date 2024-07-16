import React, { useContext, useState } from 'react';
import Alerta from '../../comuns/Alerta';
import { VendaContext } from './VendaContext';

function Form() {
    const { vendaAtual, handleChange, handleSubmit, alerta, produtos, adicionarItem, atualizarItem, removerItem } = useContext(VendaContext);
    const [produtoId, setProdutoId] = useState('');
    const [quantidade, setQuantidade] = useState(1);

    const handleAdicionarItem = () => {
        adicionarItem(produtoId, quantidade);
        setProdutoId('');
        setQuantidade(1);
    };

    return (
        <div className="modal fade" id="modalEdicao" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Edição de Vendas</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="formulario" onSubmit={handleSubmit} className="needs-validation" noValidate>
                        <div className="modal-body">
                            <Alerta alerta={alerta} />
                            <div className="mb-3">
                                <label htmlFor="txtCodigo" className="form-label">Código</label>
                                <input type="number" className="form-control" id="txtCodigo" readOnly name="codigo" value={vendaAtual.codigo} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="txtData" className="form-label">Data</label>
                                <input type="date" className="form-control" id="txtData" required name="data" value={vendaAtual.data} onChange={handleChange} />
                                <div className="valid-feedback">Data OK!</div>
                                <div className="invalid-feedback">Informe a data!</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="txtTotal" className="form-label">Total</label>
                                <input type="number" className="form-control" id="txtTotal" required name="total" value={vendaAtual.total} onChange={handleChange} />
                                <div className="valid-feedback">Total OK!</div>
                                <div className="invalid-feedback">Informe o total!</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="txtUsuario" className="form-label">Usuário</label>
                                <input type="text" className="form-control" id="txtUsuario" required name="usuario" value={vendaAtual.usuario} onChange={handleChange} />
                                <div className="valid-feedback">Usuário OK!</div>
                                <div className="invalid-feedback">Informe o usuário!</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="selectProduto" className="form-label">Produto</label>
                                <select id="selectProduto" className="form-select" value={produtoId} onChange={(e) => setProdutoId(e.target.value)}>
                                    <option value="">Selecione um produto</option>
                                    {produtos.map(produto => (
                                        <option key={produto.codigo} value={produto.codigo}>{produto.nome}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="txtQuantidade" className="form-label">Quantidade</label>
                                <input type="number" className="form-control" id="txtQuantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <button type="button" className="btn btn-primary" onClick={handleAdicionarItem}>Adicionar Item</button>
                            </div>
                            <div className="mb-3">
                                <h5>Itens</h5>
                                {vendaAtual.itens.map((item, index) => (
                                    <div key={index}>
                                        <span>{produtos.find(p => p.codigo === item.produtoId)?.nome}</span>
                                        <span> - </span>
                                        <span>{item.quantidade}</span>
                                        <span> x </span>
                                        <span>R${item.preco}</span>
                                        <button type="button" className="btn btn-warning btn-sm" onClick={() => atualizarItem(index, item.quantidade + 1)}>+</button>
                                        <button type="button" className="btn btn-warning btn-sm" onClick={() => atualizarItem(index, item.quantidade - 1)}>-</button>
                                        <button type="button" className="btn btn-danger btn-sm" onClick={() => removerItem(index)}>Remover</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="submit" className="btn btn-success">Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Form;
