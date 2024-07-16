import React, { useContext, useEffect } from 'react';
import { VendaContext } from './VendaContext';
import Tabela from './Tabela';
import Form from './Form';

function Venda() {
    const { fetchVendas } = useContext(VendaContext);

    useEffect(() => {
        fetchVendas();
    }, [fetchVendas]);

    return (
        <div>
            <Tabela />
            <Form />
        </div>
    );
}

export default Venda;
