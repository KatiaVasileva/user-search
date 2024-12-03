import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Search.module.css";
import { User } from "../../interfaces/User";
import { ApiResponse } from "../../interfaces/ApiResponse";
import {
  getQueryFromLocalStorage,
  getTotalCountFromLocalStorage,
  getUsersFromLocalStorage,
  removeQueryFromLocalStorage,
  removeTotalCountFromLocalStorage,
  removeUsersFromLocalStorage,
  saveQueryToLocalStorage,
  saveTotalCountToLocalStorage,
  saveUsersToLocalStorage,
} from "../../utils/usersLocalStorage";

function Search() {
  const [query, setQuery] = useState(getQueryFromLocalStorage);
  const [users, setUsers] = useState<User[]>(getUsersFromLocalStorage);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(getTotalCountFromLocalStorage);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = async (page: number) => {
    setIsLoading(true);
    const url = `https://api.github.com/search/users?q=${query}&page=${page}&per_page=10`;
    const response = await fetch(url);
    const data: ApiResponse = await response.json();
    setUsers(data.items);
    saveUsersToLocalStorage(data.items);
    console.log(data.items);
    setTotalCount(data.total_count);
    saveTotalCountToLocalStorage(data.total_count);
    setIsLoading(false);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchUsers(1);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setUsers(
      [...users].sort((a, b) =>
        sortOrder === "asc" ? b.id - a.id : a.id - b.id
      )
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchUsers(page);
  };

  const handleNewSearch = () => {
    removeUsersFromLocalStorage();
    removeTotalCountFromLocalStorage();
    removeQueryFromLocalStorage();
    setQuery("");
    setUsers([]);
    setTotalCount(0);
    navigate("/");
  };

  return (
    <div>
      <div className={styles.searchBar}>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            saveQueryToLocalStorage(e.target.value);
          }}
          placeholder="Search for GitHub users"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <button onClick={handleSort} className={styles.sortButton}>
        Sort by ID ({sortOrder === "asc" ? "Ascending" : "Descending"})
      </button>
      <button onClick={handleNewSearch} className={styles.sortButton}>
        New Search
      </button>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className={styles.userList}>
          {users.map((user) => (
            <li key={user.id} className={styles.userItem}>
              <img
                src={user.avatar_url}
                alt={user.login}
                className={styles.avatar}
              />
              <div>
                <Link to={`/user/${user.login}`}>{user.login}</Link>
              </div>
            </li>
          ))}
        </ul>
      )}

      {users.length > 0 && (
        <div className={styles.pagination}>
          {Array.from({ length: Math.ceil(totalCount / 10) }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
