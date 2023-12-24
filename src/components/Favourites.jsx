import React, { useState, useEffect } from "react";
import { app, firestore } from "../firebase";
import { getAuth } from "firebase/auth";
import { collection, getDocs, deleteDoc } from "firebase/firestore";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { BsArrowRight } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
const auth = getAuth(app);

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.log("User not logged in");
          return;
        } else {
          console.log("User logged Successful");
        }
        console.log(user);

        const userRef = collection(
          firestore,
          `users/${auth.currentUser.uid}/favorites`
        );
        const userData = await getDocs(userRef);
        const userFavorites = userData.docs.map((doc) => doc.data());
        setFavorites(userFavorites);
        console.log(userFavorites);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        toast.error("Error fetching Favorites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemove = async (article) => {
    try {
      const userRef = collection(
        firestore,
        `users/${auth.currentUser.uid}/favorites`
      );
      const querySnapshot = await getDocs(userRef);
      const docToRemove = querySnapshot.docs.find(
        (doc) => doc.data().title === article.title
      );

      if (docToRemove) {
        await deleteDoc(docToRemove.ref);
        toast.success("Removed from Favorites");

        setFavorites((prevFavorites) =>
          prevFavorites.filter((fav) => fav.title !== article.title)
        );
      } else {
        toast.warning("Article not found in Favorites");
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
      toast.error("Error removing from Favorites");
    }
  };

  return (
    <Container className="container-f">
      <div>
        <h2 className="text-center" style={{ marginTop: "65px" }}>
          Favorite Articles
        </h2>

        <Row>
          <Col>
            <Link
              to="/"
              className="text-primary mt-2 mb-3 float-end text-decoration-none"
            >
              Go to News Article
            </Link>
          </Col>
        </Row>

        {loading ? (
          <h5 className="text-center text-bg-secondary py-3">
            Loading Favorites News...
          </h5>
        ) : (
          <div>
            {favorites.length === 0 ? (
              <h5 className="text-center mt-3">
                No favorite articles added. Plz Add new Article
              </h5>
            ) : (
              <Row className="justify-content-between flex-wrap">
                {favorites.map((article, index) => (
                  <Col key={index} xs={12} md={4} className="mb-3">
                    <div className="card bg-dark text-white border border-dark rounded shadow p-3 mb-5 bg-dark rounded">
                      <img
                        src={article.urlToImage}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">{article.title}...</h5>
                        <p className="card-text">{article.description}</p>
                        <p className="card-text">
                          <small className="text-muted">
                            {/* {author} on {indianTime} */}
                            {article.author} on indianTime
                            {/* you can simply do {props.something} which you are passing from parent component or can declare variable at the vary top*/}
                          </small>
                        </p>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Button
                          as="a"
                          href={article.url}
                          variant="primary"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Read more <BsArrowRight />
                        </Button>
                        <Button
                          className="btn btn-primary"
                          variant="danger"
                          onClick={() => handleRemove(article)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Favorites;
