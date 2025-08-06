document.addEventListener("DOMContentLoaded", () => {
  const profile = JSON.parse(localStorage.getItem("userProfile"));

  if (!profile) {
    window.location.href = "/"; // fallback if no data
    return;
  }

  const { name, goal, experience, topics } = profile;

  document.getElementById("userName").textContent = name.split(" ")[0] || "friend";
  document.getElementById("summaryText").textContent = `Your goal is to ${goal}, you're a ${experience}, and you're interested in ${topics.join(", ")}.`;

  const container = document.getElementById("recommendations");

  topics.forEach(topic => {
    container.innerHTML += `
      <div class="card">
        <h3>Getting Started with ${topic}</h3>
        <ul>
          <li><a href="https://www.youtube.com/results?search_query=${topic}+for+${experience}" target="_blank">Top beginner videos on ${topic}</a></li>
          <li><a href="https://www.google.com/search?q=best+tools+for+${topic}+${goal}" target="_blank">Best tools for ${goal} in ${topic}</a></li>
          <li><a href="https://www.reddit.com/search/?q=${topic}+stories" target="_blank">Stories from people learning ${topic}</a></li>
        </ul>
      </div>
    `;
  });

  // Search input functionality
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    if (query.length >= 3) {
      searchResults.innerHTML = `
        <div class="card">
          <h3>Search Resources for “${query}”</h3>
          <ul>
            <li><a href="https://www.youtube.com/results?search_query=${encodeURIComponent(query)}" target="_blank">YouTube Results</a></li>
            <li><a href="https://www.google.com/search?q=${encodeURIComponent(query)}" target="_blank">Google Results</a></li>
            <li><a href="https://www.reddit.com/search/?q=${encodeURIComponent(query)}" target="_blank">Reddit Discussions</a></li>
          </ul>
        </div>
      `;
    } else {
      searchResults.innerHTML = "";
    }
  });
});
