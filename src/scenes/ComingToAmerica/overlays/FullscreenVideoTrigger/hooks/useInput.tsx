import { useState } from "react";

function useInput() {
  // reduce bloat of watching inputs for changes.
  const [value, setValue] = useState("");

  const onChange = function (event: any) {
    setValue(event.target.value);
  };

  return {
    value,
    setValue,
    onChange,
  };
}

export default useInput;
