function Error({ statusCode }) {
  return <p>{statusCode ? `Se produjo un error ${statusCode} en el servidor` : 'Se produjo un error'}</p>;
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
