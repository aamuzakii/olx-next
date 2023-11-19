import React from "react";
import style from "./page.module.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const Card = ({
  h,
  checkUserLoggedIn,
  formattedNumber,
  i,
}: {
  h: any;
  checkUserLoggedIn: any;
  formattedNumber: any;
  i: number;
}) => {
  const [comment, setComment] = useState("");

  const handleClickDelete = async (id: number) => {
    const res = await fetch(`http://localhost:3000/api/del/${id}`);
    const data = await res.json();
    await checkUserLoggedIn();
  };

  const handleClickJustNotPerfect = async (id: number) => {
    const res = await fetch(`http://localhost:3000/api/houses/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ standard: "not - high" }),
    });

    await checkUserLoggedIn();
  };
  const handleOpenComment = async (id: number, e: any) => {
    e.preventDefault();
    const x = document.getElementsByTagName("form")[id];
    x.style.display = "flex";
    const existingCommentEl = document.getElementsByTagName("h5")[id];
    const existingComment = existingCommentEl.innerText;
    x.children[0].value = existingComment;
    setComment(existingComment);
  };

  const submitComment = async (e: any, id: number) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/api/add_comment/${id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment }),
    });
    setComment("");
    await checkUserLoggedIn();
  };

  const myRef = useRef(null);

  return (
    <div className={style.kartu}>
      <a href={h.url} target="_blank" rel="noopener noreferrer">
        <Image src={h.imageUrl || ""} alt="" width={242} height={153}></Image>
        <p className={style.harga}>{formattedNumber}</p>
        <p className={style.feature}>{h.feature}</p>
        <p className={style.title}>{h.title}</p>
        <div className={style.bottom}>
          <p className={style.published}>{h.publishedStr?.toUpperCase()}</p>
          <p className={style.published}>{h.prefecture?.toUpperCase()}</p>
        </div>
        <hr />
      </a>
      <div className={style.button_wrapper}>
        <button onClick={() => handleClickDelete(h.id)} className={style.red}>
          DELETE
        </button>
        <button onClick={() => handleClickJustNotPerfect(h.id)}>
          Ga Ngiler Aja
        </button>
      </div>
      <button onClick={(e) => handleOpenComment(i, e)}>SHOW</button>
      <h5 className={style.comment}>{h.comment}</h5>
      <form className={style.form} id="form">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="comment"
          name="comment"
        />
        <button onClick={(e) => submitComment(e, h.id)}>Submit</button>
      </form>
    </div>
  );
};

export default Card;
