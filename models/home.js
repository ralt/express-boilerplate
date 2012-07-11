module.exports = {
    getDatas: getDatas
};

function getDatas( callback ) {
    callback( undefined, {
        title: 'Some title',
        text: 'Some text'
    });
}

