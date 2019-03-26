function getAllMedia() {
  return (
    fetch("http://media.mw.metropolia.fi/wbma/media/")
    .then( response => {
      return response.json()
    })
    .catch(function (error) {
      console.log(error);
    })
  );
}

export {getAllMedia}