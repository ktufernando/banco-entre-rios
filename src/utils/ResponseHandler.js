const handleSuccessResponse = (data) => {
    return {
        error: false,
        message: 'OK',
        status: 200,
        data
    };
}

module.exports = {
    handleSuccessResponse
};