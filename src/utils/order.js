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
        width: 200,
        align: 'left',
        fixed: 'right',
        buttonList: [
            {
                label: '确认发货',
                identity: 'confirmSend'
            },
            {
                label: '取消订单',
                identity: 'cancelOrder'
            }
        ]
    },
    send: {
        prop: 'handler',
        label: '操作',
        width: 200,
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
    arrived: {
        prop: 'handler',
        label: '操作',
        width: 200,
        align: 'left',
        fixed: 'right',
        buttonList: [
            {
                label: '取消订单',
                identity: 'cancelOrder'
            }
        ]
    },
    received: {
        prop: 'handler',
        label: '操作',
        width: 200,
        align: 'left',
        fixed: 'right',
       
    },
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
// UNPAID(10, "unpaid", "未支付"),
// PAID_ING(20, "paid_ing", "支付中"),
// PAID(30, "paid", "支付成功"),
// CANCEL(40, "cancel", "交易取消"),
// FINISH(50, "finish", "已发货"),
// DELIVERY_POINT_FINISH(55, "delivery_point_finish", "货物已到取货点"),
// SHIPPED(60, "shipped", "确认收货"),
// AUTO_FINISH(70, "auto_finish", "自动确认收货"),
// REFOUND_APPLY(80, "refound_apply", "退款审核中"),
// NOT_SHIPPED_REFOUND_APPLY(81, "not_shipped_refound_apply", "未发货取消订单，退款申请"),
// REFOUND_FINISH(90, "refound_finish", "退款审核通过"),
// REFOUND_REJECT(100, "refound_reject", "退款审核驳回"),
// ORDER_COMPLETE(110, "order_complete", "交易完成"),
// ORDER_CLOSED(120, "order_closed", "交易关闭");

// 订单列表分类--不同状态：已支付、已收货、已取消、退款 
export const orderStatus = {
    'payed': 30,
    'send': 50,
    'arrived': 55,
    'received': 60,
    'canceled': 40,
    'refund': 80
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