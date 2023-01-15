export function RadioButton({
    title,
    id,
}: {
    title: string;
    id: string;
}): JSX.Element {
    return (
        <div>
            <input
                id={id}
                name="push-notifications"
                type="radio"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <label
                htmlFor={id}
                className="ml-3 block text-sm font-medium text-gray-700"
            >
                {title}
            </label>
        </div>
    );
}
