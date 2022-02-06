import {
  Link,
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "remix";
import type { MetaFunction } from "remix";
import { CSSTransition } from 'react-transition-group';


import globalStyles from "~/styles/global.css";
import { useEffect, useState } from "react";

export const meta: MetaFunction = () => {
  return { title: "UPE - Tech Org" };
};

export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap" },
    { rel: "stylesheet", href: globalStyles },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <NavBar />
        <div id="main-body">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function NavBar() {

  const [visible, setVisible] = useState(false);
  const [altColor, setAltColor] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      let y = window.scrollY;
      if (y > 100) {
        setAltColor(true);
      } else {
        setAltColor(false);
      }
      const btn = document.getElementById("join-us-button");
      if (btn != null && 0 > btn.getBoundingClientRect().bottom) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={altColor ? "alt-color" : ""}>
      <h1 className="center">
        <Link to="/" className="UPE-logo">UPE</Link>
      </h1>
      <ul>
        <li className="dropdown">
          <p>Our Legacy</p>
          <div>
            <ul>
              <Link to="/eboard">E-Board</Link>
              <br />
              <Link to="/pro-network">Pro-Network</Link>
              <br />
              <Link to="/induction">Induction</Link>
            </ul>
          </div>
        </li>
        <li className="dropdown">
          <p>Hot Links</p>
          <div>
            <ul>
              <Link to="/programs">Programs</Link>
              <br />
              <Link to="/calendar">Calendar</Link>s
            </ul>
          </div>
        </li>
        <li>
          <Link to="#events">Sign In</Link>
        </li>
        <CSSTransition
          in={visible}
          timeout={200}
          classNames="join-us-nav"
          unmountOnExit>
          <li className="join-us-nav">
            <Link to="/application">Join Us</Link>
          </li>
        </CSSTransition> 
      </ul>
    </nav>
  )
}


