import Alert from 'react-bootstrap/Alert';

function Alerts(pesanPeringatan) {
  return (
    <>
        <Alert variant='danger' style={{ margin: '30px', textAlign: "center" }} >
        {pesanPeringatan.peringatan}
        </Alert>
    </>
  );
}

export default Alerts;