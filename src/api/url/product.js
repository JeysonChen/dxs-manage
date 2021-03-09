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
    soldOut: {
        url: '/Product/mallProduct/SoldOut',
        method: 'post'
    },
    // 上架商品
    shelves: {
        url: '/Product/mallProduct/Shelves',
        method: 'post'
    },
    
    getCategoryList: {
        url: '/Product/mallCategory/List',
        method: 'post'
    },
    listTree: {
        url: '/Product/mallCategory/ListTree',
        method: 'post'
    },
    searchFromManager: {
        url: '/Product/mallProduct/SearchFromManager',
    },
    delete: {
        url: '/Product/mallProduct/Delete',
        method: 'post'
    },
    info: {
        url: '/Product/mallProduct/Info',
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
