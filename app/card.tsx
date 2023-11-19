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
  const [comment, setComment] = useState(h.comment);
  const [workDistance, setWorkDistance] = useState(h.workDistance);

  const previosCommentRef = useRef<HTMLHeadingElement | null>(null);
  const formCommentRef = useRef<HTMLFormElement | null>(null);
  const previosWorkDistanceRef = useRef<HTMLHeadingElement | null>(null);
  const formWorkDistanceRef = useRef<HTMLFormElement | null>(null);

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
  const handleOpenComment = async (id: number, e: any, label: string) => {
    e.preventDefault();
    let x;
    let existingCommentEl;

    switch (label) {
      case "comment":
        x = formCommentRef.current;
        existingCommentEl = previosCommentRef.current;
        break;
      case "workDistance":
        x = formWorkDistanceRef.current;
        existingCommentEl = previosWorkDistanceRef.current;
        break;
      default:
        break;
    }
    x!.style.display = "flex";
    existingCommentEl!.style.display = "none";
    const existingComment = existingCommentEl!.innerText;
    x!.children[0].value = existingComment;
    switch (label) {
      case "comment":
        setComment(existingComment);
        break;
      case "workDistance":
        setWorkDistance(existingComment);
        break;
      default:
        break;
    }
  };

  const submitComment = async (e: any, id: number, label: string) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:3000/api/add_comment/${id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment, type: label, workDistance }),
    });
    switch (label) {
      case "comment":
        previosCommentRef.current!.style.display = "flex";
        formCommentRef.current!.style.display = "none";
        break;
      case "workDistance":
        previosWorkDistanceRef.current!.style.display = "flex";
        formWorkDistanceRef.current!.style.display = "none";
        break;
      default:
        break;
    }

    await checkUserLoggedIn();
  };

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
      {[{ label: "comment" }, { label: "workDistance" }].map((x, i) => {
        let previousRef;
        let value;
        let formRef;
        let stateValue;
        let onChange;
        switch (x.label) {
          case "comment":
            previousRef = previosCommentRef;
            formRef = formCommentRef;
            value = h.comment;
            stateValue = comment;
            onChange = (e: any) => setComment(e.target.value);
            break;
          case "workDistance":
            previousRef = previosWorkDistanceRef;
            formRef = formWorkDistanceRef;
            value = h.workDistance;
            stateValue = workDistance;
            onChange = (e: any) => setWorkDistance(e.target.value);
            break;
          default:
            break;
        }
        return (
          <>
            <h5
              onClick={(e) => handleOpenComment(i, e, x.label)}
              ref={previousRef}
              className={style.comment}
            >
              {stateValue || x.label}
            </h5>
            <form className={style.form} id="form" ref={formRef}>
              <input
                value={stateValue}
                onChange={onChange}
                placeholder={x.label}
                name={x.label}
              />
              <button onClick={(e) => submitComment(e, h.id, x.label)}>
                Submit
              </button>
            </form>
          </>
        );
      })}
    </div>
  );
};

export default Card;
