import React, { ComponentProps, ComponentType } from 'react'
import { connect, mapProps } from './connect'

const withA = (Comp: React.FC) => {
  return (props: any) => <Comp {...props} a="a" />
}
const withB = (Comp: React.FC) => {
  return (props: any) => <Comp {...props} b="b" />
}
const withC = (Comp: React.FC) => {
  return (props: any) => <Comp {...props} c="c" />
}

// const hoc = compose<typeof Title>(withA, withB, withC)
// const HocTitle = hoc(Title)

interface ITitleProps {
  title: string
}

const Title = (props: ITitleProps) => {
  return <h1>{props.title}</h1>
}
Title.displayName = 'Title'

// export function connect<T extends ComponentType<any>, P extends ComponentProps<any> = any>(
//   Target: T,
//   mapProps: (props: P) => ComponentProps<T>,
// ) {
//   const Comp: React.FC<P> = (props) => {
//     const finalProps = mapProps(props)
//     return <Target {...finalProps} />
//   }
//   Comp.displayName = `Connected${Target.displayName || Target.name || 'Component'}`
//   return Comp
// }

const ConnectTitle = connect(
  Title,
  mapProps(
    {
      a: 1,
    },
    (props) => {
      return {
        b: 2,
      }
    },
  ),
  mapProps(
    {
      c: 3,
    },
  )
)

const Page: React.FC = () => {
  return (
    <>
      <h2>hoc page</h2>

      <ConnectTitle />
    </>
  )
}

export default Page
