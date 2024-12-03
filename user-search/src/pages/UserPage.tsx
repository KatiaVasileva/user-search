import { useParams } from "react-router-dom";
import UserDetails from "../components/UserDetails/UserDetails";

export default function UserPage() {
    const {username} = useParams();

  return (
    <UserDetails
      username={username}
    />
  );
}
