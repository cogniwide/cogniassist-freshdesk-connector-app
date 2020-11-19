function handleResponse(err, resp) {
  if (!err && resp.statusCode === 200) {
    console.log('API call success');
    console.log(resp)
  }else{
    console.info('API call failed')
    console.error(err)

  }
}
exports = {
  handleResponse: handleResponse
};