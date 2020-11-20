/*
vuex 的 mutations 模块
*/
import Vue from 'vue'
import {
    RECEIVE_ADDRESS,
    RECEIVE_SHOPS,
    RECEIVE_CATEGORYS,
    RECEIVE_USERINFO,
    RECEIVE_INFO,
    RECEIVE_RATINGS,
    RECEIVE_GOODS,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
    CLEAR_CART,
    RECEIVE_SEARCH_SHOPS,
    RESET_USER_INFO
} from './mutation-types'
// [方法名](state,{param}){}————实现更改state
export default {
    [RECEIVE_ADDRESS](state, { address }) {//调度地址信息
        state.address = address
    },
    [RECEIVE_SHOPS](state, { shoplist }) {//调度信息
        state.shoplist = shoplist
    },
    //调度商品列表信息
    [RECEIVE_CATEGORYS](state, { categorys }) {
        state.categorys = categorys
    },
    //调度用户信息
    [RECEIVE_USERINFO](state, { userinfo }) {
        state.userinfo = userinfo
    },
    //调度商家信息
    [RECEIVE_INFO](state, { info }) {
        state.info = info
    },
    // 调度评价
    [RECEIVE_RATINGS](state, { ratings }) {
        state.ratings = ratings
    },
    // 调度商品列表
    [RECEIVE_GOODS](state, { goods }) {
        state.goods = goods
    },
    [INCREMENT_FOOD_COUNT](state, { food }) {
        if (!food.count) { // 第一次增加
            // food.count = 1  // 新增属性(没有数据绑定)
            /*
            对象
            属性名
            属性值
             */
            Vue.set(food, 'count', 1) // 让新增的属性也有数据绑定
            // 将food添加到cartFoods中
            state.cartFoods.push(food)
        } else {
            food.count++
        }
    },
    [DECREMENT_FOOD_COUNT](state, { food }) {
        if (food.count) {// 只有有值才去减
            food.count--
            if (food.count === 0) {
                // 将food从cartFoods中移除
                state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
            }
        }
    },
    //清除购物车
    [CLEAR_CART](state) {
        // 清除food中的count
        state.cartFoods.forEach(food => food.count = 0)
        // 移除购物车中所有购物项
        state.cartFoods = []
    },
    //搜索商家
    [RECEIVE_SEARCH_SHOPS](state, { searchShops }) {
        state.searchShops = searchShops

    },
    // 退出登录
    [RESET_USER_INFO](state) {
        state.userinfo = {}
    },
}