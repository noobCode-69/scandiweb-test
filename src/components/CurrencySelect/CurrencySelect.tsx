import "./CurrencySelect.scss";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Currency } from "../../types/currency";

function CurrencySelect() {
  const { changeDefaultCurrency } = useActions();
  const { currency } = useTypedSelector((state) => {
    return state.currency;
  });

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    changeDefaultCurrency(event.target.value as Currency);
  };
  return (
    <div className="selector__container">
      <select
        className="selector__select"
        value={currency}
        onChange={handleCurrencyChange}
      >
        <option className="selector__option" value="$">
          $
        </option>
        <option className="selector__option" value="€">
          €
        </option>
        <option className="selector__option" value="₹">
          ₹
        </option>
      </select>
    </div>
  );
}

export default CurrencySelect;
