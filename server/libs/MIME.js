const _mine = {
    'text/plain':['txt'],
    'text/html':['htm', 'html'],
    'text/css':['css'],
    'text/javascript':['js', 'jsx'],
    'text/png':['png'],
    'text/jpeg':['jpg'],
};

module.exports = {
    getType(ext) {
        for(let prop in _mine){
            let arr = _mine[prop];
            if(arr.includes(ext)){
                return prop;
            }
        }
    },
    getExtension(type) {
        return _mine[type];
    }
}