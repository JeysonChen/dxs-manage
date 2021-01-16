<template>
    <div>
        <el-input 
            class="com-input"
            v-model="comInputVal" 
            size="small">
            <template slot="prepend">{{}}:</template>
                <i
                    class="el-icon-remove-outline"
                    slot="suffix"
                    @click="removeMark">
                    
                </i>
        </el-input>
    </div>

</template>

<script>
export default {

}
</script>

<style>

</style>