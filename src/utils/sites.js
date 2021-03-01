/**
 * @discribtion:站点相关数据
**/ 
// 站点列表--表头数据
export const tableTitle = [
    {
        prop: 'index',
        label: '序号',
        width: 60,
        align: 'left',
        fixed: false
    },
    {
        prop: 'deliveryPointName',
        label: '取货点名称',
        width: 120,
        align: 'left',
        fixed: false
    },
    {
        prop: 'deliveryPointMobile',
        label: '手机号',
        width: 120,
        align: 'left',
        fixed: false
    },
    {
        prop: 'deliveryPointProvince',
        label: '所在省',
        width: 80,
        align: 'left',
        fixed: false
    },
    {
        prop: 'deliveryPointCity',
        label: '所在市',
        width: 80,
        align: 'left',
        fixed: false
    },
    {
        prop: 'deliveryPointDistrict',
        label: '所在区',
        width: 80,
        align: 'left',
        fixed: false
    },
    {
        prop: 'deliveryPointZip',
        label: '邮编',
        width: 80,
        align: 'left',
        fixed: false
    },
    {
        prop: 'deliveryPointAddress',
        label: '地址',
        width: '',
        align: 'left',
        fixed: false
    },
    {
        prop: 'handler',
        label: '操作',
        width: 100,
        align: 'left',
        fixed: false,
        buttonList: [
            {
                label: '编辑',
                identity: 'edit'
            },
            {
                label: '删除',
                identity: 'del'
            }
        ]
    }


]; 
// 站点--form表单数据
export const formItem = [
    {
        type: 'input',
        label: '取货点名称',
        prop: 'deliveryPointName',
        placeholder: ''
    },
    {
        type: 'input',
        label: '电话',
        prop: 'deliveryPointMobile',
        placeholder: ''
    },
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
        label: '邮编',
        prop: 'deliveryPointZip',
        placeholder: ''
    },

];
// 站点--form表单验证数据
export const rules = {
    deliveryPointName: [
        { required: true, message: '取货点名称不能为空', trigger: 'blur' },
    ],
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
        labelWidth: '120px',
        labelPosition: 'right',
        inline: false
    },
    titleSet: {
        formTitle: '添加站点',
        listTitle: '已添加站点'
    }
    
}