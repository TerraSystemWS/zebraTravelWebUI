
function Error({ statusCode }) {
    return (
        <p style={{textAlign: "center", marginTop: "20rem", fontSize: "2.5rem"}}>
            {statusCode
                ? `O Erro ${statusCode} foi detatado.`
                : "Foi detetado um erro no cliente"}
        </p>
    );
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;
