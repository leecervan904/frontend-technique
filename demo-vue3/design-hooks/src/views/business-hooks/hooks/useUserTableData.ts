import { ref, onMounted, watch } from 'vue'
import { Message, MessageConfig } from "@arco-design/web-vue";
import { type TableColumnData } from '@arco-design/web-vue'
import { type UserItem } from '../../../../server/main'

import { useTableData } from './useTableData'
import axios from 'axios'

interface IForm {
  name: string
  sex: 0 | 1 | 2
}

export function useUserTableData() {
  const columns = ref<TableColumnData[]>([
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'name',
      ellipsis: true,
      tooltip: true,
    },
    {
      title: '性别',
      slotName: 'sex',
      width: 300,
      fixed: 'right',
      render: ({ record }) => record.sex === 1 ? '男' : '女'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      ellipsis: true,
      tooltip: true,
    },
    {
      title: '简介',
      dataIndex: 'desc',
      ellipsis: true,
      tooltip: true,
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
  } = useTableData<IForm, UserItem>({
    form: {
      name: '',
      sex: 0,
    },
    getList: async ({ formData, pageInfo }) => {
      const params = {
        ...formData.value,
        pageNum: pageInfo.value.pageNum,
        pageSize: pageInfo.value.pageSize,
      }

      const res = await axios({
        method: 'get',
        url: '/api/user/page',
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
      await axios({
        method: 'post',
        url: '/api/user/delete',
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
