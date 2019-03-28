function getAllMedia() {
  return (
    fetch("http://media.mw.metropolia.fi/wbma/media/")
    .then( response => {
      return response.json()
    })
    .catch((error) => {
      console.log(error);
    })
  );
}

function getSingleMedia(id) {
  return (
    fetch(`http://media.mw.metropolia.fi/wbma/media/${id}`)
      .then( response => {
        return response.json()
      })
      .catch((error) => {
        console.log(error);
      })
  );
}

export {getAllMedia, getSingleMedia}