<script setup lang="ts">


const DateTime = defineModel()


</script>

<template>
  <div class="datetime-picker-container">
    <el-date-picker
        v-model="DateTime"
        type="datetime"
        placeholder="选择日期和时间"
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
        class="date-time-picker"
        :clearable="true"
        :editable="false"
        :popper-class="'datetime-picker-dropdown'"
    />
  </div>
</template>

<style scoped>
.datetime-picker-container {
  display: flex;
  width: 100%;
  padding: 0;
}

.date-time-picker {
  width: 100%;
  transition: all 0.3s ease;
}

:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #dcdfe6;
  border-radius: 6px;
  transition: all 0.3s ease;
  padding: 0 15px;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #409eff;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

:deep(.el-input__prefix-inner) {
  color: #409eff;
}

:deep(.el-input__inner) {
  font-size: 14px;
  height: 40px;
  color: #606266;
}

:deep(.el-input__inner::placeholder) {
  color: #c0c4cc;
}

:deep(.datetime-picker-dropdown) {
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

:deep(.el-picker-panel) {
  border-radius: 8px;
}

:deep(.el-date-editor .el-range-separator) {
  color: #409eff;
}

:deep(.el-date-table td.current:not(.disabled) .el-date-table-cell__text) {
  background-color: #409eff;
  color: white;
  border-radius: 50%;
}

:deep(.el-date-table td.today .el-date-table-cell__text) {
  color: #409eff;
  font-weight: bold;
}
</style>