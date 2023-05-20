import {PropsWithChildren} from "react"

export function Container(props: PropsWithChildren<{className?: string}>) {
  const className = props.className || ""
  return (
    <div
      className={
        "z-10 bg-black bg-opacity-75 text-white shadow-lg p-6 border-8 border-white select-none " +
        className
      }
    >
      {props.children}
    </div>
  )
}
