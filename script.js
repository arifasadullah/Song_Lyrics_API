const search = document.querySelector(".search_area");
const form = document.querySelector("#form");
const result = document.querySelector("#result");
const apiurl = "https://api.lyrics.ovh";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let searchValue = search.value.trim();
  if (!searchValue) {
    alert("nothing to search");
  } else {
    searchData(searchValue);
  }
});

async function searchData(searchValue) {
  const searchResult = await fetch(`${apiurl}/suggest/${searchValue}`);
  const data = await searchResult.json();
  //   console.log(data);
  displayData(data);
}

function displayData(data) {
  result.innerHTML = ` 
    <ul class="songs">
    ${data.data
      .map(
        (song) => `<li>
                           <div>
                           <strong>${song.artist.name}
                           </strong> - ${song.title}
                           </div>
                           <span data-artist="${song.artist.name}"
                            data-songtitle="${song.title}"> Get Lyrics</span>
                          </li>`
      )
      .join("")}
    <ul/>
    `;
}

result.addEventListener("click", (event) => {
  const clickedElement = event.target;
  if (clickedElement.tagName === "SPAN") {
    const artists = clickedElement.getAttribute("data-artist");
    const songTitle = clickedElement.getAttribute("data-songtitle");
    getLyrics(artists, songTitle);
  }
});

async function getLyrics(artist, songTitle) {
  const response = await fetch(`${apiurl}/v1/${artist}/${songTitle}`).catch(
    (err) => {
      console.error(err);
    }
  );
  const data = await response.json();
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
  result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
     <p>${lyrics}</p>`;
}
// const artist = "eminem";
// const songName = "lose yourself";
// fetch(`https://api.lyrics.ovh/v1/${artist}/${songName}`, {
//   method: "GET",
//   headers: {
//     "x-rapidapi-host": "genius.p.rapidapi.com",
//     "x-rapidapi-key": "80816de81bmshf0637a23dd279eep1b71b7jsn6e6d58a2a59a",
//   },
// })
//   //   .then((response) => response.json())
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((err) => {
//     console.error(err);
//   });
