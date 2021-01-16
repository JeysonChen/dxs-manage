// 订单列表  表头数据
export const tableTitle = [
    {
        prop: 'orderNo',
        label: '订单号',
        width: 140,
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
    {
        prop: 'deliveryPointMobile',
        label: '站点电话',
        width: 100,
        align: 'center',
        fixed: false
    },
    {
        prop: 'productName',
        label: '购买商品',
        width: 160,
        align: 'right',
        fixed: false
    },
    {
        prop: 'productNum',
        label: '数量',
        width: 100,
        align: 'right',
        fixed: false
    },
    {
        prop: 'paymentTypeList',
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
    {
        prop: 'paymentTime',
        label: '支付时间',
        width: 160,
        align: 'right',
        fixed: false
    },
    {
        prop: 'share',
        label: '来自',
        width: 80,
        align: 'right',
        fixed: false
    }

];

// 订单列表分类--不同状态：已支付、已收货、已取消、退款 
export const orderStatus = {
    'payed': 1,
    'received': 2,
    'canceled': 3,
    'refund': 4
};