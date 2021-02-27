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
        label: '分类名称',
        width: '',
        align: 'left',
        fixed: false
    },
    // {
    //     prop: 'markStatus',
    //     label: '状态',
    //     width: '',
    //     align: 'left',
    //     fixed: false
    // }

];
// 分类--form表单数据-父类
export const pFormItem = [
    {
        type: 'upload',
        label: '分类图标',
        prop: 'mainImage',
        placeholder: '',
        limit: 1
    },
    {
        type: 'input',
        label: '分类名称',
        prop: 'name',
        placeholder: ''
    },
    // {
    //     type: 'select',
    //     label: '分类状态',
    //     prop: 'status',
    //     placeholder: '请选择标签状态',
    //     options: [
    //         {
    //             label: '正常',
    //             value: 1
    //         },
    //         {
    //             label: '已废弃',
    //             value: 2
    //         }
    //     ]
    // }
];
// 分类--form表单数据-字类
export const formItem = [
    {
        type: 'select',
        label: '一级分类',
        prop: 'parentId',
        placeholder: '请选择一级分类',
        options: []
    },
    {
        type: 'input',
        label: '分类名称',
        prop: 'name',
        placeholder: ''
    },
    // {
    //     type: 'select',
    //     label: '分类状态',
    //     prop: 'status',
    //     placeholder: '请选择标签状态',
    //     options: [
    //         {
    //             label: '正常',
    //             value: 1
    //         },
    //         {
    //             label: '已废弃',
    //             value: 2
    //         }
    //     ]
    // }
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
export const pDataSet = {
    formSet: {
        labelWidth: '80px',
        labelPosition: 'right',
        inline: false
    },
    titleSet: {
        formTitle: '添加一级分类',
        listTitle: '分类列表'
    }
    
};
export const dataSet = {
    formSet: {
        labelWidth: '80px',
        labelPosition: 'right',
        inline: false
    },
    titleSet: {
        formTitle: '添加二级分类',
        listTitle: '分类列表'
    }
    
}