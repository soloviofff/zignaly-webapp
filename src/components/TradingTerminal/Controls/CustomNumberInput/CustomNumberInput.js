import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { OutlinedInput } from "@material-ui/core";
// import MaskedInput from "@biproxi/react-text-mask";
// import createNumberMask from "text-mask-addons/dist/createNumberMask";

// https://github.com/react-hook-form/react-hook-form/pull/1207/files
// https://material-ui.com/components/text-fields/
// https://codesandbox.io/s/4es23
// https://github.com/text-mask/text-mask/issues/406
// const TextMaskCustom = (props) => {
//   const { inputRef, onChange, ...other } = props;
//   const defaultMaskOptions = {
//     prefix: "",
//     suffix: "",
//     includeThousandsSeparator: false,
//     // thousandsSeparatorSymbol: ",",
//     allowDecimal: true,
//     decimalSymbol: ".",
//     decimalLimit: 8, // how many digits allowed after the decimal
//     integerLimit: 10, // limit length of integer numbers
//     allowNegative: false,
//     allowLeadingZeroes: false,
//   };

//   const maskOptions = {};
//   const currencyMask = createNumberMask({
//     ...defaultMaskOptions,
//     ...maskOptions,
//   });

//   return (
//     <MaskedInput
//       {...other}
//       ref={(ref) => {
//         inputRef(ref ? ref.inputElement : null);
//       }}
//       mask={currencyMask}
//       guide={false}
//       // placeholderChar={"\u2000"}
//       showMask={false}
//       onChange={(e) => {
//         console.log(e.target.value);
//         e.persist();
//         onChange(e.target.value);
//       }}
//     />
//   );
// };

/**
 * @typedef {import("react-hook-form/dist/types").ValidationRules} ValidationRules
 * @typedef {import("@material-ui/core/Input").InputProps} InputProps
 */

/**
 * @typedef {Object} Props
 * @property {string} name Control name
 * @property {string|number} [defaultValue] defaultValue
 * @property {function} [onChange] Change callback
 * @property {ValidationRules} [rules] Change callback
 * @property {boolean} [allowNegative] Allow negative numbers
 *
 * @typedef {InputProps & Props} EnhancedProps
 */
/**
 * @param {EnhancedProps} props Props
 * @returns {JSX.Element} JSX
 */
const CustomNumberInput = (props) => {
  const { name, defaultValue = "", onChange, rules, allowNegative = false, ...others } = props;
  const { errors, control } = useFormContext();

  /**
   * @param {React.ChangeEvent<*>} e Event
   * @returns {string} Formatted number
   */
  const handleChangeNumber = (e) => {
    const val = e.target.value;
    if (val === "") return "";

    // Remove commas
    let formattedVal = val.replace(",", "");
    // Remove spaces
    formattedVal = formattedVal.replace(" ", "");

    // Check valid number
    if (!isNaN(formattedVal) || formattedVal === "-") {
      // Check negative
      if (allowNegative || parseFloat(formattedVal) >= 0) return formattedVal;
    }
    return null;
  };

  // todo: we could add sign prefix here
  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({ onChange: _onChange, value }) => (
        <OutlinedInput
          className="outlineInput"
          error={!!errors[name]}
          name={name}
          onChange={(e) => {
            const val = handleChangeNumber(e);
            if (val !== null) {
              // Format event value
              e.target.value = val;
              _onChange(e);
              // Callback
              if (onChange) onChange(e);
            }
          }}
          value={value}
          {...others}
        />
      )}
      rules={rules}
    />
  );
};

export default CustomNumberInput;
