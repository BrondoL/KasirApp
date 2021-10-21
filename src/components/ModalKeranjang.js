import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Button, Form } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const ModalKeranjang = ({
    show,
    onHide,
    keranjang,
    jumlah,
    totalHarga,
    keterangan,
    onTambah,
    onKurang,
    changeHandler,
    submitHandler,
    hapusHandler,
}) => {
    return (
        <div>
            <Modal
                show={show}
                onHide={onHide}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {keranjang.product.nama} {" - "}
                        <strong>
                            Rp. {numberWithCommas(keranjang.product.harga)}
                        </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Total Harga</Form.Label>
                            <p>
                                <strong>
                                    Rp. {numberWithCommas(totalHarga)}
                                </strong>
                            </p>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Jumlah: </Form.Label>
                            <br />
                            <Button
                                variant="primary"
                                size="sm"
                                className="me-2"
                                onClick={onKurang}
                            >
                                <FontAwesomeIcon icon={faMinus} />
                            </Button>
                            <strong>{jumlah}</strong>
                            <Button
                                variant="primary"
                                size="sm"
                                className="ms-2"
                                onClick={onTambah}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Keterangan</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="keterangan"
                                placeholder="Contoh: Pedes, Nasi setengah"
                                value={keterangan}
                                onChange={(e) => changeHandler(e)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="danger"
                        onClick={() =>
                            hapusHandler(keranjang.id, keranjang.product.nama)
                        }
                    >
                        <FontAwesomeIcon icon={faTrash} /> Hapus Pesanan
                    </Button>
                    <Button variant="primary" onClick={submitHandler}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalKeranjang;
