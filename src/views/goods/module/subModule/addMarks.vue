<template>
    <div>
        <el-input 
            v-for="(item, index) in data"
            :key="index"
            class="com-input"
            v-model="item.value" 
            size="small">
            <template slot="prepend">标签{{index+1}}:</template>
                <i
                class="el-icon-remove-outline"
                slot="suffix"
                @click="removeMark">
            </i>
        </el-input>
        <i class="el-icon-circle-plus-outline"></i>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            default: () => [{value: ''}]
        }
    },
    methods: {
        // 新增标签
        addMark(index) {
            this.formData.marks.push({
                value: '',
                id:  0
            });
        },
        removeMark(item) {
            var index = this.formData.marks.indexOf(item)
            if (index !== -1) {
                this.formData.marks.splice(index, 1)
            }
        },
    }
}
</script>

<style>

</style>