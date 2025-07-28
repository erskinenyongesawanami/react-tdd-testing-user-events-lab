import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleCheckboxChange(e) {
    const value = e.target.value;
    setInterests((prev) =>
      prev.includes(value)
        ? prev.filter((i) => i !== value)
        : [...prev, value]
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitted(true);
  }

  return (
    <main>
      <h1>Hi, I'm (your name)</h1>
      <img alt="My profile pic" src="https://via.placeholder.com/350" />
      <h2>About Me</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <div>
        <a href="https://github.com">GitHub</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>

      <h2>Sign Up for My Newsletter</h2>

      {isSubmitted ? (
        <div>
          <h3>Thank you for signing up, {name}!</h3>
          <p>We’ll email you at {email}.</p>
          <p>Your interests: {interests.join(", ")}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <fieldset>
            <legend>Areas of Interest</legend>

            <label>
              <input
                type="checkbox"
                value="Coding"
                checked={interests.includes("Coding")}
                onChange={handleCheckboxChange}
              />
              Coding
            </label>

            <label>
              <input
                type="checkbox"
                value="Design"
                checked={interests.includes("Design")}
                onChange={handleCheckboxChange}
              />
              Design
            </label>

            <label>
              <input
                type="checkbox"
                value="Marketing"
                checked={interests.includes("Marketing")}
                onChange={handleCheckboxChange}
              />
              Marketing
            </label>
          </fieldset>

          <button type="submit">Submit</button>
        </form>
      )}
    </main>
  );
}

export default App;
