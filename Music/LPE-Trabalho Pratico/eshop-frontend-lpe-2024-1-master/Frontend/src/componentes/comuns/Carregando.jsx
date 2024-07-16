function Carregando({ carregando, children }) {
    return (
        <>
            {
                !carregando ? children :
                <div className="d-flex align-items-center m-5">
                    <strong role="status">Carregando...</strong>
                    <div className="spinner-border ms-auto" aria-hidden="true"></div>
                </div>
            }
        </>
    );
}

export default Carregando;
