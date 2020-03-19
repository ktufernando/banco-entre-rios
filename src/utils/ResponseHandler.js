const handleSuccessResponse = (payload) => {
    return {
        error: false,
        message: 'OK',
        status: 200,
        payload
    };
}

module.exports = {
    handleSuccessResponse
};