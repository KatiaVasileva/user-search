import { useEffect, useState } from "react";
import { User } from "../../interfaces/User";
import styles from "./UserDetails.module.css";
import { useNavigate } from "react-router-dom";

const UserDetails: React.FC<{
  match: { params: { username: string | undefined } };
}> = ({ match }) => {
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://api.github.com/users/${match.params.username}`
      );
      const data = await response.json();
      setUserDetails(data);
      setIsLoading(false);
    };

    fetchUserDetails();
  }, [match.params.username]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleBackToSearchPageButton = () => {
    navigate("/");
  };

  return userDetails ? (
    <div className={styles.userDetails}>
      <img
        src={userDetails.avatar_url}
        alt={userDetails.login}
        className={styles.avatar}
      />
      <h2>{userDetails.login}</h2>
      <p>ID: {userDetails.id}</p>
      <a href={userDetails.html_url}>View on GitHub</a>
      <button onClick={handleBackToSearchPageButton}>
        Return to Search Page
      </button>
    </div>
  ) : (
    <p>User not found.</p>
  );
};

export default UserDetails;
