import { ProgramState } from "./interpreting/state"

type IProps = {
  state: ProgramState
}

export default function State({
  state
}: IProps) {
  return (
    <div className="border-gray-600 border-2 m-4 rounded w-1/2">
      <div className="w-10 h-full flex flex-col flex-wrap">
      {
        state.getAllRegisters().map(
          (register, index) => (
            <div key={register.name} className="m-2 w-20 h-20 flex flex-row text-center items-center justify-center border-gray-600 bg-gray-700 border-2 rounded">
              {register.name}: {register.value}
            </div>
          ))
      }
      </div>
    </div>
  )
}