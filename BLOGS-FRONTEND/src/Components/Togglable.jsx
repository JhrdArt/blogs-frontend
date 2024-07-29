import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "proptypes";
import { Login } from "./Login";

export const Togglable = forwardRef(({ children, buttonLabel }, ref) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? "none" : "" };
    const showWhenVisible = { display: visible ? "" : "none" };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        };
    });

    return (
        <div className="text-center">
            <div style={hideWhenVisible}>
                <button className="bg-indigo-600 p-1 rounded-xl text-blue-100 mt-2 hover:border-[2px] hover: border-black" onClick={toggleVisibility}>
                    {buttonLabel}
                </button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <button className="bg-indigo-600 p-1 rounded-xl text-blue-100 mt-2 hover:border-[2px] hover: border-black" onClick={toggleVisibility}>Hidden</button>
            </div>
        </div>
    );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
};
