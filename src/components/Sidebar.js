import { useState, useEffect } from "react";
import { Col, ListGroup } from "react-bootstrap";
import { API_URL } from "../utils/constants";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUtensils,
    faCoffee,
    faCheese,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
    if (nama === "Makanan")
        return <FontAwesomeIcon icon={faUtensils} className="me-2" />;
    if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} />;
    if (nama === "Cemilan")
        return <FontAwesomeIcon icon={faCheese} className="me-2" />;
    return <FontAwesomeIcon icon={faUtensils} className="me-2" />;
};

const SidebarComponent = ({ currentCategory, changeCategory }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        axios
            .get(API_URL + "categories")
            .then((res) => {
                const result = res.data;
                setCategories(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Col md={2} mt="2">
            <h4>
                <strong>Daftar Kategori</strong>
            </h4>
            <hr />
            <ListGroup>
                {categories &&
                    categories.map((category) => (
                        <ListGroup.Item
                            key={category.id}
                            onClick={() => changeCategory(category.nama)}
                            className={
                                currentCategory === category.nama &&
                                "category-active"
                            }
                            style={{ cursor: "pointer" }}
                        >
                            <h5>
                                <Icon nama={category.nama} />
                                {category.nama}
                            </h5>
                        </ListGroup.Item>
                    ))}
            </ListGroup>
        </Col>
    );
};

export default SidebarComponent;
