import React from "react";
import style from "./page.module.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { House } from "@prisma/client";
import _ from "lodash";

const Card = ({
  h,
  checkUserLoggedIn,
  formattedNumber,
  i,
}: {
  h: House;
  checkUserLoggedIn: any;
  formattedNumber: any;
  i: number;
}) => {
  const [comment, setComment] = useState(h.comment);
  const [workDistance, setWorkDistance] = useState(h.workDistance);
  const [gateOrCanopy, setGateOrCanopy] = useState(h.gateOrCanopy);
  const [dividable, setDividable] = useState(h.dividable);

  const previosCommentRef = useRef<HTMLHeadingElement | null>(null);
  const formCommentRef = useRef<HTMLFormElement | null>(null);
  const previosWorkDistanceRef = useRef<HTMLHeadingElement | null>(null);
  const formWorkDistanceRef = useRef<HTMLFormElement | null>(null);
  const previosGateOrCanopyRef = useRef<HTMLHeadingElement | null>(null);
  const formGateOrCanopyRef = useRef<HTMLFormElement | null>(null);
  const previosDividableRef = useRef<HTMLHeadingElement | null>(null);
  const formDividableRef = useRef<HTMLFormElement | null>(null);

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
    let formRef;
    let existingCommentEl;

    const titleCase = label.charAt(0).toUpperCase() + label.slice(1);
    formRef = eval(`form${titleCase}Ref`).current;
    existingCommentEl = eval(`previos${titleCase}Ref`).current;

    formRef!.style.display = "flex";
    existingCommentEl!.style.display = "none";
    const existingComment = existingCommentEl!.innerText;
    formRef!.children[0].value = existingComment;
    eval(`set${titleCase}`)(existingComment);
  };

  const submitComment = async (e: any, id: number, label: string) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:3000/api/add_comment/${id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment,
        type: label,
        workDistance,
        gateOrCanopy,
        dividable,
      }),
    });

    const titleCase = label.charAt(0).toUpperCase() + label.slice(1);
    const formRef = eval(`form${titleCase}Ref`).current;
    const previousRef = eval(`previos${titleCase}Ref`).current;

    previousRef!.style.display = "flex";
    formRef!.style.display = "none";

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
      {[
        { label: "comment" },
        { label: "workDistance" },
        { label: "gateOrCanopy" },
        { label: "dividable" },
      ].map((x, i) => {
        const titleCase = x.label.charAt(0).toUpperCase() + x.label.slice(1);
        const formRef = eval(`form${titleCase}Ref`);
        const previousRef = eval(`previos${titleCase}Ref`);
        let stateValue = eval(x.label);
        let onChange = (e: any) => eval(`set${titleCase}`)(e.target.value);

        return (
          <React.Fragment key={i}>
            <h5
              onClick={(e) => handleOpenComment(i, e, x.label)}
              ref={previousRef}
              className={style.comment}
            >
              {stateValue || x.label}
            </h5>
            <form className={style.form} id="form" ref={formRef}>
              <input
                value={(stateValue as string) || ""}
                onChange={onChange}
                placeholder={x.label}
                name={x.label}
              />
              <button onClick={(e) => submitComment(e, h.id, x.label)}>
                Submit
              </button>
            </form>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Card;
