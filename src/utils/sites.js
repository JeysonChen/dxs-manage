/**
 * @discribtion:站点相关数据
**/ 
// 站点列表--表头数据
export const tableTitle = [
    {
        prop: 'index',
        label: '序号',
        width: 100,
        align: 'left',
        fixed: false
    },
    {
        prop: 'siteName',
        label: '地址',
        width: '',
        align: 'left',
        fixed: false
    },
    {
        prop: 'phone',
        label: '手机号',
        width: 160,
        align: 'left',
        fixed: false
    }

]; 
// 站点--form表单数据
export const formItem = [
    {
        type: 'cascader',
        label: '省市区',
        prop: 'deliveryPointAddressThree',
        placeholder: ''
    },
    {
        type: 'input',
        label: '详细地址',
        prop: 'deliveryPointAddress',
        placeholder: ''
    },
    {
        type: 'input',
        label: '电话',
        prop: 'deliveryPointMobile',
        placeholder: ''
    },

];
// 站点--form表单验证数据
export const rules = {
    deliveryPointAddressThree: [
        { required: true, message: '省市区地址不能为空', trigger: 'change' },
    ],
    deliveryPointAddress: [
        { required: true, message: '详细地址不能为空', trigger: 'blur' },
    ],
    deliveryPointMobile: [
        { required: true, message: '站点电话不能为空', trigger: 'blur' },
        { pattern: /^1[35789]\d{9}$/, message: '请输入正确的号码格式', trigger: 'blur' },

    ]
}
// 标签--form表单 el-form、标题等基础配置数据
export const dataSet = {
    formSet: {
        labelWidth: '80px',
        labelPosition: 'right',
        inline: true
    },
    titleSet: {
        formTitle: '添加站点',
        listTitle: '已添加站点'
    }
    
}