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
        prop: 'username',
        label: '用户名',
        width: '',
        align: 'left',
        fixed: false
    },
    {
        prop: 'nickName',
        label: '昵称',
        width: '',
        align: 'left',
        fixed: false
    },
    {
        prop: 'phone',
        label: '手机号',
        width: '',
        align: 'left',
        fixed: false
    },
    {
        prop: 'email',
        label: '邮箱',
        width: '',
        align: 'left',
        fixed: false
    },
    // {
    //     prop: 'password',
    //     label: '密码',
    //     width: '',
    //     align: 'left',
    //     fixed: false
    // },
    {
        prop: 'avatar',
        label: '头像',
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
// 分类--form表单数据-父类
export const formItem = [
    {
        type: 'upload',
        label: '头像',
        prop: 'avatar',
        placeholder: '',
        limit: 1
    },
    {
        type: 'input',
        label: '用户名',
        prop: 'username',
        placeholder: ''
    },
    {
        type: 'input',
        label: '昵称',
        prop: 'nickName',
        placeholder: ''
    },
    {
        type: 'input',
        label: '手机号',
        prop: 'phone',
        placeholder: ''
    },
    {
        type: 'input',
        label: '邮箱',
        prop: 'email',
        placeholder: ''
    },
    {
        type: 'password',
        label: '密码',
        prop: 'password',
        placeholder: ''
    },
];

// 分类--form表单验证数据
export const  rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        // { pattern: /^1d{10}$/, message: '请输入正确的手机号', trigger: 'blur' },
    ],
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
    ],
    email: [
        // { required: true, message: '请输入邮箱', trigger: 'blur' },
        { pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱', trigger: 'blur' },
    ]
}
// 标签--form表单 el-form、标题等基础配置数据
export const dataSet = {
    formSet: {
        labelWidth: '80px',
        labelPosition: 'right',
        inline: false
    },
    titleSet: {
        formTitle: '添加团长',
        listTitle: '团长列表'
    }
    
};
