// 负责调用 github comment 的服务端 API
import $ from 'jquery';
import fetch from 'isomorphic-fetch';

// export function fetchComments(subreddit) {
//   // Thunk middleware 知道如何处理函数。
//   // 这里把 dispatch 方法通过参数的形式传给函数，
//   // 以此来让它自己也能 dispatch action。
//   return function (dispatch) {
//     // 首次 dispatch：更新应用的 state 来通知
//     // API 请求发起了。
//     dispatch(requestPosts(subreddit))
//     // thunk middleware 调用的函数可以有返回值，
//     // 它会被当作 dispatch 方法的返回值传递。
//     // 这个案例中，我们返回一个等待处理的 promise。
//     // 这并不是 redux middleware 所必须的，但这对于我们而言很方便。
//
//     return fetch(`http://www.subreddit.com/r/${subreddit}.json`)
//       .then(response => response.json())
//       .then(json =>
//
//         // 可以多次 dispatch！
//         // 这里，使用 API 请求结果来更新应用的 state。
//
//         dispatch(receivePosts(subreddit, json))
//       )
//
//       // 在实际应用中，还需要
//       // 捕获网络请求的异常。
//   }
// }

export function loadComments(url){
    var ret = {};
    $.ajax({
        type: "GET",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        xhrFields: {
            withCredentials: true
        },
        url: url,
    }).done(function(data) {
        ret = [true, data];
    }.bind(this)).fail(function(xhr) {
        ret = [false, null];
    });
    return ret;
}

export function authRequest(url){
    var ret = {};
    $.ajax({
        type: "POST",
        async: false,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        xhrFields: {
            withCredentials: true
        },
        url: url,
    }).done(function(data) {
        ret = [true, data];
    }.bind(this)).fail(function(xhr) {
        ret = [false, null];
    });
    return ret;
}

export function createComment(url, data){
    var ret = {};
    $.ajax({
        type: "POST",
        async: false,
        dataType: "json",
        processData: false,
        contentType: "application/json; charset=utf-8",
        xhrFields: {
            withCredentials: true
        },
        data: data,
        url: url
    }).done(function(data) {
        ret = [true, data];
    }.bind(this)).fail(function(xhr) {
        ret = [false, null]
    });
    return ret;
}
