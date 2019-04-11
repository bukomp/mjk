const apiUrl = 'http://media.mw.metropolia.fi/wbma/';

const getAllMedia = () => {
  return fetch(apiUrl + 'media/').then(response => {
    return response.json();
  }).then(json => {
    console.log(json);
    return Promise.all(json.map(pic => {
      return fetch(apiUrl + 'media/' + pic.file_id).then(response => {
        return response.json();
      });
    })).then(pics => {
      console.log(pics);
      return pics;
    });
  });
};

const getSingleMedia = (id) => {
  return fetch(apiUrl + 'media/' + id).then(response => {
    return response.json();
  });
};

const getUserProfilePic = (id, token) => {
  const settings = {
    headers: {
      'x-access-token': token,
    }
  };
  return fetch(apiUrl + 'tags/profile', settings).then( response => {return response.json();}).then(json => {
    let pic;
    for(let g of json){
      if(g["user_id"] === id) pic = 'http://media.mw.metropolia.fi/wbma/uploads/'+g.filename;
    }
    console.log(pic + " I AM HERE!!!");

    return pic;
  });
};

const login = (username, password) => {
  const settings = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, password}),
  };
  return fetch(apiUrl + 'login', settings).then(response => {
      return response.json();
  });
};

const register = (user) => {
  const settings = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };
  return fetch(apiUrl + 'users', settings).then(response => {
    return response.json();
  });
};

const getUser = (token) => {
  const settings = {
    headers: {
      'x-access-token': token,
    }
  };
  return fetch(apiUrl + 'users/user', settings).then(response => {
    return response.json();
  }).then( response => {
    //console.log(response);
    getUserProfilePic(response["user_id"],response.token).then(pic => {response.avatar = pic});
    return response;
  });
};

const uploadFile = (token, formData) => {
  const settings = {
    method: 'POST',
    headers: {
      'x-access-token': token,
    },
    body: formData
  };
  return fetch('http://media.mw.metropolia.fi/wbma/media', settings).then(result => result.json());
};


export {getAllMedia, getSingleMedia, login, register, getUser, getUserProfilePic, uploadFile};