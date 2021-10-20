import { Button, Image } from "react-bootstrap";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constants";

const Success = () => {
    useEffect(() => {
        axios
            .get(API_URL + "keranjangs")
            .then((res) => {
                const result = res.data;
                result.map((keranjang) => {
                    return axios
                        .delete(API_URL + "keranjangs/" + keranjang.id)
                        .catch((err) => {
                            console.log(err);
                        });
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div className="mt-4 text-center">
            <Image src="assets/images/sukses.png" width="450" alt="sukses" />
            <h2>Pesanan Sukses</h2>
            <p>Terima Kasih Sudah Memesan.</p>
            <Button variant="primary" as={Link} to="/">
                Kembali
            </Button>
        </div>
    );
};

export default Success;
