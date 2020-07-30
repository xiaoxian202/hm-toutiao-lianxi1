// 用户信息

const Key = 'hm-toutiao-lianxi1'

// 保存
/**
 * 
 * @param {Object} user 用户信息对象
 */
const setUser = user => {
    window.sessionStorage.setItem(Key,JSON.stringify(user))
}
// 获取
const getUser = () => {
    const loadUser =  window.sessionStorage.getItem(Key)
    // loadUser的结果是字符串或者是null，不能把Null转出去会报错
    return JSON.parse(loadUser || '{}')
}
// 删除
const delUser = () => {
    window.sessionStorage.removeItem(Key)
}

// 导出
export default {setUser,getUser,delUser}