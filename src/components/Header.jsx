import { Link } from "react-router-dom";
import Leaderboard from "./Leaderboard";

function Header({ playerName }) {
  console.log(playerName)
  return (
    <header className="bg-green-500 fixed top-0 right-0 py-2 px-16 flex justify-end items-center">
      <ul className="flex gap-4">
        <li className="mr-4">
          Hello <strong>{playerName}</strong>
        </li>
        {/* <li>
          <Link to='/leaderboard'
            className="text-white"
          >
            Leaderboard
          </Link>
        </li> */}
      </ul>
    </header>
  );
}

export default Header;
