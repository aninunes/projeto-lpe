import React, { useContext } from 'react';
import { VendaContext } from './VendaContext';

function Tabela() {
    const { vendas, editarVenda, removerVenda } = useContext(VendaContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Vendas</h1>
            <button type="button" className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#modalEdicao">
                Nova Venda
            </button>
            {vendas.length === 0 && <h2>Nenhum registro encontrado</h2>}
            {vendas.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Código</th>
                                <th scope="col">Data</th>
                                <th scope="col">Total</th>
                                <th scope="col">Usuário</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendas.map(venda => (
                                <tr key={venda.codigo}>
                                    <td>{venda.codigo}</td>
                                    <td>{venda.data}</td>
                                    <td>{Number(venda.total).toFixed(2)}</td>
                                    <td>{venda.usuario}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm me-2" data-bs-toggle="modal" data-bs-target="#modalEdicao" onClick={() => editarVenda(venda.codigo)}>
                                            Editar
                                        </button>
                                        <button className="btn btn-danger btn-sm" onClick={() => removerVenda(venda.codigo)}>
                                            Remover
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Tabela;
