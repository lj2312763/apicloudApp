/**
 * 重新定义ajax方法
 *
 */
let ajax = {
    options: {
        charset: 'utf-8',
        dataType: 'json',
        returnAll: true,
        cache: false,
        data: {
            values: {},
            files: {}
        }
    },
    get: function (url) {
        this.options.url = url;
        return this
    },
    post: function (url) {
        this.options.url = url;
        return this
    },
    send: function (params) {
        params && (this.options.data = params);
        return this;
    },
    end: function (callback) {
        api.ajax(this.options, function (ret, err) {
            callback && callback(ret, err);
        })
    }
}


function _ajax(params) {
    let defaultParams = {
        url: '../ajax.json',
        method: 'get',
        charset: 'utf-8',
        dataType: 'json',
        cache: false,
        data: {
            values: {},
            files: {}
        }
    };

    let param = Object.assign({}, defaultParams, params);
    return function (resolve, reject) {
        api.ajax(param, function (ret, err) {
            if (ret) {
                resolve(ret)
            } else {
                reject(err)
            }
        })
    }

}

function AJAX(params) {
    let obj = {};
    let res;
    return (
        new Promise(_ajax(params)).then(function (res) {
            res = {errcode: 1, data: res};
            obj.success = function (callback) {
                callback && callback(res)
            };
            return obj
        }).catch(function (err) {
            res = {errcode: 0, data: err};
            obj.success = function (callback) {
                callback && callback(res)
            };
            return obj
        })
    )()
}

