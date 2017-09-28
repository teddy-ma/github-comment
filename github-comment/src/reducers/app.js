

export default (state = {}, action) => {
  switch (action.type) {
    case 'init':
      return {...state,
        user_name:         action.payload.user_name,
        repo:              action.payload.repo,
        page_id:           action.payload.page_id,
        server_url:        action.payload.server_url,
        ssl:               action.payload.ssl,
        theme:             action.payload.theme,
        comments_url:      action.payload.comments_url,
        auth_url:          action.payload.auth_url,
        create_comment_ur: action.payload.create_comment_url
      }
    default:
      return state
  }
}
