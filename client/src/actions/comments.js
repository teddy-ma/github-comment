
export function commentsIsLoading(bool) {
    return {
        type: 'COMMENTS_IS_LOADING',
        isLoading: bool
    };
}

export function CommentsFetchDataSuccess(comments) {
    return {
        type: 'COMMENTS_FETCH_DATA_SUCCESS',
        comments
    };
}

export function commentsFetchData(url) {
    return (dispatch) => {
        dispatch(commentsIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(itemsIsLoading(false));
                
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(itemsFetchDataSuccess(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}