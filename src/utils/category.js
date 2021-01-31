/**
 * @discribtion:配置--分类的相关数据
**/ 
// 分类列表--表头数据
export const tableTitle = [
    {
        prop: 'index',
        label: '序号',
        width: 100,
        align: 'left',
        fixed: false
    },
    {
        prop: 'markName',
        label: '标签名称',
        width: '',
        align: 'left',
        fixed: false
    },
    {
        prop: 'markNumber',
        label: '标签编号',
        width: '',
        align: 'left',
        fixed: false
    },
    {
        prop: 'markStatus',
        label: '标签状态',
        width: '',
        align: 'left',
        fixed: false
    }

];
// 分类--form表单数据
export const formItem = [
    {
        type: 'input',
        label: '分类名称',
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
// 分类--form表单验证数据
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
        formTitle: '添加分类',
        listTitle: '已添加分类'
    }
    
}