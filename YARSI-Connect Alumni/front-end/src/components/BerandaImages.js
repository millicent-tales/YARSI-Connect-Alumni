import { Col, Container, Image, Row } from 'react-bootstrap';
import myImage1 from '../assets/images/photo1.jpeg';
import myImage2 from '../assets/images/photo2.jpeg';
import "../styles/beranda.css";

function BerandaImages() {
    return (
        <Container >
            <Row className="justify-content-center">
                <Col xs={12} xl={{ span: 6, offset: 0  }} className="d-flex  justify-content-center">
                    <Image src={myImage1} rounded className='beranda-images' />
                </Col>
                <Col xs={12} xl={{ span: 4, offset: 0 }} className="d-flex justify-content-center">
                    <Image src={myImage2} rounded className='beranda-images' />
                </Col>
            </Row>
            <Row className="justify-content-center">
            <Col xs={12} xl={{ span: 6, offset: 0 }} className="d-flex  justify-content-center">
                    <Image src={myImage1} rounded className='beranda-images' />
                </Col>
                <Col xs={12} xl={{ span: 4, offset: 0 }} className="d-flex justify-content-center">
                    <Image src={myImage2} rounded className='beranda-images' />
                </Col>
            </Row>
            <Row className="justify-content-center">
            <Col xs={12} xl={{ span: 6, offset: 0  }} className="d-flex  justify-content-center">
                    <Image src={myImage1} rounded className='beranda-images' />
                </Col>
                <Col xs={12} xl={{ span: 4, offset: 0 }} className="d-flex justify-content-center">
                    <Image src={myImage2} rounded className='beranda-images' />
                </Col>
            </Row>
        </Container>
    );
}

export default BerandaImages;
