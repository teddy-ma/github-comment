// 负责调用 github comment 的服务端 API
import $ from 'jquery';
import fetch from 'isomorphic-fetch';

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
