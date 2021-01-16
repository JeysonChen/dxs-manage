/**
 * 商品相关数据
**/ 
// 商品列表--表头数据
export const tableTitle = [
    {
        prop: 'id',
        label: '商品ID',
        width: 100,
        align: 'left',
        fixed: true
    },
    {
        prop: 'name',
        label: '商品名称',
        width: '160',
        align: 'left',
        fixed: false
    },
    {
        prop: 'price',
        label: '金额',
        width: 100,
        align: 'right',
        fixed: false
    },
    {
        prop: 'chief',
        label: '大团主',
        width: '120',
        align: 'center',
        fixed: false
    },
    {
        prop: 'time',
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
        prop: 'views',
        label: '浏览器',
        width: 100,
        align: 'right',
        fixed: false
    },
    {
        prop: 'paynumber',
        label: '下单量',
        width: 100,
        align: 'right',
        fixed: false
    },
    {
        prop: 'inversion',
        label: '转化率',
        width: 100,
        align: 'right',
        fixed: false
    },
    {
        prop: 'share',
        label: '分享数',
        width: 100,
        align: 'right',
        fixed: false
    }

];
// 商品列表分类--不同状态：已发布、已下架、已上架 
export const goodsStatus = {
    'published': 1,
    'onsale': 2,
    'offsale': 3
};