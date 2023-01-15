import { MouseEventHandler, ReactNode } from "react";
import { LoaderIcon } from "@components/icons";

export function Button({
  className = "",
  fillColor = true,
  bigButton = false,
  cardButton = false,
  linkButton = false,
  link = "",
  children,
  buttonType,
  onClick,
  isLoading = false,
  loadingText = "",
  disabled = false,
}: {
  className?: string;
  fillColor?: boolean;
  bigButton?: boolean;
  cardButton?: boolean;
  linkButton?: boolean;
  link?: string;
  children: ReactNode;
  buttonType?: "button" | "submit" | "reset" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  loadingText?: string;
  disabled?: boolean;
}): JSX.Element {
  const outlineButtonStyle = `border-[1px] text-primary-color border-primary-color hover:text-white hover:bg-primary-color bg-white`;
  const filledButtonStyle = `bg-primary-color text-white`;
  const smallButtonStyle = ` py-2 px-4 rounded-md paragraphSmall`;
  const bigButtonStyle = `w-54 py-3 px-8 rounded-xl subtextRegular`;
  const cardButtonStyle = `py-2 px-8 rounded-md subtextSmall bg-accent-color text-white`;

  function ButtonComponenet() {
    return (
      <button
        className={` uppercase ${
          !cardButton
            ? `${fillColor ? filledButtonStyle : outlineButtonStyle} ${
                bigButton ? bigButtonStyle : smallButtonStyle
              }`
            : cardButtonStyle
        } ${className} ${
          isLoading || disabled
            ? "cursor-not-allowed disabled:opacity-50 inline-flex justify-center items-center gap-1"
            : ""
        }`}
        onClick={onClick}
        type={buttonType}
        disabled={disabled}
      >
        {isLoading && (
          <LoaderIcon className="inline-flex self-center animate-spinfast" />
        )}
        {isLoading ? loadingText : children}
      </button>
    );
  }

  return <ButtonComponenet></ButtonComponenet>;
}
