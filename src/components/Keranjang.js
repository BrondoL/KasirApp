import React from "react";
import { Col, Row, ListGroup, Badge } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const Keranjang = ({ keranjangs }) => {
    return (
        <Col md={3} mt="2">
            <h4>
                <strong>Keranjang</strong>
            </h4>
            <hr />
            {keranjangs.length !== 0 ? (
                <ListGroup variant="flush">
                    {keranjangs.map((keranjang) => (
                        <ListGroup.Item>
                            <Row>
                                <Col xs={2}>
                                    <h4>
                                        <Badge pill bg="success">
                                            {keranjang.jumlah}
                                        </Badge>
                                    </h4>
                                </Col>
                                <Col>
                                    <h5>{keranjang.product.nama}</h5>
                                    <p>
                                        Rp.
                                        {" " +
                                            numberWithCommas(
                                                keranjang.product.harga
                                            )}
                                    </p>
                                </Col>
                                <Col>
                                    <strong className="float-right">
                                        {keranjang.total_harga}
                                    </strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                <ListGroup.Item>
                    <h5 className="text-center">Keranjang Kosong</h5>
                </ListGroup.Item>
            )}
        </Col>
    );
};

export default Keranjang;
