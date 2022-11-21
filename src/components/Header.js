const Header = ({ text }) => {
  return (
    <div className="header">
      <img
        className="logo"
        src="https://dataguild.otax.fi/wp-content/uploads/sites/44/2020/01/dataguild_logo_raster_128x112_white.png"
      ></img>
      <h1>{text}</h1>
    </div>
  );
};

export default Header;
