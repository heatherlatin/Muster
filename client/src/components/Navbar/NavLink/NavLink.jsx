import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function NavLink ({ className, ...props }) {
    const { to } = props;
    const location = useLocation();
    const active = (location.pathname === to) ? " active" : "";
    const previousClasses = (className) ? ` ${className}` : "";
    const linkClasses = `nav-link${active}${previousClasses}`
    return (
        <Link className={linkClasses} {...props} />
    );
}