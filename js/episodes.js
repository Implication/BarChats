//Build the url for itunes api NOTE: if switching to backend the cors variable may not be needed

const cors = "https://cors-anywhere.herokuapp.com/";
const baseURL = "itunes.apple.com/lookup?id=";
const id = "1493152619";

const episodes = document.getElementById("episodes");
const feature = document.getElementById("feature");

//Make a request to find the podcast
fetch(cors + baseURL + id)
  .then(res => {
    //Return the given data as a json response
    return res.json();
  })
  .then(data => {
    //Feednami is a script that read's rss files
    //We use this to grab the url of the rss feeds that contain the audio files
    feednami.load(data.results[0].feedUrl).then(feed => {
      //feed is an array of objects, given that we have the latest episode with spotify embedded, we will start at one.
      let featurehtml = "";
      const html = feed.entries
        .map(data => {
          //This will grab all of the episodes except for the latest one.
          if (feed.entries.indexOf(data) !== 0)
            return `<div class="episode container mb-5 p-5 border rounded border-warning border-3">
                            <h5>${data.title}</h5>
                            <audio class="audio-text-color audio-size" controls src=${data.enclosures[0].url} type="audio/mpeg">
                            Your browser does not support the audio tag
                            </audio>
                            ${data.description}
                            </div>`;
        })
        .join("");
      episodes.innerHTML += html;
      feature.innerHTML = featurehtml;
    });
  })
  .catch(err => {
    console.log(err);
  });
