interface NavBarProps {
    cartCount: number;
}

function NavBar({ cartCount }: NavBarProps) {
    return (
        <nav className="navbar">
            <a href="#" className="navbar-logo">
                Thrift Happens
            </a>

            <a href="#checkout" className="navbar-cart">
                Cart ({cartCount})
            </a>
        </nav>
    );
}

export default NavBar;