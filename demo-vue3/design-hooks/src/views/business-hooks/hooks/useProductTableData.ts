import { ref, onMounted, watch, h } from 'vue'
import { Message, Button } from "@arco-design/web-vue";
import { type TableColumnData } from '@arco-design/web-vue'
import { type ProductItem } from '../../../../server/main'

import { useTableData } from './useTableData'
// import axios from 'axios'
import { request } from '../../../utils/request'


interface IForm {
  name: string
  title: string
  status: 0 | 1 | 2
}

export function useProductTableData() {
  const columns = ref<TableColumnData[]>([
    {
      title: 'id',
      dataIndex: 'id',
      width: 100,
    },
    {
      title: '商品名',
      dataIndex: 'name',
      ellipsis: true,
      tooltip: true,
    },
    {
      title: '标题',
      dataIndex: 'title',
      ellipsis: true,
      tooltip: true,
    },
    {
      title: '上架状态',
      slotName: 'title',
      width: 300,
      fixed: 'right',
      render: ({ record }) => h(Button, {
        type: record.status === 1 ? 'primary' : 'secondary',
      }, () => record.status === 1 ? '上架' : '下架')
    },
  ])

  const {
    isLoading,
    formData,
    pageInfo,
    tableData,
    rowSelection,
    selectedData,
    getTableData,
    handleChangePage,
    handleChangePageSize,
  } = useTableData<IForm, ProductItem>({
    form: {
      name: '',
      title: '',
      status: 0,
    },
    getList: async ({ formData, pageInfo }) => {
      const params = {
        ...formData.value,
        pageNum: pageInfo.value.pageNum,
        pageSize: pageInfo.value.pageSize,
      }

      const res = await request({
        method: 'get',
        url: '/product/page',
        params,
      })

      return {
        data: res.data.data.list,
        info: res.data.data.pageInfo,
      }
    },
  })

  const handleDeleteSelection = async () => {
    try {
      await request({
        method: 'post',
        url: '/product/delete',
        data: {
          ids: selectedData.value,
        },
      })
      Message.success('删除成功')
    } catch (error: any) {
      Message.error('删除失败', error.message)
    } finally {
      getTableData()
    }
  }

  onMounted(() => {
    getTableData()
  })

  watch(
    () => formData.value,
    () => {
      getTableData()
    }, {
    deep: true,
  })

  return {
    formData,
    isLoading,
    pageInfo,
    selectedData,
    tableData,
    columns,
    rowSelection,
    handleChangePage,
    handleChangePageSize,
    handleDeleteSelection,
  }
}
