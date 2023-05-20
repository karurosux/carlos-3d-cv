
type Props = {
    text: string
}

export function DialogBox(props: Props) {
    if (!props.text) {
        return <></>
    }
    return (
        <>
            <div className="dialog-box z-10 fixed bottom-14 left-6 right-6 bg-black bg-opacity-75 text-white shadow-lg p-6 border-8 border-white text-6xl select-none min-h-[40%]">
                <span dangerouslySetInnerHTML={{ __html: props.text }}></span>
                <i className="ri-arrow-down-s-fill absolute right-4 bottom-1 animate-pulse animate-bounce" />
            </div>
            <span className="z-10 fixed bottom-4 animate-pulse select-none text-white left-4 text-2xl right-4 text-center">Press <i className="ri-space" /> to continue.</span>
        </>
    )
}