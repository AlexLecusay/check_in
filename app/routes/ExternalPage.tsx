import { LinksFunction } from "remix";

import globalStyles from "~/styles/global.css";
import TopPage from "~/components/TopPage";
import topPageStyles from "~/styles/topPage.css";
import blob1 from "~/img/blob1.svg";
import Gui1 from "~/img/Gui Yellow.svg";
import { SyntheticEvent, useRef } from "react";

export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: globalStyles },
    { rel: "stylesheet", href: topPageStyles },
    { rel: "prefetch", href: blob1 },
    { rel: "prefetch", href: Gui1 },
  ];
};

export default function ExternalPage() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const discordRef = useRef<HTMLInputElement>(null);

  const submitHandler = async (event: SyntheticEvent) => {
    event.preventDefault();
    const eventId = "6248e4085fda8dd5d91e60fd";
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const discordId = discordRef.current?.value;
    console.log(name, email, discordId);
    const response = await fetch("http://localhost:8000/user/check_in_external", {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, discordId, eventId }),
    });
    const data = await response.json();
    console.log(data);
    
  };

  return (
    <>
      <TopPage blob={blob1} />

      <h3 className="containerHeader">CHECK-IN</h3>
      <div className="box">
        <div>
          <h1 className="containerHeader"> General Body Meeting </h1>
          <form onSubmit={submitHandler}>
            <label className="formField">
              Full Name:<br></br>
              <input
                type="text"
                ref={nameRef}
                style={{ border: "white", borderRadius: 25, boxShadow: 5 }}
              />
            </label>

            <label className="formField">
              Email:<br></br>
              <input
                type="text"
                ref={emailRef}
                style={{ border: "white", borderRadius: 25 }}
              />
            </label>

            <label className="formField">
              Discord:<br></br>
              <input
                type="text"
                ref={discordRef}
                style={{ border: "white", borderRadius: 25 }}
              />
            </label>
            <button
              type="submit"
              style={{
                background: "linear-gradient(144.13deg, #FEFE00, #F6BD30)",
                border: "#faab1b",
                width: 200,
                borderRadius: 25,
                color: "white",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
