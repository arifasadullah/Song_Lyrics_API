const search = document.querySelector(".searchTerm");
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
  console.log(data.data[0]);

  displayData(data);
}
let img;
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
                         
                           <button data-artist = "${song.artist.name}" data-songtitle = "${song.title}">
                           Get Lyrics

                         </button>
                          </li>`
      )
      .join("")}
    <ul/>
    `;
}

result.addEventListener("click", (event) => {
  const clickedElement = event.target;

  if (clickedElement.tagName === "BUTTON") {
    const artists = clickedElement.getAttribute("data-artist");
    const songTitle = clickedElement.getAttribute("data-songtitle");
    getLyrics(artists, songTitle);
  }
});

async function getLyrics(artist, songTitle) {
  const response = await fetch(`${apiurl}/v1/${artist}/${songTitle}`);
  const data = await response.json();
  if (data.error == undefined) {
    console.log(data.error);
  } else {
    alert(data.error);
  }

  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
  result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
     <p>${lyrics}</p>
     "`;
}

/*-----------------design------------------------------*/
let backgrounds = [
  // `https://images.urbanoutfitters.com/is/image/UrbanOutfitters/40405854_105_s`,
  `https://image.shutterstock.com/image-vector/music-notes-song-melody-tune-260nw-701307613.jpg`,
  // `https://s-media-cache-ak0.pinimg.com/736x/34/dc/e7/34dce70e25e5c3798b548105388b2344.jpg`,
  `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUQsqIjEGAnq1jneFHKW_w_FRWFvne5TWYgA&usqp=CAU`,
  // `http://cdn.playbuzz.com/cdn/45e57781-36a3-4b9c-82f9-6526e9fa7844/8059df54-3f28-432d-89f5-4a345debcf31.jpg`,
  `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb6rlQQbGBDMJwg7LR-bUR-R6zRhn6YblvGw&usqp=CAU`,
  // `https://pbs.twimg.com/profile_images/821526093454856193/kwP94RF9_400x400.jpg`,
  `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0WjWMtW0LywBlPYRIycOAkV1BYjhaGZ771A&usqp=CAU`,
  // `https://pbs.twimg.com/profile_images/812279443347673089/7aYq5LMF.jpg`,
  `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR8UFM7xQL0zIFM3CJDW2GxDcfwFpUFV-Gmw&usqp=CAU`,
  // `https://www.funkyrugs.co.uk/images/C/green.png`,
  `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK6S2e_-t46mtssU6mT1QKa3KIUhm55_MT0mlkrpsT8ZY5p2IEZBrAfnqa_A4SlMpF8Xc&usqp=CAU`,
  // `https://pbs.twimg.com/profile_images/839899814905040896/oEI1n4vd.jpg`,
];

document.querySelectorAll(`#container div`).forEach((ea, i) => {
  ea.style.backgroundImage = `url(${backgrounds[i]})`;
});
