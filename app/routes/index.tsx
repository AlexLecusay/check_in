
import { LinksFunction } from "remix";

import globalStyles from "~/styles/global.css";
import TopPage from "~/components/TopPage";
import topPageStyles from "~/styles/topPage.css"; 
import externalStyles from "~/styles/external.css";
import blob1 from "~/img/blob1.svg";
import Gui1 from "~/img/Gui Yellow.svg";
import {
  Link
} from "remix";


export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: globalStyles },
    { rel: "stylesheet", href: topPageStyles },
    { rel: "stylesheet", href: externalStyles },
    { rel: "prefetch", href: blob1 },
    { rel: "prefetch", href: Gui1}
  ];
};

export default function Index() {
  return (
    <>
      <TopPage blob={blob1}/>
      <br/>
      <br/>
      <br/>
      <div className = "header">
        <h1>UPE Events</h1>
      </div>
      <div className = "containerDiv">
        <form className = "container">
          <h3 className = "containerHeader">CHECK-IN</h3>
          <br/>
          <Link to = "/ExternalPage" className = "redirect">
            <button className = "submit">

            <img className = "Gui" src={Gui1}/>
            </button>
          </Link>
        </form>
        <br/>
        <br/>
        <h5 className = "waterMark">Created by: Web Dev Sparkdev</h5>
      </div>
    </>
  );
}