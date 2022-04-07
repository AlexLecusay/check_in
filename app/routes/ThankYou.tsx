import { LinksFunction } from "remix";

import globalStyles from "~/styles/global.css";
import TopPage from "~/components/TopPage";
import topPageStyles from "~/styles/topPage.css";
import blob1 from "~/img/blob1.svg";
import Gui1 from "~/img/Gui Yellow.svg";
import ThankYouStyles from "~/styles/ThankYou.css";
import { useRef, useState, FormEvent } from 'react';
import Confetti from 'react-confetti';

export let links: LinksFunction = () => {
    return [
      { rel: "stylesheet", href: globalStyles },
      { rel: "stylesheet", href: topPageStyles },
      { rel: "stylesheet", href: ThankYouStyles},
      { rel: "prefetch", href: blob1 },
      { rel: "prefetch", href: Gui1}
    ];
};

export default function ThankYou(){
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const discordRef = useRef<HTMLInputElement>(null);

    const [showConfetti, setShowConfetti] = useState(true);

    const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const eventId = '6248e4085fda8dd5d91e60fd';
        const name = nameRef.current?.value;
        const email = emailRef.current?.value;
        const discordId = discordRef.current?.value;
        const response = await fetch(
            'http://localhost:8000/user/check_in_external',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, discordId, eventId }),
            });
            if (response.ok) setShowConfetti(true);
            const data = await response.json();
            console.log(data);
        };
    return(
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
                    <h3 className = "containerHeader">Thank you for</h3>
                    <h3 className = "containerHeader">checking in!</h3>
                    <img className = "Gui2" src = {Gui1}/>
                </form>
                <br/>
                <br/>
                <h5 className = "waterMark">Created by: Web Dev Sparkdev</h5>
            </div>
            <Confetti className='confetti' gravity={0.05}
            run={showConfetti} numberOfPieces={500}
            width={1500} height={1500} recycle={false}/>
        </>
    )
}