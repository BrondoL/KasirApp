import { Button, Image } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
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
