import { ref, type Ref, DeepReadonly, readonly } from 'vue'
import { type TableRowSelection } from '@arco-design/web-vue'

interface IPageInfo {
  pageSize: number
  pageNum: number
  total: number
}

type IGetListContext<Form> = {
  formData: Readonly<Ref<DeepReadonly<Form>>>
  pageInfo: Readonly<Ref<DeepReadonly<IPageInfo>>>
}

type IUseTableDataProps<Form, TableItem> = {
  form: Form
  getList: (ctx: IGetListContext<Form>) => Promise<{ data: TableItem[], info: IPageInfo } | null>
}

export function useTableData<Form extends Record<string, any>, TableItem = any>(
  { form, getList }: IUseTableDataProps<Form, TableItem>
) {
  const formData = ref<Form>(form) as Ref<Form> // 搜索表单
  const tableData = ref<TableItem[]>([]) as Ref<TableItem[]> // 表格数据
  const pageInfo = ref<IPageInfo>({
    pageSize: 10,
    pageNum: 1,
    total: 0
  })
  const selectedData = ref<number[]>([])
  const isLoading = ref(false)
  const rowSelection: TableRowSelection = {
    type: 'checkbox',
    showCheckedAll: true,
    onlyCurrent: false,
  }

  const getTableData = async () => {
    isLoading.value = true
    try {
      const res = await getList({ formData: readonly(formData), pageInfo: readonly(pageInfo) })
      if (res) {
        const { data, info } = res
        tableData.value = data
        pageInfo.value.total = info.total
      }
    } catch (error) {
      console.log(error)
    }
    isLoading.value = false
  }

  const handleChangePage = (page: number) => {
    pageInfo.value.pageNum = page
    getTableData()
  }
  const handleChangePageSize = (size: number) => {
    pageInfo.value.pageSize = size
    getTableData()
  }

  return {
    formData,
    tableData,
    pageInfo,
    isLoading,
    selectedData,
    rowSelection,
    getTableData,
    handleChangePage,
    handleChangePageSize,
  }
}
