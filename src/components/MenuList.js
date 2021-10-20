import React from "react";
import { Col, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const MenuList = ({ menus, masukKeranjang }) => {
    return (
        menus &&
        menus.map((menu) => (
            <Col md={4} xs={6} className="mb-3" key={menu.id}>
                <Card className="shadow" onClick={() => masukKeranjang(menu)}>
                    <Card.Img
                        variant="top"
                        src={
                            "assets/images/" +
                            menu.category.nama.toLowerCase() +
                            "/" +
                            menu.gambar
                        }
                    />
                    <Card.Body>
                        <Card.Title>
                            {menu.nama}{" "}
                            <strong>
                                <small>{menu.kode}</small>
                            </strong>
                        </Card.Title>
                        <Card.Text>
                            Rp. {numberWithCommas(menu.harga)}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        ))
    );
};

export default MenuList;
