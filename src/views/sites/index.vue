<template>
    <div>
        <!-- 添加站点 -->
        <FormBox :formItem="formItem" :rules="rules" :dataSet="dataSet" @add="add" />

        <!-- 站点列表 -->
        <CheckList :tableTitle="tableTitle" />
    </div>
</template>

<script>
import Api from '@/api';
import FormBox from '@/components/formBox';
import CheckList from './module/checkList';
import {formItem, rules, tableTitle, dataSet} from '@/utils/sites';
import { CodeToText} from 'element-china-area-data';

export default {
    name: 'sites',
    data () {
        return {
            formItem: formItem,
            rules: rules,
            tableTitle: tableTitle,
            dataSet: dataSet
        }
    },
    created () {
        
    },
    mounted () {
        
    },
    components: {
        FormBox,
        // AddSite,
        CheckList
    },
    methods: {
        add(formData) {
            // console.log(formData, 'formData');
            Api.sites.add({
                deliveryPointProvince: CodeToText[formData.deliveryPointAddressThree[0]],
                deliveryPointCity: CodeToText[formData.deliveryPointAddressThree[1]],
                deliveryPointDistrict: CodeToText[formData.deliveryPointAddressThree[2]],
                deliveryPointAddress: formData.deliveryPointAddress,
                deliveryPointMobile: formData.deliveryPointMobile
            }).then(res => {
                this.$message.success('添加成功');
            }).catch(err => {
                this.$message.error('添加失败');
            })
        }
    }

    

}
</script>

<style lang="less">
</style>