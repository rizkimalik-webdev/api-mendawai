const ok = function (res, data) {
    let values = {
        'status': 200,
        'message': 'success',
        'data': data
    }
    res.json(values);
    res.end();
}

module.exports = {ok};