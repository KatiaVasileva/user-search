import { useState } from "react";
import { Link } from "react-router-dom";

interface User {
  login: string;
  avatar_url: string;
  html_url: string;
  id: number;
}

interface ApiResponse {
  items: User[];
  total_count: number;
}

function Search() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async (page: number) => {
    setIsLoading(true);
    const url = `https://api.github.com/search/users?q=${query}&page=${page}&per_page=10`;
    const response = await fetch(url);
    const data: ApiResponse = await response.json();
    setUsers(data.items);
    setTotalCount(data.total_count);
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

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for GitHub users"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <button onClick={handleSort} className="sort-button">
        Sort by ID ({sortOrder === "asc" ? "Ascending" : "Descending"})
      </button>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.id} className="user-item">
              <img src={user.avatar_url} alt={user.login} className="avatar" />
              <div>
                <Link to={`/user/${user.login}`}>{user.login}</Link>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="pagination">
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
    </div>
  );
}

export default Search;
