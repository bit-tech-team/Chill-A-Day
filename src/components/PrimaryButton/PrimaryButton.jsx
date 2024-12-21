import "./primaryButton.scss";

export const PrimaryButton = (props) => {
  const { action, type = "button", text } = props;

  return (
    <button className="button" type={type} onClick={action}>
      <span className="button_lg">
        <span className="button_sl"></span>
        <span className="button_text">{text}</span>
      </span>
    </button>
  );
};
