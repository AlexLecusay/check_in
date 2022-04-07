import { LinksFunction } from 'remix';

import globalStyles from '~/styles/global.css';
import TopPage from '~/components/TopPage';
import externalStyles from '~/styles/external.css';
import topPageStyles from '~/styles/topPage.css';
import blob1 from '~/img/blob1.svg';
import Gui1 from '~/img/Gui Yellow.svg';
import { useRef, useState, FormEvent } from 'react';
import { Link } from "remix";
import Confetti from 'react-confetti';

export let links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: globalStyles },
    { rel: 'stylesheet', href: topPageStyles },
    { rel: 'stylesheet', href: externalStyles },
    { rel: 'prefetch', href: blob1 },
    { rel: 'prefetch', href: Gui1 },

  ];
};

export default function ExternalPage() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const discordRef = useRef<HTMLInputElement>(null);

  const [showConfetti, setShowConfetti] = useState(false);

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
      }
    );
    if (response.ok) setShowConfetti(true);
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <TopPage blob={blob1} />
      <h3 className='containerHeader'>CHECK-IN</h3>
      <div className='box'>
        <div>
          <h1 className='containerHeader'> General Body Meeting </h1>
          <form onSubmit={submitHandler}>
            <p className='formField'>Full Name:</p>
            <input className='textField' type='text' ref={nameRef} />
            <p className='formField'>Email:</p>
            <input className='textField' type='email' ref={emailRef} />
            <p className='formField'>Discord:</p>
            <input className='textField' type='text' ref={discordRef} />
            <Link to = "/SuccessPage" className = "redirect">
            <button className='submitBtn' type='submit'>
              Submit
            </button>
            </Link>
          </form>
        </div>
      </div>
      <Confetti
        className='confetti'
        gravity={0.05}
        run={showConfetti}
        numberOfPieces={500}
        width={1500}
        height={1500}
        recycle={false}
      />
    </>
  );
}



