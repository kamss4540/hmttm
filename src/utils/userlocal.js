const USER_KEY = 'user'

// 新增和修改 user
function setUserLocal (value) {
  window.localStorage.setItem(USER_KEY,
    JSON.stringify(value))
}

// 删除
function removeUserLocal () {
  window.localStorage.removeItem(USER_KEY)
}

// 查询: 得到localstorage 中的user 对象
function getUserLocal () {
  return JSON.parse(window.localStorage.getItem(USER_KEY))
}

// 暴露
export { setUserLocal, removeUserLocal, getUserLocal }
