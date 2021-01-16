// 站点接口
export default {
    // 站点列表
    fetchUserDeliveryPointInfo: {
        url: '/Account/mallDeliveryPoint/FetchUserDeliveryPointInfo',
        method: 'get'
    },
    // 添加站点
    add: {
        url: '/Account/mallDeliveryPoint/Add',
        method: 'post'
    },
    // 删除站点
    delete: {
        url: '/Account/mallDeliveryPoint/Delete',
        method: 'get'
    }
}