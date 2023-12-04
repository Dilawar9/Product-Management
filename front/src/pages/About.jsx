import { Link } from "react-router-dom";

function About() {
    return (
      <>
        <div className="hompage" style={{ backgroundColor: "green" }}>
          <h1>About Page</h1>
          <p>What is a product? Tips on how to launch a lovable product
A product is any item or service you sell to serve a customer’s need or want. They can be physical or virtual. Physical products include durable goods (like cars, furniture, and computers) and nondurable goods (like food and beverages). Virtual products are offerings of services or experiences (such as education, software, and streaming services). A product may also be a hybrid — including both physical and virtual elements (like a kitchen appliance with its own mobile app). Hybrid products are becoming more common as traditionally analog products incorporate digital technology as a way to better reach and serve customers.

These categories can help us understand different types of products. But they are not hard and fast rules. For example, software can be considered both a product and a service. Traditionally, you would purchase a physical version of the program and install it on your computer — but today most software products are sold virtually. This approach uses a web-based delivery model and customers pay a recurring subscription fee to access the software. This how the term software-as-a-service (SaaS) originated.</p>
        </div>
        <Link to="/">Home</Link>
      </>
    );
  }
  
  export default About;