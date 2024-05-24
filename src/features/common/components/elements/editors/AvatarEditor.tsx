
import { LegacyRef } from "react"
import RAE, {AvatarEditorProps as REAProps} from "react-avatar-editor"

interface AvatarEditorProps extends REAProps
{
    ref?: any,
    width?: number,
    height?: number,
    acceptText?: string,
    rejectText?: string,
    onAccept?: any,
    onReject?: any
}

export default function AvatarEditor(props: AvatarEditorProps)
{
    return (
        <div className='fixed p-5 top-0 right-0 z-10 bg-opacity-50 bg-black w-screen h-screen'>
            <div className="flex flex-col w-full items-center justify-center gap-3">
                <RAE
                    ref={props.ref as LegacyRef<RAE>}
                    image={props.image}
                    width={props.width}
                    border={props.border ?? [50, 50]}
                    height={props.height}
                    scale={props.scale ?? 1}
                    className="w-full m-auto"
                />
                <div className="relative text-center sm:bottom-10 w-full m-auto space-x-4">
                    <button
                        onClick={props.onAccept}
                        className="py-3 px-5 hover:bg-gray-200 rounded-lg bg-white"
                    >{props.acceptText}</button>

                    <button
                        onClick={props.onReject}
                        className="py-3 px-5 hover:bg-gray-800 rounded-lg text-white bg-black"
                    >{props.rejectText}</button>
                </div>
            </div>
        </div>
    ) 
}