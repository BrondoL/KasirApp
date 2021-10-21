import { Col, Container, Row } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import { Keranjang, Sidebar, MenuList } from "../components";
import { API_URL } from "../utils/constants";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function Home() {
    const [menus, setMenus] = useState([]);
    const [keranjangs, setKeranjangs] = useState([]);
    const [tgrKeranjang, setTgrKeranjang] = useState("");
    const [currentCategory, setCurrentCategory] = useState("Makanan");

    const fetchMenu = useCallback(() => {
        axios
            .get(API_URL + "products?category.nama=" + currentCategory)
            .then((res) => {
                const result = res.data;
                setMenus(result);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [currentCategory]);

    const fetchKeranjang = useCallback(() => {
        axios
            .get(API_URL + "keranjangs")
            .then((res) => {
                const result = res.data;
                setKeranjangs(result);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        fetchMenu();
    }, [fetchMenu]);

    useEffect(() => {
        fetchKeranjang();
    }, [fetchKeranjang, tgrKeranjang]);

    const changeCategory = (value) => {
        setCurrentCategory(value);
    };

    const masukKeranjang = (value) => {
        axios
            .get(API_URL + "keranjangs?product.id=" + value.id)
            .then((res) => {
                let currentKeranjang = {};
                if (res.data.length === 0) {
                    currentKeranjang = {
                        jumlah: 1,
                        total_harga: value.harga,
                        product: value,
                    };
                    axios
                        .post(API_URL + "keranjangs", currentKeranjang)
                        .then(() => {
                            MySwal.fire({
                                icon: "success",
                                title: "Berhasil menambah makanan !",
                                text: `${value.nama} berhasil masuk keranjang !`,
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    currentKeranjang = {
                        jumlah: res.data[0].jumlah + 1,
                        total_harga: res.data[0].total_harga + value.harga,
                        product: value,
                    };
                    axios
                        .put(
                            API_URL + "keranjangs/" + res.data[0].id,
                            currentKeranjang
                        )
                        .then(() => {
                            MySwal.fire({
                                icon: "success",
                                title: "Berhasil menambah makanan !",
                                text: `${value.nama} berhasil masuk keranjang !`,
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
                setTgrKeranjang(currentKeranjang);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="Home">
            <div className="mt-3">
                <Container fluid>
                    <Row>
                        <Sidebar
                            changeCategory={changeCategory}
                            currentCategory={currentCategory}
                        />
                        <Col>
                            <h4>
                                <strong>Daftar Produk</strong>
                            </h4>
                            <hr />
                            <Row>
                                <MenuList
                                    menus={menus}
                                    masukKeranjang={masukKeranjang}
                                />
                            </Row>
                        </Col>
                        <Keranjang
                            keranjangs={keranjangs}
                            setTgrKeranjang={setTgrKeranjang}
                        />
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Home;
