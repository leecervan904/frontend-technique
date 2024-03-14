<template>
  <div>
    <div>
      <a-form
        :model="formData"
        :wrapper-col-props="{ span: 12 }"
      >
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="商品名">
              <a-input
                v-model="formData.name"
                placeholder="请输入商品名"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="商品标题">
              <a-input
                v-model="formData.title"
                placeholder="请输入商品标题"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="上架状态">
              <a-select
                v-model="formData.status"
                :options="[
                  { label: '全部', value: 0 },
                  { label: '上架', value: 1 },
                  { label: '下架', value: 2 }
                ]"
                placeholder="请选择上架状态"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="content">
      <div class="content__btn">
        <span style="margin-right: 20px">当前选中： {{ selectedData.length }}</span>
        <a-button type="primary" @click="handleDeleteSelection">
          <template #icon>
            <!-- <icon-lock/> -->
          </template>
          删除选中
        </a-button>
      </div>
      <a-table
        :loading="isLoading"
        :data="tableData"
        :columns="columns"
        :pagination="false"
        :bordered="{cell:true}"
        row-key="id"
        :row-selection="rowSelection"
        v-model:selectedKeys="selectedData"
      >
      </a-table>

      <a-pagination
        class="content__pagination"
        :total="pageInfo.total"
        :current="pageInfo.pageNum"
        :page-size="pageInfo.pageSize"
        @change="handleChangePage"
        @page-size-change="handleChangePageSize"
        show-total show-jumper show-page-size
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useProductTableData } from './hooks/useProductTableData'

const {
  formData,
  isLoading,
  pageInfo,
  selectedData,
  tableData,
  columns,
  rowSelection,
  handleChangePage,
  handleChangePageSize,
  handleDeleteSelection
} = useProductTableData()
</script>

<style lang="less" scoped>
.content {
  padding: 0 20px 0 20px;
}

.content__btn {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
}
.content__pagination {
  margin-top: 30px;
  float: right;
}
</style>./hooks/useProductTableData
