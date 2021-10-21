import { useState } from "react";
import { Col, Row, ListGroup, Badge, Card } from "react-bootstrap";
import { TotalBayar } from ".";
import { numberWithCommas } from "../utils/utils";
import ModalKeranjang from "./ModalKeranjang";
import { API_URL } from "../utils/constants";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Keranjang = ({ keranjangs, setTgrKeranjang }) => {
    const [modalShow, setModalShow] = useState(false);
    const [keranjangDetail, setKeranjangDetail] = useState({});
    const [jumlah, setJumlah] = useState(0);
    const [keterangan, setKeterangan] = useState("");
    const [totalHarga, settotalHarga] = useState(0);

    const onTambah = () => {
        const currentJumlah = jumlah + 1;
        setJumlah(currentJumlah);
        settotalHarga(currentJumlah * keranjangDetail.product.harga);
    };

    const onKurang = () => {
        if (jumlah > 1) {
            const currentJumlah = jumlah - 1;
            setJumlah(currentJumlah);
            settotalHarga(currentJumlah * keranjangDetail.product.harga);
        }
    };

    const changeHandler = (e) => {
        setKeterangan(e.target.value);
    };

    const hapusHandler = (id, nama) => {
        axios
            .delete(API_URL + "keranjangs/" + id)
            .then(() => {
                setTgrKeranjang(id);
                setModalShow(false);
                MySwal.fire({
                    icon: "success",
                    title: "Hapus Pesanan !",
                    text: `Sukses Menghapus Pesanan ${nama}.`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const submitHandler = () => {
        const data = {
            jumlah: jumlah,
            total_harga: totalHarga,
            keterangan: keterangan,
            product: keranjangDetail.product,
        };
        axios
            .put(API_URL + "keranjangs/" + keranjangDetail.id, data)
            .then(() => {
                setTgrKeranjang(data);
                setModalShow(false);
                MySwal.fire({
                    icon: "success",
                    title: "Update Pesanan !",
                    text: `Sukses Update Pesanan ${data.product.nama}.`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Col md={3} className="mt-2">
            <h4>
                <strong>Keranjang</strong>
            </h4>
            <hr />
            {keranjangs.length !== 0 ? (
                <div>
                    <Card className="overflow-auto hasil">
                        <ListGroup variant="flush">
                            {keranjangs.map((keranjang) => (
                                <ListGroup.Item
                                    key={keranjang.id}
                                    onClick={() => {
                                        setKeranjangDetail(keranjang);
                                        setJumlah(keranjang.jumlah);
                                        settotalHarga(keranjang.total_harga);
                                        setKeterangan(keranjang.keterangan);
                                        setModalShow(true);
                                    }}
                                >
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
                                            <strong className="float-end">
                                                {keranjang.total_harga}
                                            </strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                    <TotalBayar keranjangs={keranjangs} />
                    {modalShow && (
                        <ModalKeranjang
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            onTambah={onTambah}
                            onKurang={onKurang}
                            keranjang={keranjangDetail}
                            jumlah={jumlah}
                            totalHarga={totalHarga}
                            keterangan={keterangan}
                            changeHandler={changeHandler}
                            hapusHandler={hapusHandler}
                            submitHandler={submitHandler}
                        />
                    )}
                </div>
            ) : (
                <ListGroup.Item>
                    <h5 className="text-center">Keranjang Kosong</h5>
                </ListGroup.Item>
            )}
        </Col>
    );
};

export default Keranjang;
