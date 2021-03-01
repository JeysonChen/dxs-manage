/**
 * @discribtion:配置--标签的相关数据
**/ 
// 标签列表--表头数据
export const tableTitle = [
    {
        prop: 'receivedPartyUserName',
        label: '提现人姓名',
        width: 100,
        align: 'left',
        fixed: false
    },
    {
        prop: 'receivedPartyUserPhone',
        label: '提现人手机号',
        width: '',
        align: 'left',
        fixed: false
    },
    {
        prop: 'tradeFee',
        label: '提现金额',
        width: '',
        align: 'left',
        fixed: false
    },
    {
        prop: 'statusText',
        label: '取现进度',
        width: '',
        align: 'left',
        fixed: false
    },
    {
        prop: 'tradeMode',
        label: '交易类型',
        width: '',
        align: 'left',
        fixed: false
    },
    {
        prop: 'createTime',
        label: '申请时间',
        width: '160',
        align: 'left',
        fixed: false
    },
    {
        prop: 'updateTime',
        label: '确认提现时间',
        width: '160',
        align: 'left',
        fixed: false
    },
    {
        prop: 'handler',
        label: '操作',
        width: 160,
        align: 'left',
        fixed: false,
        buttonList: [
            {
                label: '确认提现',
                identity: 'confirm'
            },
            {
                label: '取消申请',
                identity: 'cancel'
            }
        ]
    }
]

// 标签--form表单验证数据
export const  rules = {
    name: [
        { required: true, message: '请输入标签名称', trigger: 'blur' },
        // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    sortOrder: [
         { required: true, message: '请输入标签标号', trigger: 'blur' },
         { pattern: /^\d+$/, message: '请输入数字', trigger: 'blur' },
    ],
    status: [
        { required: true, message: '请选择标签状态', trigger: 'change' }
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
        formTitle: '添加标签',
        listTitle: '已添加标签'
    }
    
}