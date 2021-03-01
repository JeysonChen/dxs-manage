// 订单列表  表头数据
export const tableTitle = [
    {
        prop: 'orderNo',
        label: '订单号',
        width: 160,
        align: 'left',
        fixed: true
    },
    {
        prop: 'receiveName',
        label: '取货人名称',
        width: '100',
        align: 'left',
        fixed: false
    },
    {
        prop: 'receiveMobile',
        label: '取货人手机号',
        width: 100,
        align: 'right',
        fixed: false
    },
    {
        prop: 'deliveryPointName',
        label: '站点地址',
        width: '160',
        align: 'center',
        fixed: false
    },
    // {
    //     prop: 'deliveryPointMobile',
    //     label: '站点电话',
    //     width: 100,
    //     align: 'center',
    //     fixed: false
    // },
    {
        prop: 'buyProducts',
        label: '购买商品',
        width: 160,
        align: 'right',
        fixed: false
    },
    {
        prop: 'quantity',
        label: '数量',
        width: 100,
        align: 'right',
        fixed: false
    },
    {
        prop: 'tradeType',
        label: '支付方式',
        width: 100,
        align: 'right',
        fixed: false
    },
    {
        prop: 'payment',
        label: '支付金额',
        width: 100,
        align: 'right',
        fixed: false
    },
    // {
    //     prop: 'paymentTime',
    //     label: '支付时间',
    //     width: 160,
    //     align: 'right',
    //     fixed: false
    // },
    {
        prop: 'orderType',
        label: '来自',
        width: 80,
        align: 'right',
        fixed: false
    }

];

export const refundTableTitle = [
    {
        prop: 'orderNo',
        label: '订单号',
        width: 160,
        align: 'left',
        fixed: true
    },
    {
        prop: 'auditTime',
        label: '审核时间',
        width: '160',
        align: 'left',
        fixed: false
    },
    {
        prop: 'createTime',
        label: '创建时间',
        width: 160,
        align: 'right',
        fixed: false
    },
    {
        prop: 'payment',
        label: '退款金额',
        width: '120',
        align: 'center',
        fixed: false
    },
    {
        prop: 'refundImages',
        label: '退款图片',
        width: '160',
        align: 'center',
        fixed: false,
        type: 'img'
    },
    {
        prop: 'refundReason',
        label: '退款原因',
        width: '160',
        align: 'center',
        fixed: false
    },
    {
        prop: 'statusInfo',
        label: '退款状态',
        width: '100',
        align: 'center',
        fixed: false
    },
    
];
export const tableHandler = {
    payed: {
        prop: 'handler',
        label: '操作',
        width: 160,
        align: 'left',
        fixed: 'right',
        buttonList: [
            {
                label: '确认送达',
                identity: 'confirmDeliver'
            },
            {
                label: '取消订单',
                identity: 'cancelOrder'
            }
        ]
    },
    received: {},
    canceled: {},
    refund: {
        prop: 'handler',
        label: '操作',
        width: 100,
        align: 'left',
        fixed: 'right',
        buttonList: [
            {
                label: '确认退款',
                identity: 'confirmRefund'
            }
        ]
    }
}

// 订单列表分类--不同状态：已支付、已收货、已取消、退款 
export const orderStatus = {
    'payed': 30,
    'received': 2,
    'canceled': 3,
    'refund': 4
};

export const dataSet = {
    formSet: {
        labelWidth: '80px',
        labelPosition: 'right',
        inline: true
    },
    titleSet: {
        formTitle: '',
        listTitle: '订单列表'
    }
    
}