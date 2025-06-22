
export function SearchAndFilter({
    sortCriterion,
    setSortCriterion,
    searchCriterion,
    setSearchCriterion,
    searchValue,
    setSearchValue
}) {
    return (
        <div className="search-filter-container">
            <label className="search-filter-label">
                Sort by:
                <select
                    className="search-filter-select"
                    value={sortCriterion}
                    onChange={(e) => setSortCriterion(e.target.value)}
                >
                    <option value="id">ID</option>
                    <option value="alphabetical">Alphabetical</option>
                    <option value="completed">Completion</option>
                    <option value="random">Random</option>
                </select>
            </label>

            <label className="search-filter-label">
                Search by:
                <select
                    className="search-filter-select"
                    value={searchCriterion}
                    onChange={(e) => setSearchCriterion(e.target.value)}
                >
                    <option value="id">ID</option>
                    <option value="title">Title</option>
                    <option value="completed">Completion Status</option>
                </select>
            </label>

            <input
                className="search-filter-input"
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search..."
            />
        </div>
    );
}
