import React from "react";
import "../App.css";
import { FaRegHeart } from "react-icons/fa";
import { auth } from "../firebase";
import {toast} from "react-toastify";
import { firestore } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, article } = props;

  // let indianTime = new Date(time).toGMTString();
  let indianTime = new Date(props.time).toGMTString();

  const handleFavorite = async (article) => {
    try {
      if (!auth.currentUser) {
        console.log(
          "User not authenticated. Unable to add/remove from favorites."
        );
        return;
      }

      const favoritesCollection = collection(
        firestore,
        `users/${auth.currentUser.uid}/favorites`
      );
      const querySnapshot = await getDocs(favoritesCollection);

      const docToRemove = querySnapshot.docs.find(
        (doc) => doc.data().title === article.title
      );

      if (docToRemove) {
        await deleteDoc(docToRemove.ref);
        toast.error("Removed from Favorites");
      } else {
        console.log(article);
        await addDoc(favoritesCollection, article);
        toast.success("Added to Favorites");
      }
    } catch (error) {
      console.error("Error handling favorites:", error);
      console.log("Error handling Favorites");
    }
  };

  return (
    <div>
      <div className="card bg-dark text-white border border-dark rounded shadow p-3 mb-5 bg-dark rounded">
        <button onClick={() => handleFavorite(article)} className="favourite">
          <FaRegHeart />
        </button>
        <img src={imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">
              {/* {author} on {indianTime} */}
              {props.author} on {indianTime}
              {/* you can simply do {props.something} which you are passing from parent component or can declare variable at the vary top*/}
            </small>
          </p>
          <a href={newsUrl} target=" " className="btn btn-primary">
            read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
