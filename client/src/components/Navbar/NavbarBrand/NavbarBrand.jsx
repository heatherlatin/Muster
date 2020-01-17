import React from "react";
import { Link } from "react-router-dom";
import "./NavbarBrand.css";

export default function NavbarBrand ({ className, ...props }) {
    const previousClasses = (className) ? ` ${className}` : "";
    const linkClasses = `navbar-brand${previousClasses}`
    return (
        <Link className={linkClasses} {...props} />
    );
}