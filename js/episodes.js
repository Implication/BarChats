//Build the url for itunes api NOTE: if switching to backend the cors variable may not be needed

const cors = 'https://cors-anywhere.herokuapp.com/';
const baseURL = 'itunes.apple.com/lookup?id='
const id = '1493152619';

const episodes = document.getElementById('episodes');

//Make a request to find the podcast
fetch(cors+baseURL+id)
    .then((res) => {
        //Return the given data as a json response
        return res.json();
    })
    .then((data) => {
        console.log(data.results[0].feedUrl);
        //Feednami is a script that read's rss files
        //We use this to grab the url of the rss feeds that contain the audio files
        feednami.load(data.results[0].feedUrl)
            .then(feed => {
                //feed is an array of objects, given that we have the latest episode with spotify embedded, we will start at one.
                const html = feed.entries.map(data => {
                   
                    if(feed.entries.indexOf(data) !== 0)
                        return (
                            `<div class="episode container mb-5">
                            <h5>${data.title}</h5>
                            <audio controls src=${data.enclosures[0].url} type="audio/mpeg">
                            Your browser does not support the audio tag
                            </audio>
                            ${data.description}
                            </div>`)
                }).join('');
                episodes.innerHTML = html;
                console.log(episodes.innerHTML);
            })
    })
    .catch((err) => {
        console.log(err);
    })