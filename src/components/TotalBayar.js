import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Row, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useHistory } from "react-router-dom";

const TotalBayar = ({ keranjangs }) => {
    const totalBayar = keranjangs.reduce((result, value) => {
        return result + value.total_harga;
    }, 0);

    let history = useHistory();

    const onPesan = (totalBayar) => {
        const pesanan = {
            total_bayar: totalBayar,
            menus: keranjangs,
        };

        axios
            .post(API_URL + "pesanans", pesanan)
            .then(() => {
                history.push("/success");
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className="fixed-bottom">
            <Row>
                <Col md={{ span: 3, offset: 9 }} className="px-4">
                    <h4>
                        Total Harga:{" "}
                        <strong className="float-end me-2">
                            Rp. {numberWithCommas(totalBayar)}
                        </strong>
                    </h4>
                    <div className="d-grid gap-2 mb-3 mt-2 me-2">
                        <Button
                            bg="primary"
                            onClick={() => onPesan(totalBayar)}
                        >
                            <FontAwesomeIcon icon={faShoppingCart} /> Bayar
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default TotalBayar;
