import { Link, useSearchParams } from "react-router-dom";

const Navbar = () => {
  const [searchParams] = useSearchParams();
  let todosData = searchParams.get("todos");

  return (
    <div>
      <nav>
        <Link to="/" className={todosData === null ? "active" : ""}>
          All
        </Link>
        <Link
          to="/?todos=active"
          className={todosData === "active" ? "active" : ""}
        >
          Active
        </Link>
        <Link
          to="/?todos=completed"
          className={todosData === "completed" ? "active" : ""}
        >
          Completed
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
