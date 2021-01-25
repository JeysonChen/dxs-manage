// 商品接口
export default {
    // 添加商品(发布)
    add: {
        url: '/Product/mallProduct/Add',
        method: 'post'
    },
    // 商品列表（已发布、已上架、已下架）
    // list: {

    // },
    // 编辑商品
    edit: {
        url: '/Product/mallProduct/Edit',
        method: 'post'
    },
    // 下架商品
    onsale: {
        url: '/Product/mallProduct/Delete',
        method: 'post'
    },
    getCategoryList: {
        url: '/Product/mallCategory/List',
        method: 'post'
    },
    // 上架商品
    // offsale: {
    //     url: '',
    //     method: ''
    // },
    // 删除商品
    // delete: {
    //     url: '',
    //     method: ''
    // }

};
