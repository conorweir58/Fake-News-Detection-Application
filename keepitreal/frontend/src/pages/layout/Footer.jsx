function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <p><small>KeepItREAL © 2025 - {currentYear}</small></p>
        </footer>
    );
};

export default Footer;