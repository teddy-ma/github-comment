
// export const getComments = (url) => {
//   return fetch(url)
//     .then(res => res.json())
// }

export const createComment = (url, text, user_name, repo, page_id) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ body: text, page_id: page_id, repo: repo, user_name: user_name })
  }).then(res => res.json())
}

export const getLoginStatus = (url) => {
  console.log(url);
  return fetch(url, {
    method: "POST",
    credentials: 'include'
  }).then(res => res.json())
}
