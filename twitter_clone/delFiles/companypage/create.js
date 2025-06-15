"use client";

import { redirect } from "next/navigation";

export function CreateCompany() {
  return (
    <form onSubmit={submit}>
      <input
        className="input"
        type="text"
        name="name"
        defaultValue="New name"
      />
      <input
        className="input"
        type="text"
        name="industry"
        defaultValue="AutoMobile"
      />
      <input
        className="input"
        type="number"
        name="founded_year"
        defaultValue={1990}
      />
      <button className="btn">Send</button>
    </form>
  );
}
const submit = async (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const name = data.get("name");
  const industry = data.get("industry");
  const founded_year = parseInt(data.get("founded_year"));

  const response = await fetch("/api/company", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ name, industry, founded_year }),
  });
  const result = await response.json();
  console.log(result);
  redirect("/company");
};