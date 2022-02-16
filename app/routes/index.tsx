
import { LinksFunction } from "remix";

import globalStyles from "~/styles/global.css";
import TopPage from "~/components/TopPage";
import topPageStyles from "~/styles/topPage.css";
import blob1 from "~/img/blob1.svg";


export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: globalStyles },
    { rel: "stylesheet", href: topPageStyles },
    { rel: "prefetch", href: blob1 },
  ];
};

export default function Index() {
  return (
    <>
      <TopPage blob={blob1}/>
    </>
  );
}

