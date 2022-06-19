const Header = () => {
   return (
    <nav className="fixed-top navbar navbar-light bg-light">
        <div className="container-fluid">
            <a href="/" className="navbar-brand">Todo App</a>
        </div>
    </nav>
  )
}
const Footer = () => {
   return (
    <footer className="fixed-bottom footer bg-light py-3 mb-0">
        <div className="container">
            <span className="mx-10 text-dark">&copy; Todo App 2022</span>
        </div>
    </footer>
  )
}
export {Footer,Header};