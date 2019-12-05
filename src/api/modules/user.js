export default ({
  request
}) => ({
  USER_LOGIN (data) {
    return request({
      url: '/login',
      method: 'post',
      data
    })
  }
})
