import React, { ComponentProps } from 'react'

export type JSXComponent =
  | keyof JSX.IntrinsicElements
  | React.JSXElementConstructor<any>

export type IStateMapper<Props> =
  | {
      [key in keyof Props]?: keyof Props | boolean
    }
  | ((props: Props) => Props)

let idx = 1

export function mapProps<T extends JSXComponent>(
  ...args: IStateMapper<React.ComponentProps<T>>[]
) {
  // 返回一个 mapper 函数
  return (PrevComponent: T) => {
    // 返回一个组件
    const NextComponent = (prevProps: ComponentProps<T>) => {
      const nextProps = args.reduce(
        (props, mapper) => Object.assign(
          { ...props },
          typeof mapper === 'function' ? mapper(props) : mapper,
        ),
        prevProps,
      )
      console.log(PrevComponent.displayName, idx++, nextProps)
      return <PrevComponent {...nextProps} />
    }
    NextComponent.displayName = 'Next'
    return NextComponent
  }
}

export function connect<T extends JSXComponent>(
  InnerComponent: T,
  ...args: any[] // mapper 函数列表
) {
  const OuterComponent = args.reduce((InnerComponent, mapper) => {
    return mapper(InnerComponent)
  }, InnerComponent)

  const Comp = (props: ComponentProps<T>) => {
    return <OuterComponent {...props} />
  }
  Comp.displayName = `Connected${InnerComponent.displayName || InnerComponent.name || 'Component'}`
  return Comp
}
