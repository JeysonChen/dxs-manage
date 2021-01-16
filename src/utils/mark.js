/**
 * @discribtion:配置--标签的相关数据
**/ 
// 标签列表--表头数据
export const tableTitle = [
    {
        prop: 'id',
        label: '序号',
        width: 100,
        align: 'left',
        fixed: false
    },
    {
        prop: 'name',
        label: '标签名称',
        width: '',
        align: 'left',
        fixed: false
    },
    {
        prop: 'sortOrder',
        label: '标签编号',
        width: '',
        align: 'left',
        fixed: false
    },
    {
        prop: 'status',
        label: '标签状态',
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
]
// 标签--form表单数据
export const formItem = [
    {
        type: 'input',
        label: '标签名称',
        prop: 'name',
        placeholder: ''
    },
    {
        type: 'input',
        label: '标签编号',
        prop: 'sortOrder',
        placeholder: ''
    },
    {
        type: 'select',
        label: '标签状态',
        prop: 'status',
        placeholder: '请选择标签状态',
        options: [
            {
                label: '正常',
                value: 1
            },
            {
                label: '已废弃',
                value: 2
            }
        ]
    }
];
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