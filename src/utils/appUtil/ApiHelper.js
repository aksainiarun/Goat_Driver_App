export const BASE_URL='https://grocery1.onrender.com/api/'
export const postWithBody = (subURL, body) => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + subURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json)
      })
      .catch((error) => {
        reject({err:true,msg:'Something want wrong'})
        console.log(subURL,"this is catch postWithBody", error);
      });
  })
}

export const postRequest = (subURL) => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + subURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json)
      })
      .catch((error) => {
        reject({err:true,msg:'Something want wrong'})
        console.log(subURL,"this is catch postRequest", error);
      });
  })
}

export const getRequest = (subURL) => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + subURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json)
      })
      .catch((error) => {
        reject({err:true,msg:'Something want wrong'})
        console.log(subURL,"this is catch getRequest", error);
      });
  })
}

export const deleteRequest = (subURL) => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + subURL, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json)
      })
      .catch((error) => {
        reject({err:true,msg:'Something want wrong'})
        console.log(subURL,"this is catch getRequest", error);
      });
  })
}


export const putRequestWithBody = (subURL,body) => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + subURL, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: body,
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json)
      })
      .catch((error) => {
        reject({err:true,msg:'Something want wrong'})
        console.log(subURL,"putRequestWithBody", error);
      });
  })
}