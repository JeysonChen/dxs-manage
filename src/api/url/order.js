// 订单接口
export default {
    // 订单列表--已支付、已收货、已取消、退款（不同状态，同一接口）
    search: {
        url: '/Order/mallOrder/BgSearch',
        method: 'get'
    },
    paySearch: {
        url: '/Order/mallPay/Search'
    },
    SearchRefound: {
        url: '/Order/mallPay/SearchRefound'
    },
    audit: {
        url: '/Order/mallOrder/Audit',
        method: 'post'
    },
    edit: {
        url: '/Order/mallPay/Edit',
        method: 'post'
    },
    cancelTakeMoney: {
        url: '/Order/mallPay/cancelTakeMoney',
    },
    modify: {
        url: '/Order/mallOrder/Modify',
        method: 'post'
    }
    
    
    
    
}