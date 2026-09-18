import { useState } from "react";
import style from "./eksempel.module.scss";
import { useSearchParams } from "react-router";

export default function Eksempel() {
  const searchParams = useSearchParams;
  const [category, setCategory] = useState("");
  const [categoryParam, setCategoryParam] = useSearchParams("kategory" ?? "")

  function handleSubmit() {

  }
  
  return (<div className={style.eksempelStyle}>
    <form onSubmit={handleSubmit}>
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value={""}>Vælg din yndlingskategory</option>
        <option value="abe">abe</option>
        <option value="Ged">Ged</option>
        <option value="Ko">Ko</option>
      </select>
    </form>
  </div>)
};