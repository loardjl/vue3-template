import { reactive, ref, resolveDirective, h, withDirectives } from 'vue'
import { ElButton, ElFormItem, ElInput, ElMessage } from 'element-plus'

export const useList = (formData, instance) => {
  const tableSetting = {
    border: true,
    // 是否分页
    isPager: true,
    rowkey: 'id'
  }
  const tableSettingC = {
    border: false,
    // 是否分页
    isPager: false
  }
  // 自定义渲染表头（使用tsx语法）
  const headerRender = row => {
    return (
      <ElButton
        type="primary"
        onClick={() => {
          ElMessage.success('我是通过 tsx 语法渲染的表头')
        }}
      >
        {row.label}
      </ElButton>
    )
  }
  const expandRender = scope => {
    return (
      <>
        {
          <myTable
            columns={columnsC}
            tableSetting={tableSettingC}
            tableData={formData.tableData}
          ></myTable>
        }
      </>
    )
  }
  const handleChange = () => {
    console.log('change')
  }
  const IdcardClick = row => {
    row.show = true
  }
  const IdcardEdit = (row, el) => {
    row.show = false
  }
  const handleClickOutside = row => {
    row.show = false
  }
  const dirInput = scope => {
    const content = withDirectives(
      h(
        <ElInput
          v-model={scope.row.idCard}
          placeholder="请输入"
          onBlur={el => IdcardEdit(scope.row, el)}
          clearable
        ></ElInput>
      ),
      [
        [resolveDirective('Clickoutside'), (...args) => handleClickOutside(scope.row, ...args)],
        [resolveDirective('myInput'), '', 'num']
      ]
    )
    // 传递实例
    content.dirs.map(item => {
      item.instance = instance
    })
    return content
  }
  const columnsC = [
    { type: 'index', label: '#', width: 80 },
    {
      prop: 'username',
      label: '用户姓名',
      width: 180,
      render: scope => {
        return (
          <ElFormItem
            prop={`tableData.${scope.$index}.username`}
            rules={{ required: true, message: '', trigger: ['blur', 'change'] }}
          >
            <ElInput
              v-model={scope.row.username}
              placeholder="请输入姓名"
              clearable
              onChange={() => handleChange}
            ></ElInput>
          </ElFormItem>
        )
      }
    },
    { prop: 'idCard', label: '身份证号' },
    { prop: 'email', label: '邮箱' },
    { prop: 'address', label: '居住地址' },
    {
      prop: 'createTime',
      label: '创建时间',
      headerRender,
      width: 180
    },
    { prop: 'operation', label: '操作', fixed: 'right', width: 330 }
  ]
  const columns = [
    { type: 'selection', fixed: 'left', width: 80, align: 'center' },
    {
      type: 'expand',
      width: 80,
      render: expandRender
    },
    { type: 'index', label: '序号', width: 80 },
    {
      prop: 'username',
      label: '用户姓名',
      width: 180,
      render: scope => {
        return (
          <ElFormItem
            prop={`tableData.${scope.$index}.username`}
            rules={{ required: true, message: '', trigger: ['blur', 'change'] }}
          >
            <ElInput
              v-model={scope.row.username}
              placeholder="请输入姓名"
              clearable
              onChange={() => handleChange}
            ></ElInput>
          </ElFormItem>
        )
      }
    },
    {
      prop: 'idCard',
      label: '身份证号',
      width: 180,
      render: scope => {
        return (
          <>
            {(!scope.row.show && (
              <ElButton type="primary" link onClick={() => IdcardClick(scope.row)}>
                {scope.row.idCard}
              </ElButton>
            )) || <dirInput {...scope}></dirInput>}
          </>
        )
      }
    },
    { prop: 'email', label: '邮箱' },
    { prop: 'address', label: '居住地址' },
    {
      prop: 'createTime',
      label: '创建时间',
      headerRender,
      width: 180
    },
    {
      prop: 'operation',
      label: '操作',
      fixed: 'right',
      width: 150,
      render: ({ row }) => {
        return (
          <>
            <ElButton
              link
              type="primary"
              onClick={() => {
                ElMessage.success('我是通过 jsx 语法渲染的操作')
                console.log(row)
              }}
            >
              编辑
            </ElButton>
            <ElButton
              link
              type="primary"
              onClick={() => {
                ElMessage.success('我是通过 jsx 语法渲染的操作')
                console.log(row)
              }}
            >
              删除
            </ElButton>
          </>
        )
      }
    }
  ]
  return {
    columns,
    tableSetting
  }
}
