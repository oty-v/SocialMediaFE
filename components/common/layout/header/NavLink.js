import ActiveLink from "./ActiveLink";

const NavLink = ({href="", onClick,children}) => {
    return (
        <li className="nav-item mt-3">
            <ActiveLink activeClassName="active" href={href}>
                <button className="nav-link link-dark" onClick={onClick&&onClick}>
                    {children}
                </button>
            </ActiveLink>
        </li>
    )
}

export default NavLink