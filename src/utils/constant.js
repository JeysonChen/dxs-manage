/**
 * 一级二级导航数据
 **/ 
export const navMenu = [
    {
        value: 'goods',
        label: '商品',
        children: [
            {
                parent: 'goods',
                label: '发布商品',
                value: 'publishing',
            },
            // {
            //     parent: 'goods',
            //     label: '已发布',
            //     value: 'published',
            // },
            {
                parent: 'goods',
                label: '已上架',
                value: 'onsale',
            },
            {
                parent: 'goods',
                label: '已下架',
                value: 'offsale',
            }
        ]
    },
    {
        value: 'sites',
        label: '站点',
        children: [
            {
                parent: 'sites',
                label: '站点',
                value: 'subsite'
            }
        ]
    },
    {
        value: 'order',
        label: '订单',
        children: [
            {
                parent: 'order',
                label: '已支付',
                value: 'payed'
            },
            {
                parent: 'order',
                label: '已收货',
                value: 'received'
            },
            {
                parent: 'order',
                label: '已取消',
                value: 'canceled'
            },
            {
                parent: 'order',
                label: '退款',
                value: 'refund'
            }
        ]
    },
    {
        value: 'chief',
        label: '团长',
        children: [
            {
                parent: 'chief',
                label: '团长',
                value: 'subchief'
            }
        ]
    },
    {
        value: 'configure',
        label: '配置',
        children: [
            {
                parent: 'configure',
                label: '商品标签',
                value: 'mark'
            },
            {
                parent: 'configure',
                label: '商品分类',
                value: 'category'
            }
        ]
    },
    {
        value: 'cash',
        label: '提现',
        children: [
            {
                parent: 'cash',
                label: '提现申请',
                value: 'applyCash'
            }
        ]
    },
];