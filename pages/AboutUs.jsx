const { useState } = React;

export default function AboutUs() {
  const [displayLast, setDisplayLast] = useState(false);
  return (
    <div className="about-container">
      <h1>
        Well this is supposed to be some page called 'about' or something so
        here we go...
      </h1>
      <section>
        <h2>I want to thank:</h2>
        <br />
        <h4>Me: Adam David Efraty</h4>
        <br />
        <h4>Me: Adam David Efraty</h4>
        <br />
        <h4>Aditionally, Me: Adam David Efraty</h4>
        <br />
        <h4>And of course the one and only...</h4>
        <br />
        {displayLast ? (
          <h2 style={{ color: "blue", fontWeight: "bold" }}>ChatGPT!</h2>
        ) : (
          <button onClick={() => setDisplayLast(true)}>Click to reveal!</button>
        )}
      </section>
    </div>
  );
}
