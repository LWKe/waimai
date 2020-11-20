import ajax from "./ajax.js"
const url = '/api'
//获取位置
export const reqAddress = geohash => ajax(`${url}/position/${geohash}`)

//获取商铺列表
export const reqShops = ({ latitude, longitude }) => ajax(url + '/shops', { latitude, longitude })
//食品分类列表
export const reqCategorys = () => ajax(`${url}/index_category`)
/**
 * 4、根据经纬度和关键字搜索商铺列表
 * @param {*} geohash
 * @param {*} keyword
 */
export const reqSearchShop = (geohash, keyword) =>
    ajax(url + '/search_shops', { geohash, keyword })

/**
 * 5、获取一次性验证码
 * @param {*}
 */
//  TODO export const

/**
 * 6、用户名密码登陆
 * @param {*} param0
 */
export const reqPwdLogin = ({ name, pwd, captcha }) =>
    ajax(url + '/login_pwd', { name, pwd, captcha }, 'POST')

/**
 * 7、发送短信验证码
 * @param {*} phone
 */
export const reqSendCode = phone => ajax(url + '/sendcode', { phone })

/**
 * 8手机号验证码登陆
 * @param {*} phone
 * @param {*} code
 */
export const reqSmsLogin = (phone, code) => {
    return ajax(`${url}/login_sms`, { phone, code }, 'POST')
}

/**
 * 9、根据会话获取用户信息
 */
export const reqUserInfo = () => ajax(url + '/userinfo')

/**
 * 10、用户登出
 */
export const reqLogout = () => ajax(url + '/logout')


/*
 * 获取商家信息(下列请求由mock拦截并返回 不需要代理)
 */
export const reqShopInfo = () => ajax('/info')
/**
 * 获取商家评价数组
 */
export const reqShopRatings = () => ajax('/ratings')
/**
 * 获取商家商品数组
 */
export const reqShopGoods = () => ajax('/goods')