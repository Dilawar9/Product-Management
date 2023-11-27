import { Link } from "react-router-dom";

function About() {
    return (
      <>
        <div className="hompage" style={{ backgroundColor: "green" }}>
          <h1>About Page</h1>
        </div>
        <Link to="/">Home</Link>
      </>
    );
  }
  
  export default About;