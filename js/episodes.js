let playlist = {};

const getPlaylist = async (gP) => {
    const res = await axios.get("https://api.spotify.com/v1/albums/6DO0eZQ1JNw0hZZqFnq1jG/tracks")
     gP = res.data;
    return getPlaylist;
};

getPlaylist(playlist)
    .then(() => {
        console.log(playlist);
    })
    .catch((err) => {
        console.log("Request denied response: ", err);
    })