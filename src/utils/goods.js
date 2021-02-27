/**
 * 商品相关数据
**/ 
// 商品列表--表头数据
export const tableTitle = [
    {
        prop: 'name',
        label: '商品名称',
        width: '160',
        align: 'left',
        fixed: true
    },
    {
        prop: 'monthlySales',
        label: '月销量',
        width: 100,
        align: 'right',
        fixed: false
    },
    {
        prop: 'originPrice',
        label: '原价',
        width: 100,
        align: 'right',
        fixed: false
    },
    {
        prop: 'salePrice',
        label: '销售价',
        width: 100,
        align: 'right',
        fixed: false
    },
    {
        prop: 'costPrice',
        label: '成本价',
        width: 100,
        align: 'right',
        fixed: false
    },
    {
        prop: 'groupOwnerPhone',
        label: '大团主',
        width: '120',
        align: 'center',
        fixed: false
    },
    {
        prop: 'createTime',
        label: '上架时间',
        width: 160,
        align: 'center',
        fixed: false
    },
    {
        prop: 'stock',
        label: '库存',
        width: 100,
        align: 'right',
        fixed: false
    },
    {
        prop: 'pageViews',
        label: '浏览量',
        width: 100,
        align: 'right',
        fixed: false
    },
    {
        prop: 'orderQuantity',
        label: '下单量',
        width: 100,
        align: 'right',
        fixed: false
    },
    {
        prop: 'transform',
        label: '转化率',
        width: 100,
        align: 'right',
        fixed: false
    },
    {
        prop: 'shareNumbers',
        label: '分享数',
        width: 100,
        align: 'right',
        fixed: false
    },
    {
        prop: 'groupOwnerEarnings',
        label: '团主收益',
        width: 100,
        align: 'right',
        fixed: false
    },
    {
        prop: 'helphairEarnings',
        label: '帮发货收益',
        width: 100,
        align: 'right',
        fixed: false
    },
    {
        prop: 'shareEarnings',
        label: '自转发收益',
        width: 100,
        align: 'right',
        fixed: false
    },
    

];

export const tableHandler = {
    onsale: {
        prop: 'handler',
        label: '操作',
        width: 160,
        align: 'left',
        fixed: 'right',
        buttonList: [
            {
                label: '编辑',
                identity: 'edit'
            },
            {
                label: '下架',
                identity: 'offsale'
            },
            {
                label: '删除',
                identity: 'del'
            }
        ]
    },
    offsale: {
        prop: 'handler',
        label: '操作',
        width: 160,
        align: 'left',
        fixed: 'right',
        buttonList: [
            {
                label: '编辑',
                identity: 'edit'
            },
            {
                label: '上架',
                identity: 'onsale'
            },
            {
                label: '删除',
                identity: 'del'
            }
        ]
    }
};
// 商品列表分类--不同状态：已发布、已下架、已上架 
export const goodsStatus = {
    'onsale': 1,
    'offsale': 2
};

export const dataSet = {
    formSet: {
        labelWidth: '80px',
        labelPosition: 'right',
        inline: true
    },
    titleSet: {
        formTitle: '',
        listTitle: '商品列表'
    }
    
}