import { LinksFunction } from "remix";

import globalStyles from "~/styles/global.css";
import topPageStyles from "~/styles/topPage.css"; 
import blob1 from "~/img/blob1.svg";

export let links: LinksFunction = () => {
    return [
      { rel: "stylesheet", href: globalStyles },
      { rel: "stylesheet", href: topPageStyles },
      { rel: "prefetch", href: blob1 }
    ];
  };

export default function ExternalPage(){
    return(
        <>
            <img id="top-right-blob-events" src={blob1}/>
            <img id="bottom-left-blob-events" src={blob1}/>
        </>
    );
}